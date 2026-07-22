/**
 * InventoryPanel — UI for browsing and managing SL inventory.
 * Displays a folder tree with expandable categories and items.
 */

export interface InventoryFolder {
  id: string;
  parentId: string;
  name: string;
  type: string;
  childCount: number;
  children?: InventoryFolder[];
  items?: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  parentId: string;
  name: string;
  description: string;
  assetType: string;
  inventoryType: string;
  creatorName?: string;
  permissions?: string;
  creationDate?: string;
}

export type InventoryAction = 'wear' | 'rez' | 'take' | 'delete' | 'rename';

export class InventoryPanel {
  private panel: HTMLDivElement | null = null;
  private root: InventoryFolder | null = null;
  private expandedFolders = new Set<string>();
  private selectedItemId: string | null = null;
  private searchQuery = '';
  private onAction?: (action: InventoryAction, item: InventoryItem | InventoryFolder) => void;

  constructor(callbacks?: {
    onAction?: (action: InventoryAction, item: InventoryItem | InventoryFolder) => void;
    onRequestFolder?: (folderId: string) => void;
  }) {
    this.onAction = callbacks?.onAction;
  }

  toggle(): void {
    if (this.panel) this.hide(); else this.show();
  }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; left: 20px; top: 80px; width: 320px; height: 520px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px; z-index: 9999; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size: 14px; font-weight: 600;';
    title.textContent = '📦 Inventory';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 18px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Search bar
    const search = document.createElement('input');
    search.type = 'text';
    search.placeholder = '🔍 Search inventory...';
    search.style.cssText = `
      margin: 8px 12px; padding: 6px 10px; background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
      color: #fff; font-size: 12px; outline: none; width: calc(100% - 24px); box-sizing: border-box;
    `;
    search.oninput = () => {
      this.searchQuery = search.value.toLowerCase();
      this.refresh();
    };
    this.panel.appendChild(search);

    // Tree container
    const tree = document.createElement('div');
    tree.id = 'inv-tree';
    tree.style.cssText = 'flex: 1; overflow-y: auto; padding: 4px 0;';
    this.panel.appendChild(tree);

    // Context hint
    const hint = document.createElement('div');
    hint.style.cssText = 'padding: 6px 12px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 10px; color: #666;';
    hint.textContent = 'Right-click items for actions (wear/rez/take)';
    this.panel.appendChild(hint);

    document.body.appendChild(this.panel);
    this.refresh();
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  /**
   * Set the full inventory tree.
   */
  setInventory(root: InventoryFolder): void {
    this.root = root;
    // Auto-expand root
    this.expandedFolders.add(root.id);
    this.refresh();
  }

  /**
   * Expand a folder that was lazily loaded.
   */
  expandFolder(folderId: string, children: InventoryFolder[], items?: InventoryItem[]): void {
    if (!this.root) return;
    const folder = this.findFolder(this.root, folderId);
    if (folder) {
      folder.children = children;
      folder.items = items;
      this.expandedFolders.add(folderId);
      this.refresh();
    }
  }

  /**
   * Update the creator name for an item (from avatar lookup).
   */
  updateItemCreator(itemId: string, creatorName: string): void {
    if (!this.root) return;
    const item = this.findItem(this.root, itemId);
    if (item) {
      item.creatorName = creatorName;
      this.refresh();
    }
  }

  /**
   * Refresh the tree display.
   */
  private refresh(): void {
    if (!this.panel) return;
    const tree = this.panel.querySelector('#inv-tree') as HTMLDivElement;
    if (!tree) return;

    tree.innerHTML = '';

    if (!this.root) {
      const empty = document.createElement('div');
      empty.style.cssText = 'text-align: center; padding: 40px 0; color: #666; font-size: 13px;';
      empty.textContent = 'Inventory loading...';
      tree.appendChild(empty);
      return;
    }

    this.renderFolder(tree, this.root, 0);
  }

  private renderFolder(container: HTMLDivElement, folder: InventoryFolder, depth: number): void {
    const isExpanded = this.expandedFolders.has(folder.id);
    const hasChildren = (folder.children && folder.children.length > 0) || folder.childCount > 0;

    // Folder row
    const row = document.createElement('div');
    row.style.cssText = `
      padding: 4px ${8 + depth * 16}px 4px ${8 + depth * 16}px;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: background 0.15s; font-size: 12px;
    `;
    row.onmouseenter = () => row.style.background = 'rgba(255,255,255,0.05)';
    row.onmouseleave = () => row.style.background = 'transparent';

    // Expand arrow
    const arrow = document.createElement('span');
    arrow.textContent = hasChildren ? (isExpanded ? '▼' : '▶') : ' ';
    arrow.style.cssText = 'width: 12px; font-size: 8px; color: #888; user-select: none;';
    row.appendChild(arrow);

    // Folder icon
    const icon = document.createElement('span');
    icon.textContent = this.getFolderIcon(folder.type);
    row.appendChild(icon);

    // Name
    const name = document.createElement('span');
    name.style.cssText = 'flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
    name.textContent = folder.name;
    row.appendChild(name);

    // Item count
    if (folder.childCount > 0) {
      const count = document.createElement('span');
      count.style.cssText = 'font-size: 10px; color: #666;';
      count.textContent = `(${folder.childCount})`;
      row.appendChild(count);
    }

    row.onclick = (e) => {
      e.stopPropagation();
      if (isExpanded) {
        this.expandedFolders.delete(folder.id);
      } else {
        this.expandedFolders.add(folder.id);
      }
      this.refresh();
    };

    // Context menu
    row.oncontextmenu = (e) => {
      e.preventDefault();
      this.showContextMenu(e.clientX, e.clientY, 'folder', folder);
    };

    container.appendChild(row);

    // Render children if expanded
    if (isExpanded) {
      // Render subfolders
      if (folder.children) {
        for (const child of folder.children) {
          if (this.searchQuery && !this.matchesSearch(child)) continue;
          this.renderFolder(container, child, depth + 1);
        }
      }

      // Render items
      if (folder.items) {
        for (const item of folder.items) {
          if (this.searchQuery && !item.name.toLowerCase().includes(this.searchQuery)) continue;
          this.renderItem(container, item, depth + 1);
        }
      }
    }
  }

  private renderItem(container: HTMLDivElement, item: InventoryItem, depth: number): void {
    const row = document.createElement('div');
    row.style.cssText = `
      padding: 3px ${8 + depth * 16}px 3px ${8 + depth * 16}px;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: background 0.15s; font-size: 12px;
      ${item.id === this.selectedItemId ? 'background: rgba(100,150,255,0.15);' : ''}
    `;
    row.onmouseenter = () => row.style.background = 'rgba(255,255,255,0.05)';
    row.onmouseleave = () => row.style.background = item.id === this.selectedItemId ? 'rgba(100,150,255,0.15)' : 'transparent';

    const icon = document.createElement('span');
    icon.textContent = this.getItemIcon(item.assetType);
    row.appendChild(icon);

    const name = document.createElement('span');
    name.style.cssText = 'flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
    name.textContent = item.name;
    row.appendChild(name);

    row.onclick = (e) => {
      e.stopPropagation();
      this.selectedItemId = item.id;
      this.refresh();
    };

    row.ondblclick = (e) => {
      e.stopPropagation();
      this.onAction?.('rez', item);
    };

    row.oncontextmenu = (e) => {
      e.preventDefault();
      this.selectedItemId = item.id;
      this.showContextMenu(e.clientX, e.clientY, 'item', item);
      this.refresh();
    };

    container.appendChild(row);
  }

  private showContextMenu(x: number, y: number, type: 'folder' | 'item', target: any): void {
    // Remove any existing context menu
    const existing = document.getElementById('inv-context-menu');
    if (existing) existing.remove();

    const menu = document.createElement('div');
    menu.id = 'inv-context-menu';
    menu.style.cssText = `
      position: fixed; left: ${x}px; top: ${y}px;
      background: rgba(30, 30, 40, 0.98); border: 1px solid rgba(100,150,255,0.3);
      border-radius: 4px; z-index: 10000; min-width: 140px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4); padding: 4px 0;
      font-family: 'Segoe UI', sans-serif; font-size: 12px; color: #e0e0e0;
    `;

    const actions: { label: string; action: InventoryAction }[] = [];

    if (type === 'item') {
      const invType = (item: InventoryItem) => item.inventoryType;
      // Check if it's wearable
      if (target.assetType?.includes('Wearable') || target.inventoryType?.includes('Wearable')) {
        actions.push({ label: '👔 Wear', action: 'wear' });
      }
      actions.push({ label: '🌍 Rez in World', action: 'rez' });
      actions.push({ label: '🗑️ Delete', action: 'delete' });
    } else {
      actions.push({ label: '📁 Open', action: 'rename' }); // reuse for expand
    }

    for (const a of actions) {
      const btn = document.createElement('div');
      btn.style.cssText = 'padding: 6px 12px; cursor: pointer; transition: background 0.1s;';
      btn.textContent = a.label;
      btn.onmouseenter = () => btn.style.background = 'rgba(100,150,255,0.2)';
      btn.onmouseleave = () => btn.style.background = 'transparent';
      btn.onclick = () => {
        menu.remove();
        this.onAction?.(a.action, target);
      };
      menu.appendChild(btn);
    }

    document.body.appendChild(menu);

    // Close on click outside
    const close = (e: MouseEvent) => {
      if (!menu.contains(e.target as Node)) {
        menu.remove();
        document.removeEventListener('click', close);
      }
    };
    setTimeout(() => document.addEventListener('click', close), 10);
  }

  private matchesSearch(folder: InventoryFolder): boolean {
    if (folder.name.toLowerCase().includes(this.searchQuery)) return true;
    if (folder.children) return folder.children.some(c => this.matchesSearch(c));
    if (folder.items) return folder.items.some(i => i.name.toLowerCase().includes(this.searchQuery));
    return false;
  }

  private findFolder(node: InventoryFolder, id: string): InventoryFolder | null {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = this.findFolder(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  private findItem(node: InventoryFolder, id: string): InventoryItem | null {
    if (node.items) {
      for (const item of node.items) {
        if (item.id === id) return item;
      }
    }
    if (node.children) {
      for (const child of node.children) {
        const found = this.findItem(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  private getFolderIcon(type: string): string {
    const icons: Record<string, string> = {
      'Root': '🏠', 'My Inventory': '📦', 'Clothing': '👕', 'Body Parts': '🦴',
      'Objects': '🧸', 'Notecards': '📝', 'Scripts': '📜', 'Landmarks': '📍',
      'Photos': '📷', 'Sounds': '🎵', 'Textures': '🖼️', 'Trash': '🗑️',
      'Lost And Found': '❓', 'Marketplace': '🛒', 'Animations': '💃',
    };
    return icons[type] || '📁';
  }

  private getItemIcon(type: string): string {
    const icons: Record<string, string> = {
      'Object': '🧸', 'Clothing': '👕', 'BodyPart': '🦴', 'Texture': '🖼️',
      'Sound': '🎵', 'Script': '📜', 'Notecard': '📝', 'Landmark': '📍',
      'Wearable': '👔', 'Animation': '💃', 'Gesture': '🫰', 'Snapshot': '📷',
    };
    // Partial match
    for (const [key, val] of Object.entries(icons)) {
      if (type.includes(key)) return val;
    }
    return '📄';
  }

  dispose(): void {
    this.hide();
  }
}

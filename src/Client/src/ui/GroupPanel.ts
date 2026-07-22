/**
 * GroupPanel — UI for SL groups management.
 * Shows group list, active group title, group chat, and notices.
 */

export interface GroupData {
  id: string;
  name: string;
  title?: string;
  memberCount?: number;
  active?: boolean;
  role?: string;
  insignia?: string;
  motto?: string;
}

export interface GroupNotice {
  id: string;
  groupId: string;
  subject: string;
  message: string;
  senderName: string;
  timestamp: string;
}

/**
 * Group panel with tabs: My Groups, Notices, Chat.
 */
export class GroupPanel {
  private panel: HTMLDivElement | null = null;
  private groups: GroupData[] = [];
  private activeGroupId: string | null = null;
  private currentTab: 'groups' | 'notices' | 'chat' = 'groups';
  private chatMessages: { sender: string; text: string; time: string }[] = [];
  private onSendMessage?: (text: string) => void;
  private onGroupSelect?: (groupId: string) => void;

  constructor(callbacks?: {
    onSendMessage?: (text: string) => void;
    onGroupSelect?: (groupId: string) => void;
  }) {
    this.onSendMessage = callbacks?.onSendMessage;
    this.onGroupSelect = callbacks?.onGroupSelect;
  }

  /**
   * Toggle the group panel visibility.
   */
  toggle(): void {
    if (this.panel) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Show the group panel.
   */
  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; right: 20px; top: 80px; width: 320px; height: 480px;
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
    title.textContent = '👥 Groups';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 18px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Tab bar
    const tabBar = document.createElement('div');
    tabBar.style.cssText = 'display: flex; border-bottom: 1px solid rgba(255,255,255,0.1);';
    const tabs = ['groups', 'notices', 'chat'] as const;
    for (const tab of tabs) {
      const btn = document.createElement('button');
      btn.textContent = tab === 'groups' ? '📋 List' : tab === 'notices' ? '📰 Notices' : '💬 Chat';
      btn.style.cssText = `
        flex: 1; padding: 8px; background: ${tab === this.currentTab ? 'rgba(100,150,255,0.2)' : 'transparent'};
        border: none; color: ${tab === this.currentTab ? '#fff' : '#888'};
        font-size: 12px; cursor: pointer; transition: background 0.2s;
      `;
      btn.onclick = () => {
        this.currentTab = tab;
        this.refresh();
      };
      tabBar.appendChild(btn);
    }
    this.panel.appendChild(tabBar);

    // Content area
    const content = document.createElement('div');
    content.id = 'group-panel-content';
    content.style.cssText = 'flex: 1; overflow-y: auto; padding: 8px;';
    this.panel.appendChild(content);

    // Chat input (visible only in chat tab)
    const chatInput = document.createElement('div');
    chatInput.style.cssText = 'padding: 8px; border-top: 1px solid rgba(255,255,255,0.1); display: none;';
    chatInput.id = 'group-chat-input';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    input.style.cssText = `
      width: 100%; padding: 8px; background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;
      color: #fff; font-size: 13px; box-sizing: border-box;
    `;
    input.onkeydown = (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        this.onSendMessage?.(input.value.trim());
        this.chatMessages.push({
          sender: 'You',
          text: input.value.trim(),
          time: new Date().toLocaleTimeString(),
        });
        input.value = '';
        this.refresh();
      }
    };
    chatInput.appendChild(input);
    this.panel.appendChild(chatInput);

    document.body.appendChild(this.panel);
    this.refresh();
  }

  /**
   * Hide the panel.
   */
  hide(): void {
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }
  }

  /**
   * Update the group list.
   */
  updateGroups(groups: GroupData[]): void {
    this.groups = groups;
    this.refresh();
  }

  /**
   * Set the active group.
   */
  setActiveGroup(groupId: string): void {
    this.activeGroupId = groupId;
    this.refresh();
  }

  /**
   * Add a chat message.
   */
  addChatMessage(sender: string, text: string, time?: string): void {
    this.chatMessages.push({ sender, text, time: time || new Date().toLocaleTimeString() });
    if (this.chatMessages.length > 100) this.chatMessages.shift();
    this.refresh();
  }

  /**
   * Set the active group title (displayed in avatar name).
   */
  getActiveGroupTitle(): string | null {
    const active = this.groups.find(g => g.id === this.activeGroupId);
    return active?.title || null;
  }

  /**
   * Refresh the content display.
   */
  private refresh(): void {
    if (!this.panel) return;

    const content = this.panel.querySelector('#group-panel-content') as HTMLDivElement;
    const chatInput = this.panel.querySelector('#group-chat-input') as HTMLDivElement;
    if (!content) return;

    // Show/hide chat input
    if (chatInput) {
      chatInput.style.display = this.currentTab === 'chat' ? 'block' : 'none';
    }

    // Update tab button styles
    const tabs = this.panel.querySelectorAll('button');
    const tabNames = ['groups', 'notices', 'chat'];
    tabs.forEach((btn, i) => {
      if (i < 3) {
        const tab = tabNames[i] as string;
        btn.style.background = tab === this.currentTab ? 'rgba(100,150,255,0.2)' : 'transparent';
        btn.style.color = tab === this.currentTab ? '#fff' : '#888';
      }
    });

    content.innerHTML = '';

    if (this.currentTab === 'groups') {
      this.renderGroupList(content);
    } else if (this.currentTab === 'notices') {
      this.renderNotices(content);
    } else {
      this.renderChat(content);
    }
  }

  private renderGroupList(container: HTMLDivElement): void {
    if (this.groups.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'text-align: center; padding: 40px 0; color: #666; font-size: 13px;';
      empty.textContent = 'No groups found';
      container.appendChild(empty);
      return;
    }

    for (const group of this.groups) {
      const item = document.createElement('div');
      item.style.cssText = `
        padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
        cursor: pointer; transition: background 0.2s;
        ${group.id === this.activeGroupId ? 'background: rgba(100,150,255,0.15);' : ''}
      `;
      item.onmouseenter = () => item.style.background = 'rgba(255,255,255,0.05)';
      item.onmouseleave = () => item.style.background = group.id === this.activeGroupId ? 'rgba(100,150,255,0.15)' : 'transparent';
      item.onclick = () => {
        this.activeGroupId = group.id;
        this.onGroupSelect?.(group.id);
        this.refresh();
      };

      const nameRow = document.createElement('div');
      nameRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';

      const name = document.createElement('span');
      name.style.cssText = 'font-size: 13px; font-weight: 500;';
      name.textContent = group.name;
      nameRow.appendChild(name);

      if (group.id === this.activeGroupId) {
        const badge = document.createElement('span');
        badge.style.cssText = 'font-size: 10px; background: rgba(100,150,255,0.3); padding: 2px 6px; border-radius: 3px; color: #aaa;';
        badge.textContent = 'ACTIVE';
        nameRow.appendChild(badge);
      }
      item.appendChild(nameRow);

      if (group.title || group.motto) {
        const sub = document.createElement('div');
        sub.style.cssText = 'font-size: 11px; color: #888; margin-top: 4px; font-style: italic;';
        sub.textContent = group.title || group.motto || '';
        item.appendChild(sub);
      }

      if (group.memberCount) {
        const members = document.createElement('div');
        members.style.cssText = 'font-size: 11px; color: #666; margin-top: 2px;';
        members.textContent = `${group.memberCount} members`;
        item.appendChild(members);
      }

      container.appendChild(item);
    }
  }

  private renderNotices(container: HTMLDivElement): void {
    const empty = document.createElement('div');
    empty.style.cssText = 'text-align: center; padding: 40px 0; color: #666; font-size: 13px;';
    empty.textContent = 'No group notices';
    container.appendChild(empty);
  }

  private renderChat(container: HTMLDivElement): void {
    if (this.chatMessages.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'text-align: center; padding: 40px 0; color: #666; font-size: 13px;';
      empty.textContent = 'No messages yet';
      container.appendChild(empty);
      return;
    }

    for (const msg of this.chatMessages) {
      const bubble = document.createElement('div');
      bubble.style.cssText = 'padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);';

      const sender = document.createElement('span');
      sender.style.cssText = 'font-size: 12px; font-weight: 600; color: #8ab4f8;';
      sender.textContent = msg.sender;
      bubble.appendChild(sender);

      const time = document.createElement('span');
      time.style.cssText = 'font-size: 10px; color: #666; margin-left: 8px;';
      time.textContent = msg.time;
      bubble.appendChild(time);

      const text = document.createElement('div');
      text.style.cssText = 'font-size: 13px; color: #ccc; margin-top: 2px; word-wrap: break-word;';
      text.textContent = msg.text;
      bubble.appendChild(text);

      container.appendChild(bubble);
    }

    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  dispose(): void {
    this.hide();
  }
}

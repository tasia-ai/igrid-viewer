/**
 * SearchPanel — UI for searching people, places, events, classifieds.
 */

export type SearchCategory = 'people' | 'places' | 'events' | 'classifieds' | 'groups';

export interface SearchResult {
  id: string;
  name: string;
  description?: string;
  category: SearchCategory;
  online?: boolean;
  distance?: string;
  price?: number;
  date?: string;
  maturity?: string;
}

export class SearchPanel {
  private panel: HTMLDivElement | null = null;
  private currentCategory: SearchCategory = 'people';
  private results: SearchResult[] = [];
  private query = '';
  private onSearch?: (category: SearchCategory, query: string) => void;
  private onResultClick?: (result: SearchResult) => void;
  private isLoading = false;

  constructor(callbacks?: {
    onSearch?: (category: SearchCategory, query: string) => void;
    onResultClick?: (result: SearchResult) => void;
  }) {
    this.onSearch = callbacks?.onSearch;
    this.onResultClick = callbacks?.onResultClick;
  }

  toggle(): void {
    if (this.panel) this.hide(); else this.show();
  }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; right: 20px; top: 80px; width: 380px; height: 520px;
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
    title.textContent = '🔍 Search';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 18px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Search input
    const inputRow = document.createElement('div');
    inputRow.style.cssText = 'padding: 8px 12px; display: flex; gap: 8px;';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.value = this.query;
    searchInput.style.cssText = `
      flex: 1; padding: 8px 12px; background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
      color: #fff; font-size: 13px; outline: none;
    `;
    searchInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        this.query = searchInput.value;
        this.doSearch();
      }
    };

    const searchBtn = document.createElement('button');
    searchBtn.textContent = '🔍';
    searchBtn.style.cssText = `
      padding: 8px 12px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5);
      border-radius: 4px; color: #fff; cursor: pointer; font-size: 14px;
    `;
    searchBtn.onclick = () => {
      this.query = searchInput.value;
      this.doSearch();
    };

    inputRow.appendChild(searchInput);
    inputRow.appendChild(searchBtn);
    this.panel.appendChild(inputRow);

    // Category tabs
    const tabs = document.createElement('div');
    tabs.style.cssText = 'display: flex; border-bottom: 1px solid rgba(255,255,255,0.1);';
    const categories: { key: SearchCategory; icon: string; label: string }[] = [
      { key: 'people', icon: '👤', label: 'People' },
      { key: 'places', icon: '🗺️', label: 'Places' },
      { key: 'events', icon: '🎉', label: 'Events' },
      { key: 'groups', icon: '👥', label: 'Groups' },
      { key: 'classifieds', icon: '📋', label: 'Classifieds' },
    ];
    for (const cat of categories) {
      const btn = document.createElement('button');
      btn.textContent = `${cat.icon} ${cat.label}`;
      btn.style.cssText = `
        flex: 1; padding: 8px 4px; background: ${cat.key === this.currentCategory ? 'rgba(100,150,255,0.2)' : 'transparent'};
        border: none; color: ${cat.key === this.currentCategory ? '#fff' : '#888'};
        font-size: 11px; cursor: pointer; transition: background 0.2s;
      `;
      btn.onclick = () => {
        this.currentCategory = cat.key;
        this.refresh();
        if (this.query) this.doSearch();
      };
      tabs.appendChild(btn);
    }
    this.panel.appendChild(tabs);

    // Results area
    const results = document.createElement('div');
    results.id = 'search-results';
    results.style.cssText = 'flex: 1; overflow-y: auto; padding: 4px 0;';
    this.panel.appendChild(results);

    document.body.appendChild(this.panel);
    this.refresh();
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  /**
   * Update search results.
   */
  setResults(results: SearchResult[]): void {
    this.results = results;
    this.isLoading = false;
    this.refresh();
  }

  /**
   * Set loading state.
   */
  setLoading(loading: boolean): void {
    this.isLoading = loading;
    this.refresh();
  }

  private doSearch(): void {
    if (!this.query.trim()) return;
    this.isLoading = true;
    this.refresh();
    this.onSearch?.(this.currentCategory, this.query);
  }

  private refresh(): void {
    if (!this.panel) return;
    const container = this.panel.querySelector('#search-results') as HTMLDivElement;
    if (!container) return;
    container.innerHTML = '';

    // Update tab styles
    const tabs = this.panel.querySelectorAll('button');
    const catKeys: SearchCategory[] = ['people', 'places', 'events', 'groups', 'classifieds'];
    tabs.forEach((btn, i) => {
      if (i < 5) {
        const key = catKeys[i];
        btn.style.background = key === this.currentCategory ? 'rgba(100,150,255,0.2)' : 'transparent';
        btn.style.color = key === this.currentCategory ? '#fff' : '#888';
      }
    });

    if (this.isLoading) {
      const loading = document.createElement('div');
      loading.style.cssText = 'text-align: center; padding: 40px 0; color: #666;';
      loading.textContent = 'Searching...';
      container.appendChild(loading);
      return;
    }

    if (this.results.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'text-align: center; padding: 40px 0; color: #666; font-size: 13px;';
      empty.textContent = this.query ? 'No results found' : `Search for ${this.currentCategory}...`;
      container.appendChild(empty);
      return;
    }

    for (const result of this.results) {
      const item = document.createElement('div');
      item.style.cssText = `
        padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.05);
        cursor: pointer; transition: background 0.15s;
      `;
      item.onmouseenter = () => item.style.background = 'rgba(255,255,255,0.05)';
      item.onmouseleave = () => item.style.background = 'transparent';
      item.onclick = () => this.onResultClick?.(result);

      const nameRow = document.createElement('div');
      nameRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

      const icon = document.createElement('span');
      icon.textContent = this.getCategoryIcon(result.category);
      nameRow.appendChild(icon);

      const name = document.createElement('span');
      name.style.cssText = 'font-size: 13px; font-weight: 500;';
      name.textContent = result.name;
      nameRow.appendChild(name);

      if (result.online) {
        const onlineDot = document.createElement('span');
        onlineDot.style.cssText = 'width: 6px; height: 6px; border-radius: 50%; background: #4CAF50;';
        nameRow.appendChild(onlineDot);
      }

      if (result.maturity) {
        const maturityBadge = document.createElement('span');
        maturityBadge.style.cssText = `
          font-size: 9px; padding: 1px 5px; border-radius: 3px;
          background: ${result.maturity === 'M' ? 'rgba(255,100,100,0.3)' : 'rgba(100,200,100,0.3)'};
          color: ${result.maturity === 'M' ? '#ff8888' : '#88ff88'};
        `;
        maturityBadge.textContent = result.maturity === 'M' ? 'MATURE' : 'PG';
        nameRow.appendChild(maturityBadge);
      }

      item.appendChild(nameRow);

      if (result.description) {
        const desc = document.createElement('div');
        desc.style.cssText = 'font-size: 11px; color: #888; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
        desc.textContent = result.description;
        item.appendChild(desc);
      }

      const meta = document.createElement('div');
      meta.style.cssText = 'font-size: 10px; color: #666; margin-top: 2px;';
      if (result.distance) meta.textContent += result.distance;
      if (result.price !== undefined) meta.textContent += ` · $${result.price}`;
      if (result.date) meta.textContent += ` · ${result.date}`;
      if (meta.textContent) item.appendChild(meta);

      container.appendChild(item);
    }
  }

  private getCategoryIcon(cat: SearchCategory): string {
    const icons: Record<SearchCategory, string> = {
      people: '👤', places: '🗺️', events: '🎉', groups: '👥', classifieds: '📋',
    };
    return icons[cat] || '📄';
  }

  dispose(): void {
    this.hide();
  }
}

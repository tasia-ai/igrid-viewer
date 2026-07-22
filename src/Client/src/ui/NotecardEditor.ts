/**
 * NotecardEditor — Simple text editor for SL notecards.
 */

export interface NotecardData {
  id: string;
  name: string;
  content: string;
  modified: boolean;
}

export class NotecardEditor {
  private panel: HTMLDivElement | null = null;
  private currentNotecard: NotecardData | null = null;
  private textarea: HTMLTextAreaElement | null = null;
  private onSave?: (id: string, content: string) => void;
  private onLoad?: (id: string) => void;

  constructor(callbacks?: {
    onSave?: (id: string, content: string) => void;
    onLoad?: (id: string) => void;
  }) {
    this.onSave = callbacks?.onSave;
    this.onLoad = callbacks?.onLoad;
  }

  toggle(): void {
    if (this.panel) this.hide(); else this.show();
  }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 550px; height: 420px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 10px; z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';

    const title = document.createElement('span');
    title.style.cssText = 'font-size: 14px; font-weight: 600;';
    title.textContent = `📝 ${this.currentNotecard?.name || 'Notecard'}`;
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 18px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Textarea
    this.textarea = document.createElement('textarea');
    this.textarea.value = this.currentNotecard?.content || '';
    this.textarea.placeholder = 'Type your notecard content here...';
    this.textarea.style.cssText = `
      flex: 1; margin: 0; padding: 12px 16px;
      background: rgba(255,255,255,0.05); border: none; outline: none;
      color: #e0e0e0; font-family: 'Consolas', 'Courier New', monospace; font-size: 13px;
      resize: none; line-height: 1.5;
    `;
    this.textarea.oninput = () => {
      if (this.currentNotecard) {
        this.currentNotecard.modified = true;
        this.currentNotecard.content = this.textarea!.value;
        this.updateTitle();
      }
    };
    this.panel.appendChild(this.textarea);

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = 'padding: 10px 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';

    const charCount = document.createElement('span');
    charCount.style.cssText = 'font-size: 11px; color: #666;';
    charCount.textContent = `${this.textarea.value.length} chars`;
    this.textarea.oninput = () => {
      charCount.textContent = `${this.textarea!.value.length} chars`;
    };
    footer.appendChild(charCount);

    const buttons = document.createElement('div');
    buttons.style.cssText = 'display: flex; gap: 8px;';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = 'padding: 6px 14px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #ccc; cursor: pointer; font-size: 12px;';
    cancelBtn.onclick = () => this.hide();
    buttons.appendChild(cancelBtn);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = '💾 Save';
    saveBtn.style.cssText = 'padding: 6px 14px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5); border-radius: 4px; color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;';
    saveBtn.onclick = () => {
      if (this.currentNotecard && this.onSave) {
        this.onSave(this.currentNotecard.id, this.textarea!.value);
        this.currentNotecard.modified = false;
        this.updateTitle();
      }
    };
    buttons.appendChild(saveBtn);

    footer.appendChild(buttons);
    this.panel.appendChild(footer);

    document.body.appendChild(this.panel);
    this.textarea.focus();
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  /**
   * Open a notecard for editing.
   */
  openNotecard(id: string, name: string, content: string): void {
    this.currentNotecard = { id, name, content, modified: false };
    this.show();
  }

  /**
   * Update notecard content from server.
   */
  updateContent(id: string, content: string): void {
    if (this.currentNotecard?.id === id) {
      this.currentNotecard.content = content;
      this.currentNotecard.modified = false;
      if (this.textarea) {
        this.textarea.value = content;
      }
    }
  }

  private updateTitle(): void {
    const titleEl = this.panel?.querySelector('span');
    if (titleEl && this.currentNotecard) {
      const prefix = this.currentNotecard.modified ? '● ' : '';
      titleEl.textContent = `${prefix}📝 ${this.currentNotecard.name}`;
    }
  }

  dispose(): void {
    this.hide();
  }
}

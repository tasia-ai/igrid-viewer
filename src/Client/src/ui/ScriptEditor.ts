/**
 * ScriptEditor — LSL script editor with syntax highlighting and compile.
 * LSL keywords, events, types, and constants are highlighted.
 */

type TokenType = 'keyword' | 'event' | 'type' | 'string' | 'comment' | 'constant' | 'number' | 'normal';

interface Token {
  text: string;
  type: TokenType;
}

// LSL language definition
const LSL_KEYWORDS = new Set([
  'state','default','if','else','for','while','do','switch','case','break',
  'continue','return','jump','def','true','false','integer','float','string',
  'key','vector','rotation','quaternion','list','default','on','touch',
]);

const LSL_TYPES = new Set([
  'integer','float','string','key','vector','rotation','quaternion','list',
  'void','TRUE','FALSE',
]);

const LSL_EVENTS = new Set([
  'state_entry','state_exit','touch_start','touch','touch_end','timer',
  'listen','sensor','no_sensor','collision_start','collision','collision_end',
  'rez','money','email','http_request','http_response','http_redirect',
  'at_target','not_at_target','at_rot_target','not_at_rot_target',
  'run_time_permissions','changed','attach','dataserver','link_message',
  'link_set','link_color','link_brightness','link_texture','moving_start',
  'moving_end','object_rez','remote_data','control','experience_permissions',
  'experience_permissions_denied','land_collide',
]);

const LSL_CONSTANTS = new Set([
  'llNULLKEY','ALL_SIDES','TEXTURE_WHITE','TEXTURE_TRANSPARENT',
  'AGENT','ACTIVE','PASSIVE','SCRIPTED','PHYSICS','ANIM','CHILDREN',
  'SIT_POINT','LAND','REGION','MEDIA_PERM_INTERACT','MEDIA_PERM_CONTROL',
  'AGENT_BY_LEGACY_NAME','AGENT_BY_KEY','ACTIVE_NEARBY','ZERO_VECTOR',
  'ZERO_ROTATION','PI','TWO_PI','HALF_PI','DEG_TO_RAD','RAD_TO_DEG',
  'COLOR_WHITE','COLOR_BLACK','COLOR_RED','COLOR_GREEN','COLOR_BLUE',
]);

// Simple LSL syntax highlighter
export function highlightLSL(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Line comment
    if (code[i] === '/' && code[i + 1] === '/') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      tokens.push({ text: code.slice(i, end), type: 'comment' });
      i = end;
      continue;
    }

    // Block comment
    if (code[i] === '/' && code[i + 1] === '*') {
      let end = code.indexOf('*/', i + 2);
      if (end === -1) end = code.length; else end += 2;
      tokens.push({ text: code.slice(i, end), type: 'comment' });
      i = end;
      continue;
    }

    // String literal
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === '\\') j++;
        j++;
      }
      j = Math.min(j + 1, code.length);
      tokens.push({ text: code.slice(i, j), type: 'string' });
      i = j;
      continue;
    }

    // Number
    if (/[0-9]/.test(code[i]) || (code[i] === '.' && i + 1 < code.length && /[0-9]/.test(code[i + 1]))) {
      let j = i;
      while (j < code.length && /[0-9.xXa-fA-F]/.test(code[j])) j++;
      tokens.push({ text: code.slice(i, j), type: 'number' });
      i = j;
      continue;
    }

    // Word (identifier/keyword)
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z_0-9]/.test(code[j])) j++;
      const word = code.slice(i, j);

      let type: TokenType = 'normal';
      if (LSL_EVENTS.has(word)) type = 'event';
      else if (LSL_TYPES.has(word)) type = 'type';
      else if (LSL_KEYWORDS.has(word)) type = 'keyword';
      else if (LSL_CONSTANTS.has(word)) type = 'constant';

      tokens.push({ text: word, type });
      i = j;
      continue;
    }

    // Default
    tokens.push({ text: code[i], type: 'normal' });
    i++;
  }

  return tokens;
}

// Token colors
const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: '#ff79c6',
  event: '#50fa7b',
  type: '#8be9fd',
  string: '#f1fa8c',
  comment: '#6272a4',
  constant: '#bd93f9',
  number: '#ffb86c',
  normal: '#f8f8f2',
};

export interface ScriptData {
  id: string;
  name: string;
  content: string;
  modified: boolean;
  isRunning?: boolean;
}

export interface CompileResult {
  success: boolean;
  messages: { line: number; message: string; isError: boolean }[];
}

export class ScriptEditor {
  private panel: HTMLDivElement | null = null;
  private highlightedEl: HTMLPreElement | null = null;
  private textareaEl: HTMLTextAreaElement | null = null;
  private currentScript: ScriptData | null = null;
  private consoleEl: HTMLDivElement | null = null;
  private onSave?: (id: string, content: string, mono: boolean) => void;
  private onCompile?: (id: string, content: string) => void;
  private onToggleRunning?: (id: string, running: boolean) => void;
  private showConsole = false;

  constructor(callbacks?: {
    onSave?: (id: string, content: string, mono: boolean) => void;
    onCompile?: (id: string, content: string) => void;
    onToggleRunning?: (id: string, running: boolean) => void;
  }) {
    this.onSave = callbacks?.onSave;
    this.onCompile = callbacks?.onCompile;
    this.onToggleRunning = callbacks?.onToggleRunning;
  }

  toggle(): void { if (this.panel) this.hide(); else this.show(); }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position:fixed; left:50%; top:50%; transform:translate(-50%,-50%);
      width:700px; height:500px; display:flex; flex-direction:column;
      background:rgba(20,20,30,0.95); border:1px solid rgba(100,150,255,0.3);
      border-radius:10px; z-index:10000; font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 12px 48px rgba(0,0,0,0.6); backdrop-filter:blur(12px);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size:13px; font-weight:600;';
    title.textContent = '📝 ' + (this.currentScript?.name || 'LSL Script');
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none; border:none; color:#888; font-size:18px; cursor:pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Editor area (highlighted overlay + hidden textarea)
    const editorWrap = document.createElement('div');
    editorWrap.style.cssText = 'flex:1; position:relative; overflow:hidden; font-family:Consolas,"Courier New",monospace; font-size:12px; line-height:1.5;';

    this.highlightedEl = document.createElement('pre');
    this.highlightedEl.style.cssText = `
      position:absolute; top:0; left:0; right:0; bottom:0;
      margin:0; padding:10px 14px; overflow:auto;
      pointer-events:none; white-space:pre-wrap; word-wrap:break-word; color:#f8f8f2;
      background:transparent;
    `;
    editorWrap.appendChild(this.highlightedEl);

    this.textareaEl = document.createElement('textarea');
    this.textareaEl.value = this.currentScript?.content || '';
    this.textareaEl.spellcheck = false;
    this.textareaEl.style.cssText = `
      position:absolute; top:0; left:0; width:100%; height:100%;
      margin:0; padding:10px 14px; border:none; outline:none; resize:none;
      background:rgba(30,30,42,0.95); color:transparent; caret-color:#f8f8f2;
      font-family:Consolas,"Courier New",monospace; font-size:12px; line-height:1.5;
      white-space:pre-wrap; word-wrap:break-word; box-sizing:border-box;
    `;
    this.textareaEl.oninput = () => this.updateHighlight();
    this.textareaEl.onscroll = () => {
      if (this.highlightedEl) {
        this.highlightedEl.scrollTop = this.textareaEl!.scrollTop;
        this.highlightedEl.scrollLeft = this.textareaEl!.scrollLeft;
      }
    };
    this.textareaEl.onkeydown = (e) => {
      // Tab key inserts spaces
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textareaEl!.selectionStart;
        const end = this.textareaEl!.selectionEnd;
        this.textareaEl!.value = this.textareaEl!.value.substring(0, start) + '    ' + this.textareaEl!.value.substring(end);
        this.textareaEl!.selectionStart = this.textareaEl!.selectionEnd = start + 4;
        this.updateHighlight();
      }
      // Ctrl+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveScript();
      }
    };
    editorWrap.appendChild(this.textareaEl);
    this.panel.appendChild(editorWrap);
    this.updateHighlight();

    // Console area
    this.consoleEl = document.createElement('div');
    this.consoleEl.style.cssText = `
      height:100px; border-top:1px solid rgba(255,255,255,0.1);
      background:rgba(10,10,16,0.9); overflow-y:auto; padding:6px 10px;
      font-family:Consolas,"Courier New",monospace; font-size:11px; color:#888;
      display:none;
    `;
    this.panel.appendChild(this.consoleEl);

    // Footer buttons
    const footer = document.createElement('div');
    footer.style.cssText = 'padding:8px 14px; border-top:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;';

    const leftBtns = document.createElement('div');
    leftBtns.style.cssText = 'display:flex; gap:6px;';

    // Console toggle
    const consoleBtn = document.createElement('button');
    consoleBtn.textContent = '📟 Console';
    consoleBtn.style.cssText = 'padding:5px 10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#aaa; cursor:pointer; font-size:11px;';
    consoleBtn.onclick = () => {
      this.showConsole = !this.showConsole;
      this.consoleEl!.style.display = this.showConsole ? 'block' : 'none';
    };
    leftBtns.appendChild(consoleBtn);

    const runBtn = document.createElement('button');
    runBtn.textContent = this.currentScript?.isRunning ? '⏹ Stop' : '▶ Run';
    runBtn.style.cssText = `padding:5px 10px; border-radius:4px; cursor:pointer; font-size:11px; border:1px solid ${this.currentScript?.isRunning ? 'rgba(255,80,80,0.5)' : 'rgba(80,255,120,0.5)'}; background:${this.currentScript?.isRunning ? 'rgba(255,80,80,0.2)' : 'rgba(80,255,120,0.2)'}; color:#fff;`;
    runBtn.onclick = () => {
      if (this.currentScript) {
        this.currentScript.isRunning = !this.currentScript.isRunning;
        this.onToggleRunning?.(this.currentScript.id, this.currentScript.isRunning);
        runBtn.textContent = this.currentScript.isRunning ? '⏹ Stop' : '▶ Run';
        runBtn.style.borderColor = this.currentScript.isRunning ? 'rgba(255,80,80,0.5)' : 'rgba(80,255,120,0.5)';
        runBtn.style.background = this.currentScript.isRunning ? 'rgba(255,80,80,0.2)' : 'rgba(80,255,120,0.2)';
      }
    };
    leftBtns.appendChild(runBtn);
    footer.appendChild(leftBtns);

    const rightBtns = document.createElement('div');
    rightBtns.style.cssText = 'display:flex; gap:6px;';

    const compileBtn = document.createElement('button');
    compileBtn.textContent = '🔧 Compile';
    compileBtn.style.cssText = 'padding:5px 10px; background:rgba(255,180,100,0.2); border:1px solid rgba(255,180,100,0.5); border-radius:4px; color:#fff; cursor:pointer; font-size:11px;';
    compileBtn.onclick = () => this.saveScript();
    rightBtns.appendChild(compileBtn);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = '💾 Save';
    saveBtn.style.cssText = 'padding:5px 10px; background:rgba(100,150,255,0.3); border:1px solid rgba(100,150,255,0.5); border-radius:4px; color:#fff; cursor:pointer; font-size:11px; font-weight:500;';
    saveBtn.onclick = () => this.saveScript();
    rightBtns.appendChild(saveBtn);

    footer.appendChild(rightBtns);
    this.panel.appendChild(footer);
    document.body.appendChild(this.panel);
    this.textareaEl.focus();
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  openScript(id: string, name: string, content: string, isRunning?: boolean): void {
    this.currentScript = { id, name, content, modified: false, isRunning };
    this.show();
  }

  showCompileResult(result: CompileResult): void {
    if (!this.consoleEl) return;
    this.showConsole = true;
    this.consoleEl.style.display = 'block';
    this.consoleEl.innerHTML = '';

    if (result.success) {
      const ok = document.createElement('div');
      ok.style.cssText = 'color:#50fa7b; margin-bottom:4px;';
      ok.textContent = '✅ Compilation successful!';
      this.consoleEl.appendChild(ok);
    }

    for (const msg of result.messages) {
      const line = document.createElement('div');
      line.style.cssText = `color:${msg.isError ? '#ff5555' : '#f1fa8c'}; margin-bottom:2px;`;
      line.textContent = `${msg.isError ? '❌' : '⚠️'} Line ${msg.line}: ${msg.message}`;
      this.consoleEl.appendChild(line);
    }
  }

  private updateHighlight(): void {
    if (!this.highlightedEl || !this.textareaEl) return;
    const code = this.textareaEl.value;
    const tokens = highlightLSL(code);
    this.highlightedEl.innerHTML = tokens.map(t =>
      t.type === 'normal' ? escapeHtml(t.text) : `<span style="color:${TOKEN_COLORS[t.type]}">${escapeHtml(t.text)}</span>`
    ).join('');
  }

  private saveScript(): void {
    if (!this.currentScript || !this.textareaEl) return;
    this.currentScript.content = this.textareaEl.value;
    this.currentScript.modified = false;
    this.onSave?.(this.currentScript.id, this.textareaEl.value, true);
  }

  dispose(): void { this.hide(); }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

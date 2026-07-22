/**
 * VoiceChat — WebRTC voice chat with a DISABLE toggle.
 * Default state: DISABLED. User must explicitly opt in.
 * Preference is saved to localStorage so it persists.
 */

export interface VoiceChatConfig {
  enabled: boolean;
  muted: boolean;
  inputVolume: number; // 0-1
  outputVolume: number; // 0-1
  pushToTalk: boolean;
}

export interface VoiceUser {
  id: string;
  name: string;
  speaking: boolean;
  muted: boolean;
  volume: number;
}

const STORAGE_KEY = 'igrid-voice-chat-config';
const DEFAULT_CONFIG: VoiceChatConfig = {
  enabled: false,  // ⚠️ DISABLED BY DEFAULT — user must opt in
  muted: true,
  inputVolume: 0.8,
  outputVolume: 0.8,
  pushToTalk: false,
};

export class VoiceChat {
  private config: VoiceChatConfig;
  private panel: HTMLDivElement | null = null;
  private audioContext: AudioContext | null = null;
  private localStream: MediaStream | null = null;
  private peers: Map<string, RTCPeerConnection> = new Map();
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private users: VoiceUser[] = [];
  private panelEl: HTMLDivElement | null = null;
  private statusDot: HTMLDivElement | null = null;
  private onToggle?: (enabled: boolean) => void;
  private onMute?: (muted: boolean) => void;

  constructor(callbacks?: {
    onToggle?: (enabled: boolean) => void;
    onMute?: (muted: boolean) => void;
  }) {
    this.config = this.loadConfig();
    this.onToggle = callbacks?.onToggle;
    this.onMute = callbacks?.onMute;
  }

  /** Is voice chat currently enabled? */
  get enabled(): boolean { return this.config.enabled; }
  /** Is user muted? */
  get muted(): boolean { return this.config.muted; }

  /**
   * Toggle voice chat on/off. This is the main disable/enable switch.
   * When disabled, no microphone access is requested and no audio is played.
   */
  async toggle(): Promise<void> {
    if (this.config.enabled) {
      await this.disable();
    } else {
      await this.enable();
    }
  }

  async enable(): Promise<void> {
    if (this.config.enabled) return;
    this.config.enabled = true;
    this.config.muted = false;

    try {
      this.audioContext = new AudioContext();
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      this.updateStatusIndicator();
      this.saveConfig();
      this.onToggle?.(true);
      console.log('[VoiceChat] Enabled');
    } catch (err) {
      console.warn('[VoiceChat] Could not access microphone:', err);
      this.config.enabled = false;
      this.config.muted = true;
    }
  }

  async disable(): Promise<void> {
    this.config.enabled = false;
    this.config.muted = true;

    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }

    // Close all peer connections
    this.peers.forEach(pc => pc.close());
    this.peers.clear();

    // Remove audio elements
    this.audioElements.forEach(el => el.remove());
    this.audioElements.clear();

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.updateStatusIndicator();
    this.saveConfig();
    this.onToggle?.(false);
    console.log('[VoiceChat] Disabled');
  }

  toggleMute(): void {
    if (!this.config.enabled) return;
    this.config.muted = !this.config.muted;
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(t => { t.enabled = !this.config.muted; });
    }
    this.updateStatusIndicator();
    this.saveConfig();
    this.onMute?.(this.config.muted);
  }

  setInputVolume(vol: number): void {
    this.config.inputVolume = Math.max(0, Math.min(1, vol));
    this.saveConfig();
  }

  setOutputVolume(vol: number): void {
    this.config.outputVolume = Math.max(0, Math.min(1, vol));
    this.saveConfig();
    // Update all peer audio elements
    this.audioElements.forEach(el => { el.volume = this.config.outputVolume; });
  }

  togglePushToTalk(): void {
    this.config.pushToTalk = !this.config.pushToTalk;
    this.saveConfig();
  }

  /**
   * Show a floating voice status indicator (always visible).
   */
  createStatusIndicator(container: HTMLElement): void {
    this.statusDot = document.createElement('div');
    this.statusDot.style.cssText = `
      position:fixed; bottom:20px; right:20px; z-index:9999;
      display:flex; align-items:center; gap:8px; padding:6px 12px;
      background:rgba(20,20,30,0.9); border:1px solid rgba(255,255,255,0.15);
      border-radius:20px; cursor:pointer; font-family:'Segoe UI',sans-serif; font-size:11px;
      transition: all 0.2s;
    `;
    this.statusDot.onclick = () => this.toggleSettings();

    const dot = document.createElement('div');
    dot.style.cssText = `width:10px; height:10px; border-radius:50%;
      background:${this.config.enabled ? (this.config.muted ? '#f1fa8c' : '#50fa7b') : '#ff5555'};
    `;
    this.statusDot.appendChild(dot);

    const label = document.createElement('span');
    label.style.cssText = 'color:#ccc;';
    label.textContent = this.config.enabled ? (this.config.muted ? '🔇 Muted' : '🎙️ Voice On') : '🔇 Voice Off';
    this.statusDot.appendChild(label);

    container.appendChild(this.statusDot);
  }

  /**
   * Show/hide the voice settings panel.
   */
  toggleSettings(): void {
    if (this.panelEl) { this.panelEl.remove(); this.panelEl = null; return; }
    this.renderSettingsPanel();
  }

  private renderSettingsPanel(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.style.cssText = `
      position:fixed; bottom:60px; right:20px; width:260px; z-index:10000;
      background:rgba(20,20,30,0.95); border:1px solid rgba(100,150,255,0.3);
      border-radius:10px; font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 8px 32px rgba(0,0,0,0.5); padding:12px;
    `;

    const title = document.createElement('div');
    title.style.cssText = 'font-size:13px; font-weight:600; margin-bottom:10px;';
    title.textContent = '🎙️ Voice Chat Settings';
    this.panelEl.appendChild(title);

    // Main toggle — BIG AND OBVIOUS
    const toggleRow = document.createElement('div');
    toggleRow.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.1);';
    const toggleLabel = document.createElement('span');
    toggleLabel.style.cssText = 'font-size:12px;';
    toggleLabel.textContent = this.config.enabled ? '✅ Voice Enabled' : '❌ Voice Disabled';
    toggleRow.appendChild(toggleLabel);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = this.config.enabled ? 'TURN OFF' : 'TURN ON';
    toggleBtn.style.cssText = `
      padding:6px 14px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;
      background:${this.config.enabled ? 'rgba(255,80,80,0.3)' : 'rgba(80,255,120,0.3)'};
      border:1px solid ${this.config.enabled ? 'rgba(255,80,80,0.5)' : 'rgba(80,255,120,0.5)'};
      color:#fff;
    `;
    toggleBtn.onclick = async () => {
      await this.toggle();
      this.panelEl?.remove();
      this.panelEl = null;
      this.renderSettingsPanel();
    };
    toggleRow.appendChild(toggleBtn);
    this.panelEl.appendChild(toggleRow);

    // Only show other options when enabled
    if (this.config.enabled) {
      // Mute button
      const muteRow = document.createElement('div');
      muteRow.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:6px 0;';
      muteRow.appendChild(document.createTextNode('Mute Microphone'));
      const muteBtn = document.createElement('button');
      muteBtn.textContent = this.config.muted ? '🔇 Unmute' : '🎙️ Mute';
      muteBtn.style.cssText = 'padding:4px 10px; border-radius:3px; background:rgba(255,255,255,0.1); border:none; color:#ccc; cursor:pointer; font-size:11px;';
      muteBtn.onclick = () => { this.toggleMute(); this.panelEl?.remove(); this.panelEl = null; this.renderSettingsPanel(); };
      muteRow.appendChild(muteBtn);
      this.panelEl.appendChild(muteRow);

      // Output volume slider
      const volRow = document.createElement('div');
      volRow.style.cssText = 'padding:6px 0;';
      const volLabel = document.createElement('div');
      volLabel.style.cssText = 'font-size:11px; color:#888; margin-bottom:4px;';
      volLabel.textContent = `Volume: ${Math.round(this.config.outputVolume * 100)}%`;
      volRow.appendChild(volLabel);
      const volSlider = document.createElement('input');
      volSlider.type = 'range';
      volSlider.min = '0';
      volSlider.max = '100';
      volSlider.value = String(this.config.outputVolume * 100);
      volSlider.style.cssText = 'width:100%;';
      volSlider.oninput = () => {
        this.setOutputVolume(Number(volSlider.value) / 100);
        volLabel.textContent = `Volume: ${volSlider.value}%`;
      };
      volRow.appendChild(volSlider);
      this.panelEl.appendChild(volRow);

      // Push to talk
      const pttRow = document.createElement('div');
      pttRow.style.cssText = 'display:flex; align-items:center; gap:8px; padding:6px 0;';
      const pttCb = document.createElement('input');
      pttCb.type = 'checkbox';
      pttCb.checked = this.config.pushToTalk;
      pttCb.onchange = () => this.togglePushToTalk();
      pttRow.appendChild(pttCb);
      pttRow.appendChild(document.createTextNode('Push to Talk (Space key)'));
      this.panelEl.appendChild(pttRow);
    }

    // Connected users list
    if (this.users.length > 0) {
      const usersTitle = document.createElement('div');
      usersTitle.style.cssText = 'font-size:11px; color:#888; margin-top:8px; margin-bottom:4px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px;';
      usersTitle.textContent = `Connected (${this.users.length})`;
      this.panelEl.appendChild(usersTitle);

      for (const user of this.users) {
        const userRow = document.createElement('div');
        userRow.style.cssText = 'display:flex; align-items:center; gap:6px; padding:2px 0; font-size:11px;';
        const indicator = document.createElement('div');
        indicator.style.cssText = `width:6px; height:6px; border-radius:50%; background:${user.speaking ? '#50fa7b' : user.muted ? '#f1fa8c' : '#888'};`;
        userRow.appendChild(indicator);
        userRow.appendChild(document.createTextNode(`${user.name}${user.muted ? ' 🔇' : ''}`));
        this.panelEl.appendChild(userRow);
      }
    }

    document.body.appendChild(this.panelEl);
  }

  private updateStatusIndicator(): void {
    if (!this.statusDot) return;
    const dot = this.statusDot.children[0] as HTMLDivElement;
    const label = this.statusDot.children[1] as HTMLSpanElement;
    dot.style.background = this.config.enabled ? (this.config.muted ? '#f1fa8c' : '#50fa7b') : '#ff5555';
    label.textContent = this.config.enabled ? (this.config.muted ? '🔇 Muted' : '🎙️ Voice On') : '🔇 Voice Off';
  }

  private loadConfig(): VoiceChatConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<VoiceChatConfig>;
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch {}
    return { ...DEFAULT_CONFIG };
  }

  private saveConfig(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
    } catch {}
  }

  dispose(): void {
    this.disable();
    this.panelEl?.remove();
    this.statusDot?.remove();
  }
}

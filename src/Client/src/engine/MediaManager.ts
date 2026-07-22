/**
 * MediaManager — Handles parcel music streaming and media textures.
 * Supports SHOUTcast/Icecast streams via Web Audio API,
 * and HTML5 iframe overlay for media textures.
 */

export interface MediaStream {
  url: string;
  title: string;
  artist?: string;
  playing: boolean;
  volume: number;
}

export interface MediaTexture {
  objectId: string;
  face: number;
  url: string;
  type: 'texture' | 'video' | 'audio';
  width: number;
  height: number;
}

export class MediaManager {
  private audioContext: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private currentStream: MediaStream | null = null;
  private mediaOverlays = new Map<string, HTMLIFrameElement>();
  private volume = 0.5;
  private container: HTMLDivElement;
  private titleDisplay: HTMLDivElement | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'media-manager-overlay';
    this.container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9998;';
    document.body.appendChild(this.container);
  }

  /**
   * Play a music stream (SHOUTcast/Icecast).
   */
  playStream(url: string, title?: string): void {
    this.stopStream();

    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    this.audioElement = new Audio();
    this.audioElement.crossOrigin = 'anonymous';
    this.audioElement.src = url;
    this.audioElement.loop = true;

    this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.volume;

    this.sourceNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    this.audioElement.play().catch(console.error);

    this.currentStream = {
      url,
      title: title || this.extractTitleFromUrl(url),
      playing: true,
      volume: this.volume,
    };

    this.showTitleDisplay(this.currentStream.title);
  }

  /**
   * Stop the current stream.
   */
  stopStream(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
    }
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    this.currentStream = null;
    this.hideTitleDisplay();
  }

  /**
   * Set volume (0-1).
   */
  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
    if (this.currentStream) {
      this.currentStream.volume = this.volume;
    }
  }

  /**
   * Get current volume.
   */
  getVolume(): number {
    return this.volume;
  }

  /**
   * Toggle play/pause.
   */
  togglePlayPause(): void {
    if (!this.currentStream) return;
    if (this.currentStream.playing) {
      this.audioElement?.pause();
      this.currentStream.playing = false;
    } else {
      this.audioElement?.play().catch(console.error);
      this.currentStream.playing = true;
    }
  }

  /**
   * Add a media texture overlay (HTML5 iframe for video/HTML media).
   */
  addMediaTexture(objectId: string, face: number, url: string, width: number, height: number): void {
    const key = `${objectId}_${face}`;

    // Remove existing overlay for this face
    this.removeMediaTexture(objectId, face);

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
      position: absolute;
      width: ${width}px; height: ${height}px;
      border: none; pointer-events: auto;
      background: black;
    `;
    iframe.allow = 'autoplay; encrypted-media';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

    this.container.appendChild(iframe);
    this.mediaOverlays.set(key, iframe);
  }

  /**
   * Remove a media texture overlay.
   */
  removeMediaTexture(objectId: string, face: number): void {
    const key = `${objectId}_${face}`;
    const iframe = this.mediaOverlays.get(key);
    if (iframe) {
      iframe.remove();
      this.mediaOverlays.delete(key);
    }
  }

  /**
   * Update a media texture overlay position/size.
   */
  updateMediaTexture(objectId: string, face: number, x: number, y: number, width: number, height: number): void {
    const key = `${objectId}_${face}`;
    const iframe = this.mediaOverlays.get(key);
    if (iframe) {
      iframe.style.left = `${x}px`;
      iframe.style.top = `${y}px`;
      iframe.style.width = `${width}px`;
      iframe.style.height = `${height}px`;
    }
  }

  /**
   * Remove all media overlays.
   */
  clearMediaTextures(): void {
    this.mediaOverlays.forEach((iframe) => iframe.remove());
    this.mediaOverlays.clear();
  }

  /**
   * Get current stream info.
   */
  getCurrentStream(): MediaStream | null {
    return this.currentStream;
  }

  private showTitleDisplay(title: string): void {
    this.hideTitleDisplay();

    this.titleDisplay = document.createElement('div');
    this.titleDisplay.style.cssText = `
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      background: rgba(20, 20, 30, 0.9); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 6px; padding: 8px 16px; z-index: 9999;
      font-family: 'Segoe UI', sans-serif; font-size: 12px; color: #e0e0e0;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      display: flex; align-items: center; gap: 8px;
    `;

    const icon = document.createElement('span');
    icon.textContent = '🎵';
    icon.style.fontSize = '16px';
    this.titleDisplay.appendChild(icon);

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    this.titleDisplay.appendChild(titleSpan);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; cursor: pointer; margin-left: 8px;';
    closeBtn.onclick = () => this.stopStream();
    this.titleDisplay.appendChild(closeBtn);

    document.body.appendChild(this.titleDisplay);
  }

  private hideTitleDisplay(): void {
    if (this.titleDisplay) {
      this.titleDisplay.remove();
      this.titleDisplay = null;
    }
  }

  private extractTitleFromUrl(url: string): string {
    try {
      const parts = url.split('/');
      const lastPart = parts[parts.length - 1];
      return lastPart.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    } catch {
      return 'Unknown Stream';
    }
  }

  dispose(): void {
    this.stopStream();
    this.clearMediaTextures();
    this.container.remove();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

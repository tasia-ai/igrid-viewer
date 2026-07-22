/**
 * SoundManager — 3D positional audio via Web Audio API.
 *
 * Loads audio assets from the server's /api/assets/{uuid} endpoint,
 * decodes them into AudioBuffers (cached), and plays them through
 * per-source PannerNode chains for spatialization.
 */

interface SoundSource {
  id: string;
  buffer: AudioBuffer;
  source: AudioBufferSourceNode;
  panner: PannerNode;
  gain: GainNode;
  loop: boolean;
  playing: boolean;
}

export class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private listenerPos = { x: 0, y: 0, z: 0 };

  /** Cache of asset UUID → decoded AudioBuffer */
  private bufferCache = new Map<string, AudioBuffer>();

  /** Map of soundId → active sound source */
  private sources = new Map<string, SoundSource>();

  private baseUrl: string;
  private authToken: string;

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  // ─── Lazy init (requires user gesture) ───────────────────────

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // ─── Listener ────────────────────────────────────────────────

  /**
   * Update the audio listener position (called every frame from camera).
   * Coordinates are in metres; Three.js camera.position maps directly.
   */
  updateListener(px: number, py: number, pz: number): void {
    this.listenerPos = { x: px, y: py, z: pz };
    const ctx = this.ctx;
    if (!ctx) return;
    const l = ctx.listener;
    if ('positionX' in l) {
      // Web Audio spatial API (modern browsers)
      (l as any).positionX.setValueAtTime(px, ctx.currentTime);
      (l as any).positionY.setValueAtTime(py, ctx.currentTime);
      (l as any).positionZ.setValueAtTime(pz, ctx.currentTime);
    } else {
      // Fallback for older browsers
      (l as any).setPosition(px, py, pz);
    }
  }

  // ─── Buffer loading ──────────────────────────────────────────

  private async fetchBuffer(assetId: string): Promise<AudioBuffer> {
    const cached = this.bufferCache.get(assetId);
    if (cached) return cached;

    const ctx = this.ensureContext();
    const url = `${this.baseUrl}/api/assets/${assetId}`;
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${this.authToken}` },
    });
    if (!resp.ok) throw new Error(`Failed to fetch sound asset ${assetId}: ${resp.status}`);

    const arrayBuf = await resp.arrayBuffer();
    const decoded = await ctx.decodeAudioData(arrayBuf);
    this.bufferCache.set(assetId, decoded);
    return decoded;
  }

  // ─── Public API ──────────────────────────────────────────────

  /**
   * Play a sound at a 3-D position.
   * @param soundId  Asset UUID of the sound to play.
   * @param position Position in world space {x, y, z}.
   * @param volume   Gain multiplier 0..1+.
   * @param loop     Whether to loop the sound.
   * @returns        A promise that resolves once the sound starts playing.
   */
  async playSound(
    soundId: string,
    position: { x: number; y: number; z: number },
    volume: number,
    loop: boolean,
  ): Promise<void> {
    // Stop previous instance of this sound if it exists
    this.stopSoundInternal(soundId);

    const buffer = await this.fetchBuffer(soundId);
    const ctx = this.ensureContext();

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;

    const panner = ctx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 100;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 360;
    panner.coneOuterGain = 0;

    if ('positionX' in panner) {
      (panner as any).positionX.setValueAtTime(position.x, ctx.currentTime);
      (panner as any).positionY.setValueAtTime(position.y, ctx.currentTime);
      (panner as any).positionZ.setValueAtTime(position.z, ctx.currentTime);
    } else {
      (panner as any).setPosition(position.x, position.y, position.z);
    }

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(Math.max(0, volume), ctx.currentTime);

    // source → panner → gain → masterGain → destination
    source.connect(panner);
    panner.connect(gain);
    gain.connect(this.masterGain!);

    source.onended = () => {
      const entry = this.sources.get(soundId);
      if (entry && !entry.playing) return;
      // Only clean up if not restarted
      if (entry?.source === source) {
        this.sources.delete(soundId);
      }
    };

    const entry: SoundSource = {
      id: soundId,
      buffer,
      source,
      panner,
      gain,
      loop,
      playing: true,
    };
    this.sources.set(soundId, entry);

    source.start(0);
  }

  /**
   * Stop a specific sound by its soundId (asset UUID).
   */
  stopSound(soundId: string): void {
    this.stopSoundInternal(soundId);
  }

  private stopSoundInternal(soundId: string): void {
    const entry = this.sources.get(soundId);
    if (!entry) return;
    try {
      entry.source.stop();
    } catch {
      // already stopped
    }
    entry.playing = false;
    try {
      entry.source.disconnect();
      entry.panner.disconnect();
      entry.gain.disconnect();
    } catch {
      // ignore
    }
    this.sources.delete(soundId);
  }

  /**
   * Change the volume of a playing sound.
   */
  setVolume(soundId: string, volume: number): void {
    const entry = this.sources.get(soundId);
    if (!entry || !this.ctx) return;
    entry.gain.gain.setValueAtTime(Math.max(0, volume), this.ctx.currentTime);
  }

  /**
   * Stop all currently playing sounds.
   */
  stopAll(): void {
    for (const [id] of this.sources) {
      this.stopSoundInternal(id);
    }
  }

  /**
   * Dispose of the entire audio system. Call on page unload or disconnect.
   */
  dispose(): void {
    this.stopAll();
    this.bufferCache.clear();
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
    }
    this.ctx = null;
    this.masterGain = null;
  }
}

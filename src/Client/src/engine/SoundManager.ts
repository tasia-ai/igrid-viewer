/**
 * SoundManager — 3D positional audio via Web Audio API.
 *
 * Loads audio assets from the server's /api/assets/{uuid} endpoint,
 * decodes them into AudioBuffers (cached), and plays them through
 * per-source PannerNode chains for spatialization.
 *
 * Supports: positional sounds, ambient region sounds, footsteps,
 * and object-attached sounds with automatic position tracking.
 */

interface SoundSource {
  id: string;
  buffer: AudioBuffer;
  source: AudioBufferSourceNode;
  panner: PannerNode;
  gain: GainNode;
  loop: boolean;
  playing: boolean;
  /** If attached to an object, update position from ObjectRenderer each frame */
  trackedObjectId?: string;
}

export class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private listenerPos = { x: 0, y: 0, z: 0 };

  /** Cache of asset UUID → decoded AudioBuffer */
  private bufferCache = new Map<string, AudioBuffer>();

  /** Map of soundId → active sound source */
  private sources = new Map<string, SoundSource>();

  /** Ambient sound (region background) */
  private ambientSource: SoundSource | null = null;

  /** Footstep state */
  private footstepBuffer: AudioBuffer | null = null;
  private footstepCooldown = 0;
  private isMoving = false;

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
      (l as any).positionX.setValueAtTime(px, ctx.currentTime);
      (l as any).positionY.setValueAtTime(py, ctx.currentTime);
      (l as any).positionZ.setValueAtTime(pz, ctx.currentTime);
    } else {
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
   * @param objectId Optional: track this object's position each frame.
   * @returns        A promise that resolves once the sound starts playing.
   */
  async playSound(
    soundId: string,
    position: { x: number; y: number; z: number },
    volume: number,
    loop: boolean,
    objectId?: string,
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
      trackedObjectId: objectId,
    };
    this.sources.set(soundId, entry);

    source.start(0);
  }

  /**
   * Update position of a tracked sound (call from ObjectRenderer update).
   */
  updateSoundPosition(objectId: string, position: { x: number; y: number; z: number }): void {
    const ctx = this.ctx;
    if (!ctx) return;

    for (const [, source] of this.sources) {
      if (source.trackedObjectId === objectId) {
        if ('positionX' in source.panner) {
          (source.panner as any).positionX.setValueAtTime(position.x, ctx.currentTime);
          (source.panner as any).positionY.setValueAtTime(position.y, ctx.currentTime);
          (source.panner as any).positionZ.setValueAtTime(position.z, ctx.currentTime);
        } else {
          (source.panner as any).setPosition(position.x, position.y, position.z);
        }
      }
    }
  }

  /**
   * Play ambient region sound (loops forever, non-positional).
   */
  async playAmbient(soundId: string, volume: number = 0.3): Promise<void> {
    // Stop existing ambient
    this.stopAmbient();

    const buffer = await this.fetchBuffer(soundId);
    const ctx = this.ensureContext();

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(Math.max(0, volume), ctx.currentTime);

    // Ambient: no panner, goes straight to master (non-positional)
    source.connect(gain);
    gain.connect(this.masterGain!);

    this.ambientSource = {
      id: 'ambient',
      buffer,
      source,
      panner: null as any,
      gain,
      loop: true,
      playing: true,
    };

    source.start(0);
  }

  /**
   * Stop ambient sound.
   */
  stopAmbient(): void {
    if (this.ambientSource) {
      try { this.ambientSource.source.stop(); } catch {}
      try {
        this.ambientSource.source.disconnect();
        this.ambientSource.gain.disconnect();
      } catch {}
      this.ambientSource = null;
    }
  }

  /**
   * Play a footstep sound (with cooldown to prevent spam).
   */
  async playFootstep(volume: number = 0.15): Promise<void> {
    const now = Date.now();
    if (now - this.footstepCooldown < 300) return; // 300ms cooldown
    this.footstepCooldown = now;

    // Generate a simple procedural footstep if no asset loaded
    if (!this.footstepBuffer) {
      this.generateFootstepBuffer();
    }
    if (!this.footstepBuffer) return;

    const ctx = this.ensureContext();
    const source = ctx.createBufferSource();
    source.buffer = this.footstepBuffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);

    source.connect(gain);
    gain.connect(this.masterGain!);
    source.start(0);
  }

  /**
   * Set moving state for footstep sounds.
   */
  setMoving(moving: boolean): void {
    this.isMoving = moving;
  }

  /**
   * Update footstep system — call every frame with delta time.
   */
  updateFootsteps(delta: number): void {
    if (this.isMoving) {
      this.footstepCooldown -= delta * 1000;
    }
  }

  /**
   * Generate a procedural footstep sound buffer.
   */
  private generateFootstepBuffer(): void {
    const ctx = this.ensureContext();
    const sampleRate = ctx.sampleRate;
    const duration = 0.1;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    // Low-frequency thump with noise
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 30); // Fast decay
      const noise = (Math.random() * 2 - 1) * 0.3;
      const thump = Math.sin(t * 200 * Math.PI) * 0.7;
      data[i] = (noise + thump) * envelope;
    }

    this.footstepBuffer = buffer;
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
      if (entry.panner) entry.panner.disconnect();
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
   * Set master volume.
   */
  setMasterVolume(volume: number): void {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, volume), this.ctx.currentTime);
    }
  }

  /**
   * Stop all currently playing sounds.
   */
  stopAll(): void {
    for (const [id] of this.sources) {
      this.stopSoundInternal(id);
    }
    this.stopAmbient();
  }

  /**
   * Dispose of the entire audio system. Call on page unload or disconnect.
   */
  setMuted(muted: boolean): void {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 1, this.ctx?.currentTime ?? 0);
    }
  }

  dispose(): void {
    this.stopAll();
    this.bufferCache.clear();
    this.footstepBuffer = null;
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
    }
    this.ctx = null;
    this.masterGain = null;
  }
}

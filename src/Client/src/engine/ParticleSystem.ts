import * as THREE from 'three';

/**
 * Particle system data received from the server.
 * Maps to OpenMetaverse ParticleSystem byte-packed format.
 */
export interface ParticleSystemData {
  objectId: string;
  // Texture
  textureId?: string;
  // Emission
  burstSphereRate: number;     // Particles per second (0 = none)
  burstSphereRadius: number;
  // Particles
  maxAge: number;              // Lifetime in seconds
  lifetime: number;
  lifetimeVariance: number;
  // Speed / acceleration
  initialSpeed: number;
  finalSpeed: number;
  initialAcceleration: number;
  finalAcceleration: number;
  // Size
  initialSize: number;
  finalSize: number;
  // Colors (RGBA 0-1)
  startColor: { r: number; g: number; b: number; a: number };
  endColor: { r: number; g: number; b: number; a: number };
  // Pattern
  pattern: number;             // 0=cloud, 1=smoke, 2=fire, 3=spark, 4=glow, 5=ring
  // Emitter flags
  flags: number;
}

/**
 * A single particle's runtime state.
 */
interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
  maxAge: number;
  size: number;
  alpha: number;
}

const MAX_PARTICLES_PER_SYSTEM = 200;

/**
 * Client-side particle renderer for SL particle effects.
 * Uses THREE.Points with BufferGeometry for GPU-efficient rendering.
 * Supports: spark, fire, smoke, smoke plume, glow, ring patterns.
 */
export class ParticleSystemManager {
  private scene: THREE.Scene;
  private systems: Map<string, {
    data: ParticleSystemData;
    particles: Particle[];
    points: THREE.Points;
    geometry: THREE.BufferGeometry;
    material: THREE.PointsMaterial;
    emitAccumulator: number;
  }> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Create or update a particle system for an object.
   */
  updateSystem(data: ParticleSystemData, objectPosition?: THREE.Vector3): void {
    const existing = this.systems.get(data.objectId);

    if (data.burstSphereRate <= 0 && data.maxAge <= 0) {
      // No particles — remove if exists
      if (existing) {
        this.removeSystem(data.objectId);
      }
      return;
    }

    if (existing) {
      // Update existing system
      existing.data = data;
      if (objectPosition) {
        existing.points.position.copy(objectPosition);
      }
    } else {
      // Create new particle system
      this.createSystem(data, objectPosition);
    }
  }

  /**
   * Update all particle systems — call every frame.
   */
  update(delta: number): void {
    for (const [objectId, system] of this.systems) {
      // Emit new particles
      if (system.data.burstSphereRate > 0) {
        system.emitAccumulator += delta * system.data.burstSphereRate;
        while (system.emitAccumulator >= 1 && system.particles.length < MAX_PARTICLES_PER_SYSTEM) {
          this.emitParticle(system);
          system.emitAccumulator -= 1;
        }
      }

      // Update existing particles
      const toRemove: number[] = [];
      for (let i = 0; i < system.particles.length; i++) {
        const p = system.particles[i];
        p.age += delta;
        if (p.age >= p.maxAge) {
          toRemove.push(i);
          continue;
        }

        // Physics: position += velocity * dt, velocity += acceleration * dt
        const accel = new THREE.Vector3(
          system.data.finalAcceleration - system.data.initialAcceleration,
          9.8, // slight gravity
          system.data.finalAcceleration - system.data.initialAcceleration
        );
        p.velocity.add(accel.multiplyScalar(delta));
        p.position.add(p.velocity.clone().multiplyScalar(delta));

        // Lerp size and alpha based on age
        const t = p.age / p.maxAge;
        p.size = THREE.MathUtils.lerp(system.data.initialSize, system.data.finalSize, t);
        p.alpha = THREE.MathUtils.lerp(system.data.startColor.a, system.data.endColor.a, t);
      }

      // Remove dead particles (reverse order)
      for (let i = toRemove.length - 1; i >= 0; i--) {
        system.particles.splice(toRemove[i], 1);
      }

      // Update GPU buffers
      this.updateBuffers(system);
    }
  }

  /**
   * Remove a particle system.
   */
  removeSystem(objectId: string): void {
    const system = this.systems.get(objectId);
    if (!system) return;

    this.scene.remove(system.points);
    system.geometry.dispose();
    system.material.dispose();
    this.systems.delete(objectId);
  }

  /**
   * Clear all particle systems.
   */
  clear(): void {
    for (const [id] of this.systems) {
      this.removeSystem(id);
    }
  }

  // ── Private ───────────────────────────────────────────────────────

  private createSystem(data: ParticleSystemData, position?: THREE.Vector3): void {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(MAX_PARTICLES_PER_SYSTEM * 3);
    const sizes = new Float32Array(MAX_PARTICLES_PER_SYSTEM);
    const alphas = new Float32Array(MAX_PARTICLES_PER_SYSTEM);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    // Derive material from pattern type
    const mat = this.createMaterial(data);

    const points = new THREE.Points(geometry, mat);
    points.frustumCulled = false;
    points.position.copy(position || new THREE.Vector3());

    this.scene.add(points);

    this.systems.set(data.objectId, {
      data,
      particles: [],
      points,
      geometry,
      material: mat,
      emitAccumulator: 0,
    });
  }

  private createMaterial(data: ParticleSystemData): THREE.PointsMaterial {
    const color = new THREE.Color(
      data.startColor.r,
      data.startColor.g,
      data.startColor.b
    );

    // Generate a small procedural texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);

    switch (data.pattern) {
      case 3: // Spark — bright sharp center
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, `rgba(255,200,100,0.8)`);
        gradient.addColorStop(1, 'rgba(255,100,0,0)');
        break;
      case 2: // Fire — orange/red glow
        gradient.addColorStop(0, 'rgba(255,255,200,1)');
        gradient.addColorStop(0.3, 'rgba(255,120,0,0.8)');
        gradient.addColorStop(1, 'rgba(200,0,0,0)');
        break;
      case 1: // Smoke — soft gray
        gradient.addColorStop(0, 'rgba(180,180,180,0.6)');
        gradient.addColorStop(0.5, 'rgba(120,120,120,0.3)');
        gradient.addColorStop(1, 'rgba(80,80,80,0)');
        break;
      case 4: // Glow — soft bright
        gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
        gradient.addColorStop(0.3, 'rgba(200,200,255,0.5)');
        gradient.addColorStop(1, 'rgba(100,100,255,0)');
        break;
      case 5: // Ring — sharp edge
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.7, `rgba(255,255,255,0.3)`);
        gradient.addColorStop(0.9, `rgba(255,255,255,0.8)`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        break;
      default: // Cloud (0) — soft white
        gradient.addColorStop(0, 'rgba(255,255,255,0.5)');
        gradient.addColorStop(0.5, 'rgba(200,200,220,0.3)');
        gradient.addColorStop(1, 'rgba(150,150,170,0)');
        break;
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    return new THREE.PointsMaterial({
      color,
      size: data.initialSize,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }

  private emitParticle(system: {
    data: ParticleSystemData;
    particles: Particle[];
  }): void {
    const data = system.data;
    const pos = new THREE.Vector3();

    // Emit from sphere radius
    const r = data.burstSphereRadius;
    pos.set(
      (Math.random() - 0.5) * r,
      (Math.random() - 0.5) * r,
      (Math.random() - 0.5) * r
    );

    // Initial velocity based on pattern
    const vel = new THREE.Vector3();
    const speed = data.initialSpeed;
    switch (data.pattern) {
      case 3: // Spark — upward fast
        vel.set(
          (Math.random() - 0.5) * speed * 2,
          Math.random() * speed * 3,
          (Math.random() - 0.5) * speed * 2
        );
        break;
      case 2: // Fire — upward
        vel.set(
          (Math.random() - 0.5) * speed,
          Math.random() * speed * 2,
          (Math.random() - 0.5) * speed
        );
        break;
      case 5: // Ring — outward radial
        vel.copy(pos).normalize().multiplyScalar(speed);
        break;
      default: // Cloud, smoke, glow — slow drift
        vel.set(
          (Math.random() - 0.5) * speed * 0.5,
          Math.random() * speed,
          (Math.random() - 0.5) * speed * 0.5
        );
        break;
    }

    const maxAge = data.maxAge + (Math.random() - 0.5) * data.lifetimeVariance;

    system.particles.push({
      position: pos,
      velocity: vel,
      age: 0,
      maxAge: Math.max(0.1, maxAge),
      size: data.initialSize,
      alpha: data.startColor.a,
    });
  }

  private updateBuffers(system: {
    particles: Particle[];
    geometry: THREE.BufferGeometry;
    material: THREE.PointsMaterial;
    data: ParticleSystemData;
  }): void {
    const posAttr = system.geometry.getAttribute('position') as THREE.BufferAttribute;
    const sizeAttr = system.geometry.getAttribute('size') as THREE.BufferAttribute;
    const alphaAttr = system.geometry.getAttribute('alpha') as THREE.BufferAttribute;

    const count = system.particles.length;

    for (let i = 0; i < MAX_PARTICLES_PER_SYSTEM; i++) {
      if (i < count) {
        const p = system.particles[i];
        posAttr.setXYZ(i, p.position.x, p.position.y, p.position.z);
        sizeAttr.setX(i, p.size);
        alphaAttr.setX(i, p.alpha);
      } else {
        // Hide unused particles by moving far away
        posAttr.setXYZ(i, 0, -99999, 0);
        sizeAttr.setX(i, 0);
        alphaAttr.setX(i, 0);
      }
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;

    system.geometry.setDrawRange(0, count);

    // Update material color from current start color
    const t = Math.min(1, system.particles[0]?.age / system.particles[0]?.maxAge || 0);
    system.material.color.setRGB(
      THREE.MathUtils.lerp(system.data.startColor.r, system.data.endColor.r, t),
      THREE.MathUtils.lerp(system.data.startColor.g, system.data.endColor.g, t),
      THREE.MathUtils.lerp(system.data.startColor.b, system.data.endColor.b, t)
    );
  }
}

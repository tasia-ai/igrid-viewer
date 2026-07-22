import * as THREE from 'three';

/**
 * Flexible data received from the server.
 * Matches OpenMetaverse.Primitive.FlexibleData fields.
 */
export interface FlexibleData {
  objectId: string;
  softness: number;     // 0-255, higher = stiffer
  gravity: number;      // Pull down force
  drag: number;         // Air resistance
  wind: number;         // Wind susceptibility
  tension: number;      // Spring tension
  forceX: number;       // External force direction
  forceY: number;
  forceZ: number;
  // Mesh segment info
  segmentCount: number; // Number of segments for subdivision
  // Original position/rotation from parent ObjectUpdate
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  scale: { x: number; y: number; z: number };
}

/**
 * Runtime state for a single flexible prim's physics simulation.
 */
interface FlexBody {
  data: FlexibleData;
  group: THREE.Group;
  mesh: THREE.Mesh;
  originalPositions: Float32Array;  // Rest positions
  velocities: Float32Array;          // Per-vertex velocity
  segmentCount: number;
  timeAccumulator: number;
}

/**
 * Vertex displacement renderer for flexible prims (flags, hair, cloth).
 * Subdivides the mesh into segments and applies spring physics per vertex.
 */
export class FlexibleRenderer {
  private scene: THREE.Scene;
  private bodies: Map<string, FlexBody> = new Map();
  private windTime = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Register a flexible prim for physics simulation.
   */
  addFlexible(data: FlexibleData, group: THREE.Group, mesh: THREE.Mesh): void {
    // If already tracked, update data
    const existing = this.bodies.get(data.objectId);
    if (existing) {
      existing.data = data;
      return;
    }

    // Determine segment count from the mesh's path segments or default
    const segCount = Math.max(2, Math.min(data.segmentCount || 8, 24));

    // Clone original positions for spring physics
    const geo = mesh.geometry;
    const posAttr = geo.getAttribute('position');
    const vertCount = posAttr.count;
    const originalPositions = new Float32Array(vertCount * 3);
    const velocities = new Float32Array(vertCount * 3);

    for (let i = 0; i < vertCount; i++) {
      originalPositions[i * 3] = posAttr.getX(i);
      originalPositions[i * 3 + 1] = posAttr.getY(i);
      originalPositions[i * 3 + 2] = posAttr.getZ(i);
    }

    this.bodies.set(data.objectId, {
      data,
      group,
      mesh,
      originalPositions,
      velocities,
      segmentCount: segCount,
      timeAccumulator: 0,
    });
  }

  /**
   * Update flexible physics — call every frame.
   */
  update(delta: number): void {
    this.windTime += delta;

    for (const [, body] of this.bodies) {
      body.timeAccumulator += delta;
      if (body.timeAccumulator < 0.016) continue; // Cap at ~60fps physics
      const dt = body.timeAccumulator;
      body.timeAccumulator = 0;

      const { data, mesh, originalPositions, velocities } = body;
      const geo = mesh.geometry;
      const posAttr = geo.getAttribute('position');
      const vertCount = posAttr.count;

      // Compute softness factor (0 = very flexible, 255 = rigid)
      const softnessFactor = 1.0 - (data.softness / 255.0);

      // External force (from server + wind)
      const windForce = new THREE.Vector3(
        Math.sin(this.windTime * 0.5) * data.wind * 0.3,
        0,
        Math.cos(this.windTime * 0.7) * data.wind * 0.2
      );

      const externalForce = new THREE.Vector3(
        data.forceX + windForce.x,
        -data.gravity + windForce.y,
        data.forceZ + windForce.z
      );

      // Apply spring physics per vertex
      for (let i = 0; i < vertCount; i++) {
        const i3 = i * 3;

        // Current position
        const cx = posAttr.getX(i);
        const cy = posAttr.getY(i);
        const cz = posAttr.getZ(i);

        // Rest position
        const rx = originalPositions[i3];
        const ry = originalPositions[i3 + 1];
        const rz = originalPositions[i3 + 2];

        // Spring displacement from rest
        const dx = rx - cx;
        const dy = ry - cy;
        const dz = rz - cz;

        // Spring force (Hooke's law)
        const springForceX = dx * data.tension * softnessFactor;
        const springForceY = dy * data.tension * softnessFactor;
        const springForceZ = dz * data.tension * softnessFactor;

        // Total force
        const fx = (externalForce.x + springForceX) * dt;
        const fy = (externalForce.y + springForceY) * dt;
        const fz = (externalForce.z + springForceZ) * dt;

        // Integrate velocity with drag
        velocities[i3] = (velocities[i3] + fx) * (1.0 - data.drag * 0.1);
        velocities[i3 + 1] = (velocities[i3 + 1] + fy) * (1.0 - data.drag * 0.1);
        velocities[i3 + 2] = (velocities[i3 + 2] + fz) * (1.0 - data.drag * 0.1);

        // Integrate position
        posAttr.setXYZ(i,
          cx + velocities[i3] * dt,
          cy + velocities[i3 + 1] * dt,
          cz + velocities[i3 + 2] * dt
        );
      }

      posAttr.needsUpdate = true;
      geo.computeVertexNormals();
    }
  }

  /**
   * Remove a flexible body.
   */
  removeFlexible(objectId: string): void {
    this.bodies.delete(objectId);
  }

  /**
   * Clear all flexible bodies.
   */
  clear(): void {
    this.bodies.clear();
  }
}

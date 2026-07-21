import * as THREE from 'three';

const PATCH_SIZE = 256;
const TERRAIN_SCALE = 0.5;

/**
 * Renders OpenSim terrain patches as 3D heightmap meshes.
 * Each patch is a 16x16 height grid covering 256x256 meters.
 */
export class TerrainRenderer {
  private scene: THREE.Scene;
  private patches: Map<string, THREE.Mesh> = new Map();
  private material: THREE.MeshStandardMaterial;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: false,
    });
  }

  /**
   * Add or update a terrain patch from OpenSim data.
   */
  updatePatch(patchX: number, patchY: number, heights: Float32Array | number[]): void {
    const key = `${patchX},${patchY}`;
    const existing = this.patches.get(key);
    if (existing) {
      this.scene.remove(existing);
      existing.geometry.dispose();
    }

    const geometry = this.buildGeometry(patchX, patchY, heights);
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.patches.set(key, mesh);
  }

  private buildGeometry(
    patchX: number,
    patchY: number,
    heights: Float32Array | number[]
  ): THREE.BufferGeometry {
    const segments = 15;
    const geometry = new THREE.PlaneGeometry(PATCH_SIZE, PATCH_SIZE, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);

    for (let i = 0; i < positions.count; i++) {
      const ix = i % (segments + 1);
      const iy = Math.floor(i / (segments + 1));
      const heightIndex = iy * 16 + ix;
      const height = (heights[heightIndex] ?? 0) * TERRAIN_SCALE;

      positions.setY(i, height);

      // Color based on height
      const h = Math.min(height / 60, 1);
      colors[i * 3] = 0.25 + h * 0.15;
      colors[i * 3 + 1] = 0.45 + h * 0.25;
      colors[i * 3 + 2] = 0.12 + h * 0.08;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    geometry.translate(patchX * PATCH_SIZE, 0, patchY * PATCH_SIZE);

    return geometry;
  }

  removePatch(patchX: number, patchY: number): void {
    const key = `${patchX},${patchY}`;
    const mesh = this.patches.get(key);
    if (mesh) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      this.patches.delete(key);
    }
  }
}

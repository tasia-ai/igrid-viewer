import * as THREE from 'three';

const PATCH_SIZE = 256;
const TERRAIN_SCALE = 0.5;

/**
 * Terrain texture layers for SL/OpenSim terrain rendering.
 * Each layer has a texture UUID and height range for blending.
 */
export interface TerrainLayer {
  textureId?: string;
  minHeight: number;
  maxHeight: number;
  // PBR properties
  roughness?: number;
  metalness?: number;
}

/**
 * Default SL terrain layers: 3 layers with height-based blending.
 */
const DEFAULT_LAYERS: TerrainLayer[] = [
  { minHeight: -10, maxHeight: 15, roughness: 0.9, metalness: 0.0 },   // Ground
  { minHeight: 10, maxHeight: 40, roughness: 0.8, metalness: 0.0 },   // Rock
  { minHeight: 35, maxHeight: 100, roughness: 0.7, metalness: 0.1 },  // Snow
];

/**
 * Renders OpenSim terrain patches as 3D heightmap meshes with PBR materials.
 * Each patch is a 16x16 height grid covering 256x256 meters.
 * Supports per-layer textures with height-based blending.
 */
export class TerrainRenderer {
  private scene: THREE.Scene;
  private patches: Map<string, THREE.Mesh> = new Map();
  private layers: TerrainLayer[];
  private materials: Map<number, THREE.MeshStandardMaterial> = new Map();
  private textureLoader: THREE.TextureLoader;
  private baseUrl: string;
  private authToken: string;

  constructor(scene: THREE.Scene, baseUrl: string = '', authToken: string = '') {
    this.scene = scene;
    this.baseUrl = baseUrl;
    this.authToken = authToken;
    this.textureLoader = new THREE.TextureLoader();
    this.layers = [...DEFAULT_LAYERS];

    // Create default materials (will be replaced when textures load)
    this.createDefaultMaterials();
  }

  /**
   * Set terrain texture layers from grid data.
   */
  setLayers(layers: TerrainLayer[]): void {
    this.layers = layers;
    this.createDefaultMaterials();
  }

  private createDefaultMaterials(): void {
    // Layer 0: Ground (brown/green)
    this.materials.set(0, new THREE.MeshStandardMaterial({
      color: 0x6b8e3a,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: false,
    }));

    // Layer 1: Rock (gray)
    this.materials.set(1, new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.8,
      metalness: 0.05,
      flatShading: false,
    }));

    // Layer 2: Snow (white)
    this.materials.set(2, new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.7,
      metalness: 0.0,
      flatShading: false,
    }));
  }

  /**
   * Load a terrain texture from the grid proxy.
   */
  async loadTerrainTexture(layerIndex: number, textureId: string): Promise<void> {
    if (!this.baseUrl) return;

    const texture = await new Promise<THREE.Texture>((resolve, reject) => {
      this.textureLoader.load(
        `${this.baseUrl}/api/textures/${textureId}`,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(8, 8); // Tile texture across terrain
          resolve(tex);
        },
        undefined,
        reject
      );
    });

    const existingMaterial = this.materials.get(layerIndex);
    if (existingMaterial) {
      existingMaterial.map = texture;
      existingMaterial.needsUpdate = true;
    }

    // Update all existing patches that use this material
    for (const [, mesh] of this.patches) {
      if (mesh.material === existingMaterial) {
        mesh.material.needsUpdate = true;
      }
    }
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
    const material = this.createTerrainMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.patches.set(key, mesh);
  }

  /**
   * Create a blended terrain material based on height ranges.
   * Uses vertex colors to blend between layers.
   */
  private createTerrainMaterial(): THREE.MeshStandardMaterial {
    // For now, use the ground material with vertex coloring for height
    return new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: false,
    });
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

      // Color based on height layer
      const color = this.getLayerColor(height);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    geometry.translate(patchX * PATCH_SIZE, 0, patchY * PATCH_SIZE);

    return geometry;
  }

  /**
   * Get terrain color based on height using layer blending.
   */
  private getLayerColor(height: number): { r: number; g: number; b: number } {
    // Default height-based coloring (matches SL default terrain)
    if (height < 10) {
      // Low ground - dark green/brown
      const t = Math.max(0, (height + 10) / 20);
      return {
        r: 0.25 + t * 0.15,
        g: 0.35 + t * 0.20,
        b: 0.15 + t * 0.05,
      };
    } else if (height < 30) {
      // Mid ground - lighter green
      const t = (height - 10) / 20;
      return {
        r: 0.40 + t * 0.15,
        g: 0.55 + t * 0.10,
        b: 0.20 + t * 0.05,
      };
    } else if (height < 50) {
      // Rocky area - gray
      const t = (height - 30) / 20;
      return {
        r: 0.50 + t * 0.15,
        g: 0.50 + t * 0.10,
        b: 0.48 + t * 0.10,
      };
    } else {
      // Snow/peak - white
      const t = Math.min(1, (height - 50) / 30);
      return {
        r: 0.70 + t * 0.25,
        g: 0.70 + t * 0.25,
        b: 0.72 + t * 0.25,
      };
    }
  }

  removePatch(patchX: number, patchY: number): void {
    const key = `${patchX},${patchY}`;
    const mesh = this.patches.get(key);
    if (mesh) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (!Array.isArray(mesh.material)) mesh.material.dispose();
      this.patches.delete(key);
    }
  }

  dispose(): void {
    for (const [, mesh] of this.patches) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (!Array.isArray(mesh.material)) mesh.material.dispose();
    }
    this.patches.clear();

    for (const [, mat] of this.materials) {
      if (mat.map) mat.map.dispose();
      mat.dispose();
    }
    this.materials.clear();
  }
}

import * as THREE from 'three';

/**
 * SL texture format codes from OpenMetaverse.
 */
export enum TextureFormat {
  RGBA8 = 0,
  DXT1 = 1,
  DXT3 = 2,
  DXT5 = 3,
}

/**
 * SL texture entry face data from LibreMetaverse.
 * Raw binary layout from Primitive.TextureEntryFace.
 */
export interface SLTextureFace {
  textureId?: string;
  repeatU: number;
  repeatV: number;
  offsetU: number;
  offsetV: number;
  rotation: number;
  materialId?: string;
}

/**
 * PBR material properties from SL/OpenSim.
 * Maps to the PBR metallic-roughness workflow.
 */
export interface PBRMaterialProps {
  baseColorTexture?: string;
  baseColorFactor?: [number, number, number, number];
  metallicTexture?: string;
  metallicFactor?: number;
  roughnessTexture?: string;
  roughnessFactor?: number;
  normalTexture?: string;
  emissiveTexture?: string;
  emissiveFactor?: [number, number, number];
}

/**
 * Material cache keyed by texture UUID to avoid duplicate loads.
 */
const materialCache = new Map<string, THREE.Material | THREE.Texture>();

/**
 * Loads and applies PBR materials from SL/OpenSim texture entries.
 * Uses Three.js MeshStandardMaterial (PBR metallic-roughness workflow).
 */
export class PBRMaterialLoader {
  private textureLoader = new THREE.TextureLoader();
  private baseUrl: string;
  private authToken: string;

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  /**
   * Create a Three.js material from SL texture entry face data.
   */
  async loadFromFace(face: SLTextureFace): Promise<THREE.MeshStandardMaterial> {
    if (!face.textureId) {
      return new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.7,
        metalness: 0.1,
      });
    }

    const cached = materialCache.get(face.textureId);
    if (cached instanceof THREE.MeshStandardMaterial) {
      return cached.clone();
    }

    const material = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      metalness: 0.1,
    });

    try {
      const texture = await this.loadTexture(face.textureId);
      material.map = texture;
      material.needsUpdate = true;
    } catch (err) {
      console.warn(`[Material] Failed to load texture ${face.textureId}:`, err);
    }

    materialCache.set(face.textureId, material);
    return material;
  }

  /**
   * Create a Three.js material from full PBR material properties.
   */
  async loadPBR(props: PBRMaterialProps): Promise<THREE.MeshStandardMaterial> {
    const material = new THREE.MeshStandardMaterial({
      roughness: props.roughnessFactor ?? 0.7,
      metalness: props.metallicFactor ?? 0.0,
    });

    // Base color
    if (props.baseColorFactor) {
      const [r, g, b, a] = props.baseColorFactor;
      material.color.setRGB(r, g, b);
      if (a < 1.0) {
        material.transparent = true;
        material.opacity = a;
      }
    }

    // Base color texture
    if (props.baseColorTexture) {
      try {
        const tex = await this.loadTexture(props.baseColorTexture);
        material.map = tex;
      } catch (err) {
        console.warn(`[Material] Failed to load base color texture:`, err);
      }
    }

    // Metallic-roughness texture (single texture, R=metallic, G=roughness in GLTF)
    if (props.metallicTexture) {
      try {
        const tex = await this.loadTexture(props.metallicTexture);
        material.metalnessMap = tex;
        material.roughnessMap = tex;
      } catch (err) {
        console.warn(`[Material] Failed to load metallic/roughness texture:`, err);
      }
    }

    // Normal map
    if (props.normalTexture) {
      try {
        const tex = await this.loadTexture(props.normalTexture);
        material.normalMap = tex;
        material.normalScale.set(1, 1);
      } catch (err) {
        console.warn(`[Material] Failed to load normal texture:`, err);
      }
    }

    // Emissive
    if (props.emissiveTexture) {
      try {
        const tex = await this.loadTexture(props.emissiveTexture);
        material.emissiveMap = tex;
      } catch (err) {
        console.warn(`[Material] Failed to load emissive texture:`, err);
      }
    }

    if (props.emissiveFactor) {
      const [r, g, b] = props.emissiveFactor;
      material.emissive.setRGB(r, g, b);
    }

    material.needsUpdate = true;
    return material;
  }

  /**
   * Load a texture through the server proxy endpoint.
   * The proxy handles grid authentication and caching.
   */
  private loadTexture(textureId: string): Promise<THREE.Texture> {
    const cached = materialCache.get(`tex:${textureId}`);
    if (cached instanceof THREE.Texture) {
      return Promise.resolve(cached);
    }

    return new Promise<THREE.Texture>((resolve, reject) => {
      this.textureLoader.load(
        `${this.baseUrl}/api/textures/${textureId}`,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          materialCache.set(`tex:${textureId}`, texture);
          resolve(texture);
        },
        undefined,
        reject
      );
    });
  }

  /**
   * Dispose all cached materials and textures.
   */
  dispose(): void {
    for (const [, mat] of materialCache) {
      if (mat instanceof THREE.Material) {
        mat.dispose();
      }
      if (mat instanceof THREE.Texture) {
        mat.dispose();
      }
    }
    materialCache.clear();
  }
}

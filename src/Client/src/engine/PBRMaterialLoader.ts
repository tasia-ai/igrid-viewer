import * as THREE from 'three';

export interface SLTextureFace {
  textureId: string;
  repeatU: number;
  repeatV: number;
  offsetU: number;
  offsetV: number;
  rotation: number;
}

const materialCache = new Map<string, THREE.Material | THREE.Texture>();
const failedTextures = new Set<string>(); // Cache 404s to avoid repeat requests

/**
 * PBR Material loader for SL textures.
 * Uses server proxy endpoint (no auth needed — asset server is public HTTP).
 * Caches textures in browser (via HTTP Cache-Control headers).
 * Skips zero-UUID textures and caches 404 failures.
 */
export class PBRMaterialLoader {
  private textureLoader = new THREE.TextureLoader();

  constructor(private baseUrl: string, private authToken: string) {}

  async loadFromFace(face: SLTextureFace): Promise<THREE.MeshStandardMaterial> {
    if (!face.textureId || face.textureId === '00000000-0000-0000-0000-000000000000') {
      return new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.7, metalness: 0.1 });
    }

    const cacheKey = face.textureId;
    if (failedTextures.has(cacheKey)) {
      return new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.7, metalness: 0.1 });
    }

    const cachedMat = materialCache.get(cacheKey);
    if (cachedMat instanceof THREE.MeshStandardMaterial) {
      const mat = cachedMat.clone();
      if (face.repeatU !== 1 || face.repeatV !== 1) {
        mat.map = mat.map?.clone() ?? null;
        if (mat.map) {
          mat.map.repeat.set(face.repeatU, face.repeatV);
          mat.map.offset.set(face.offsetU, face.offsetV);
          mat.map.rotation = face.rotation;
          mat.map.needsUpdate = true;
        }
      }
      return mat;
    }

    const material = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.1 });

    try {
      const texture = await this.loadTexture(face.textureId);
      material.map = texture;
      material.needsUpdate = true;
    } catch {
      failedTextures.add(cacheKey); // Don't retry failed textures
    }

    materialCache.set(cacheKey, material);
    return material;
  }

  private async loadTexture(textureId: string): Promise<THREE.Texture> {
    const cached = materialCache.get(`tex:${textureId}`);
    if (cached instanceof THREE.Texture) return cached;

    // Skip zero UUIDs
    if (!textureId || textureId === '00000000-0000-0000-0000-000000000000') {
      throw new Error('Zero UUID');
    }

    try {
      // No auth header needed — asset server is public HTTP
      const res = await fetch(`${this.baseUrl}/api/textures/${textureId}`);

      if (res.status === 304) {
        // Browser cache hit — create texture from cache
        const blob = await res.blob();
        return this.blobToTexture(blob, textureId);
      }

      if (!res.ok) {
        failedTextures.add(textureId);
        throw new Error(`Texture ${textureId}: ${res.status}`);
      }

      const blob = await res.blob();
      return this.blobToTexture(blob, textureId);
    } catch (err) {
      console.warn(`[Material] Texture ${textureId} failed:`, err);
      throw err;
    }
  }

  private blobToTexture(blob: Blob, textureId: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        materialCache.set(`tex:${textureId}`, texture);
        URL.revokeObjectURL(url);
        resolve(texture);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to decode image ${textureId}`));
      };
      img.src = url;
    });
  }

  dispose(): void {
    for (const [, mat] of materialCache) {
      if (mat instanceof THREE.Material) mat.dispose();
    }
  }
}

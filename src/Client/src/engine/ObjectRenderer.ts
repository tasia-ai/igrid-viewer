import * as THREE from 'three';
import { PBRMaterialLoader, SLTextureFace } from './PBRMaterialLoader';
import { SLMeshDecoder } from './SLMeshDecoder';

export interface PrimData {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  scale: { x: number; y: number; z: number };
  primType: number;
  textureId?: string;
  faces?: (any | null)[];
  meshData?: ArrayBuffer;
  profileCurve?: number;
  pathCurve?: number;
  profileBegin?: number;
  profileEnd?: number;
  profileHollow?: number;
  pathBegin?: number;
  pathEnd?: number;
  pathScaleX?: number;
  pathScaleY?: number;
  pathTaperX?: number;
  pathTaperY?: number;
  pathTwist?: number;
  pathTwistBegin?: number;
  pathRevolutions?: number;
}

const DEFAULT_MATERIAL = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.7, metalness: 0.1 });

export class ObjectRenderer {
  private scene: THREE.Scene;
  private objects: Map<string, THREE.Object3D> = new Map();
  private pendingMeshes = new Map<string, ArrayBuffer>(); // Queue for mesh data before prim exists
  private materialLoader: PBRMaterialLoader;
  private meshDecoder = new SLMeshDecoder();

  constructor(scene: THREE.Scene, materialLoader: PBRMaterialLoader) {
    this.scene = scene;
    this.materialLoader = materialLoader;
  }

  /**
   * Update prim — FAST PATH: create geometry IMMEDIATELY with default material,
   * load texture in BACKGROUND (non-blocking).
   * Skip objects too far from camera.
   */
  async updatePrim(prim: PrimData, cameraPos?: THREE.Vector3): Promise<void> {
    const existing = this.objects.get(prim.id);

    // Distance culling — skip objects far from camera
    if (cameraPos) {
      const dx = prim.position.x - cameraPos.x;
      const dz = prim.position.y - cameraPos.z;
      const distSq = dx * dx + dz * dz;
      if (distSq > 256 * 256) {
        // Too far — hide if exists, don't create
        if (existing) { existing.visible = false; }
        return;
      } else if (existing) {
        existing.visible = true;
      }
    }

    // If already exists, just update position/rotation/scale (instant)
    if (existing) {
      existing.position.set(prim.position.x, prim.position.z, prim.position.y);
      existing.quaternion.set(prim.rotation.x, prim.rotation.z, prim.rotation.y, prim.rotation.w);
      existing.scale.set(prim.scale.x, prim.scale.z, prim.scale.y);
      return;
    }

    // New prim — create geometry IMMEDIATELY with default material
    const geometry = this.createGeometry(prim);
    const mesh = new THREE.Mesh(geometry, DEFAULT_MATERIAL.clone());
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const group = new THREE.Group();
    group.add(mesh);
    group.position.set(prim.position.x, prim.position.z, prim.position.y);
    group.quaternion.set(prim.rotation.x, prim.rotation.z, prim.rotation.y, prim.rotation.w);
    group.scale.set(prim.scale.x, prim.scale.z, prim.scale.y);
    group.userData.primId = prim.id;
    group.userData.primName = prim.name;

    this.scene.add(group);
    this.objects.set(prim.id, group);

    // Check if mesh data arrived before prim was created (timing fix)
    if (this.pendingMeshes.has(prim.id)) {
      const meshData = this.pendingMeshes.get(prim.id)!;
      this.pendingMeshes.delete(prim.id);
      this.replaceMeshGeometry(prim.id, meshData);
    }

    // Load texture in BACKGROUND (non-blocking!) — swap material when done
    const texId = prim.textureId || (prim.faces?.[0] as any)?.TextureId;
    if (texId && texId !== '00000000-0000-0000-0000-000000000000') {
      const face: SLTextureFace = {
        textureId: texId,
        repeatU: (prim.faces?.[0] as any)?.RepeatU ?? 1,
        repeatV: (prim.faces?.[0] as any)?.RepeatV ?? 1,
        offsetU: (prim.faces?.[0] as any)?.OffsetU ?? 0,
        offsetV: (prim.faces?.[0] as any)?.OffsetV ?? 0,
        rotation: (prim.faces?.[0] as any)?.Rotation ?? 0,
      };

      // Non-blocking texture load — fires and forgets
      this.materialLoader.loadFromFace(face).then((material) => {
        mesh.material = material;
      }).catch(() => { /* texture failed, keep default */ });
    }
  }

  /**
   * Create geometry IMMEDIATELY — no async, no HTTP.
   */
  private createGeometry(prim: PrimData): THREE.BufferGeometry {
    switch (prim.primType) {
      case 1: return new THREE.BoxGeometry(1, 1, 1);         // Box
      case 2: return new THREE.CylinderGeometry(0.5, 0.5, 1, 24); // Cylinder
      case 3: return new THREE.ConeGeometry(0.5, 1, 3);      // Prism
      case 4: return new THREE.SphereGeometry(0.5, 24, 16);   // Sphere
      case 5: return new THREE.TorusGeometry(0.35, 0.12, 16, 32); // Torus
      case 6: return new THREE.TorusGeometry(0.35, 0.12, 8, 24);  // Tube
      case 7: return new THREE.TorusGeometry(0.35, 0.05, 8, 32);  // Ring
      case 8: return new THREE.SphereGeometry(0.5, 16, 16);   // Sculpt (placeholder)
      case 9: return new THREE.BoxGeometry(1, 1, 1);          // Mesh (placeholder — loaded async)
      default: return new THREE.BoxGeometry(1, 1, 1);
    }
  }

  /**
   * Replace geometry on an existing mesh (called when mesh data arrives).
   */
  async replaceMeshGeometry(primId: string, meshData: ArrayBuffer): Promise<void> {
    const group = this.objects.get(primId);
    if (!group) {
      // Queue mesh data for when prim appears
      this.pendingMeshes.set(primId, meshData);
      return;
    }

    console.log(`[ObjectRenderer] Replacing mesh for ${primId}, ${meshData.byteLength} bytes`);
    try {
      const geometry = await this.meshDecoder.decode(meshData);
      console.log(`[ObjectRenderer] Decoded geometry: ${geometry.attributes.position?.count ?? 0} vertices`);

      if (geometry.attributes.position?.count === 0) {
        console.warn(`[ObjectRenderer] Empty geometry for ${primId}`);
        return;
      }

      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();

      let replaced = false;
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.geometry = geometry;
          replaced = true;
        }
      });
      console.log(`[ObjectRenderer] Mesh replaced for ${primId}: ${replaced}`);
    } catch (err) {
      console.error('[ObjectRenderer] Mesh decode failed:', err);
    }
  }

  private disposeObject(obj: THREE.Object3D): void {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    });
  }

  getPrim(id: string): THREE.Object3D | undefined { return this.objects.get(id); }
  removePrim(id: string): void {
    const obj = this.objects.get(id);
    if (obj) { this.scene.remove(obj); this.disposeObject(obj); this.objects.delete(id); }
  }
  clear(): void { for (const [, obj] of this.objects) { this.scene.remove(obj); this.disposeObject(obj); } this.objects.clear(); }
}

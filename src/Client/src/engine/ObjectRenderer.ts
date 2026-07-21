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
  // Path/Profile data for advanced shapes
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

/**
 * SL PrimType enum values:
 * 1=Box, 2=Cylinder, 3=Prism, 4=Sphere, 5=Torus, 6=Tube, 7=Ring, 8=Sculpt, 9=Mesh
 */

export class ObjectRenderer {
  private scene: THREE.Scene;
  private objects: Map<string, THREE.Object3D> = new Map();
  private materialLoader: PBRMaterialLoader;
  private meshDecoder = new SLMeshDecoder();

  constructor(scene: THREE.Scene, materialLoader: PBRMaterialLoader) {
    this.scene = scene;
    this.materialLoader = materialLoader;
  }

  async updatePrim(prim: PrimData): Promise<void> {
    const existing = this.objects.get(prim.id);
    if (existing) {
      this.scene.remove(existing);
      this.disposeObject(existing);
    }

    const object = await this.createPrimitive(prim);

    // SL (Y=forward, Z=up) → Three.js (Z=forward, Y=up)
    object.position.set(prim.position.x, prim.position.z, prim.position.y);
    object.quaternion.set(prim.rotation.x, prim.rotation.z, prim.rotation.y, prim.rotation.w);
    object.scale.set(prim.scale.x, prim.scale.z, prim.scale.y);
    object.userData.primId = prim.id;
    object.userData.primName = prim.name;

    this.scene.add(object);
    this.objects.set(prim.id, object);
  }

  private async createPrimitive(prim: PrimData): Promise<THREE.Mesh> {
    let geometry: THREE.BufferGeometry;

    switch (prim.primType) {
      case 1: // Box
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 2: // Cylinder
        geometry = this.createCylinder(prim);
        break;
      case 3: // Prism
        geometry = new THREE.ConeGeometry(0.5, 1, 3);
        break;
      case 4: // Sphere
        geometry = new THREE.SphereGeometry(0.5, 24, 16);
        break;
      case 5: // Torus
        geometry = new THREE.TorusGeometry(0.35, 0.12, 16, 32);
        break;
      case 6: // Tube
        geometry = this.createTube(prim);
        break;
      case 7: // Ring
        geometry = new THREE.TorusGeometry(0.35, 0.05, 8, 32);
        break;
      case 8: // Sculpt
        geometry = new THREE.SphereGeometry(0.5, 16, 16); // placeholder
        break;
      case 9: // SL Mesh
        geometry = await this.decodeMesh(prim.meshData);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    // Load texture (face 0 or default)
    let material: THREE.MeshStandardMaterial;
    const texId = prim.textureId || (prim.faces?.[0] as any)?.TextureId;

    if (texId) {
      const face: SLTextureFace = {
        textureId: texId,
        repeatU: (prim.faces?.[0] as any)?.RepeatU ?? 1,
        repeatV: (prim.faces?.[0] as any)?.RepeatV ?? 1,
        offsetU: (prim.faces?.[0] as any)?.OffsetU ?? 0,
        offsetV: (prim.faces?.[0] as any)?.OffsetV ?? 0,
        rotation: (prim.faces?.[0] as any)?.Rotation ?? 0,
      };
      material = await this.materialLoader.loadFromFace(face);
    } else {
      material = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.7, metalness: 0.1 });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /**
   * Cylinder with top/bottom radius from PathScale for hollow shapes.
   */
  private createCylinder(prim: PrimData): THREE.BufferGeometry {
    const hollow = prim.profileHollow ?? 0;
    const hollowRadius = hollow > 0 ? hollow : 0;
    if (hollowRadius > 0) {
      return new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 1, true); // open-ended tube
    }
    return new THREE.CylinderGeometry(0.5, 0.5, 1, 24);
  }

  private createTube(prim: PrimData): THREE.BufferGeometry {
    return new THREE.TorusGeometry(0.35, 0.12, 8, 24);
  }

  private async decodeMesh(meshData?: ArrayBuffer): Promise<THREE.BufferGeometry> {
    if (!meshData || meshData.byteLength === 0) return new THREE.BoxGeometry(1, 1, 1);
    try {
      const geometry = await this.meshDecoder.decode(meshData);
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      return geometry;
    } catch (err) {
      console.warn('[ObjectRenderer] Failed to decode SL mesh:', err);
      return new THREE.BoxGeometry(1, 1, 1);
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

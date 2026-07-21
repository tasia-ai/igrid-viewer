import * as THREE from 'three';
import { PBRMaterialLoader, SLTextureFace } from './PBRMaterialLoader';

/**
 * Rendered object data from LibreMetaverse.
 */
export interface PrimData {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  scale: { x: number; y: number; z: number };
  pcode: number;
  textureId?: string;
}

/**
 * Renders SL/OpenSim primitives and mesh objects in the scene.
 * Converts LibreMetaverse coordinate system (Y-up) to Three.js (Y-up, Z-forward).
 * Uses PBR materials when texture data is available.
 */
export class ObjectRenderer {
  private scene: THREE.Scene;
  private objects: Map<string, THREE.Object3D> = new Map();
  private materialLoader: PBRMaterialLoader;

  constructor(scene: THREE.Scene, materialLoader: PBRMaterialLoader) {
    this.scene = scene;
    this.materialLoader = materialLoader;
  }

  /**
   * Add or update a prim in the scene.
   */
  async updatePrim(prim: PrimData): Promise<void> {
    const existing = this.objects.get(prim.id);
    if (existing) {
      this.scene.remove(existing);
      this.disposeObject(existing);
    }

    const object = await this.createPrimitive(prim);

    // SL to Three.js coordinate transform: SL (Y=forward, Z=up) to Three.js (Z=forward, Y=up)
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

    switch (prim.pcode) {
      case 1: // Box
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 2: // Sphere
        geometry = new THREE.SphereGeometry(0.5, 24, 24);
        break;
      case 3: // Cylinder
        geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 24);
        break;
      case 4: // Torus
        geometry = new THREE.TorusGeometry(0.4, 0.15, 16, 32);
        break;
      case 5: // Tube
        geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 1, true);
        break;
      case 6: // Ring
        geometry = new THREE.RingGeometry(0.3, 0.5, 32);
        break;
      case 9: // Mesh
        // TODO: decode SL mesh asset data from server
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    let material: THREE.MeshStandardMaterial;

    if (prim.textureId) {
      const face: SLTextureFace = {
        textureId: prim.textureId,
        repeatU: 1,
        repeatV: 1,
        offsetU: 0,
        offsetV: 0,
        rotation: 0,
      };
      material = await this.materialLoader.loadFromFace(face);
    } else {
      material = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.7,
        metalness: 0.1,
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  private disposeObject(obj: THREE.Object3D): void {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  removePrim(id: string): void {
    const obj = this.objects.get(id);
    if (obj) {
      this.scene.remove(obj);
      this.disposeObject(obj);
      this.objects.delete(id);
    }
  }

  clear(): void {
    for (const [, obj] of this.objects) {
      this.scene.remove(obj);
      this.disposeObject(obj);
    }
    this.objects.clear();
  }
}

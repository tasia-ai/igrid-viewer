import * as THREE from 'three';
import { AvatarSkeletonLoader, AvatarLayout } from './AvatarSkeletonLoader';
import { SLMeshDecoder } from './SLMeshDecoder';

/**
 * Avatar data received from LibreMetaverse.
 */
export interface AvatarData {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  /** Optional mesh data for full avatar rendering */
  meshData?: ArrayBuffer;
}

/**
 * Renders avatars in the scene.
 * Uses mesh avatars when mesh data is provided, otherwise falls back to placeholders.
 * Supports skeleton-based animation via Three.js Skeleton.
 */
export class AvatarRenderer {
  private scene: THREE.Scene;
  private avatars: Map<string, THREE.Group> = new Map();
  private skeletonLoader = new AvatarSkeletonLoader();
  private meshDecoder = new SLMeshDecoder();
  private defaultLayout: AvatarLayout;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.defaultLayout = this.skeletonLoader.getDefaultLayout();
  }

  /**
   * Add or update an avatar in the scene.
   */
  updateAvatar(data: AvatarData): void {
    let group = this.avatars.get(data.id);

    if (!group) {
      if (data.meshData) {
        group = this.createMeshAvatar(data);
      } else {
        group = this.createPlaceholder(data.name);
      }
      this.scene.add(group);
      this.avatars.set(data.id, group);
    }

    // SL to Three.js: SL position (x, y=forward, z=up) to Three.js (x, z=forward, y=up)
    group.position.set(data.position.x, data.position.z, data.position.y);
    group.quaternion.set(data.rotation.x, data.rotation.z, data.rotation.y, data.rotation.w);
  }

  /**
   * Create a mesh avatar with skeleton and decoded SL mesh.
   */
  private createMeshAvatar(data: AvatarData): THREE.Group {
    const group = new THREE.Group();
    group.name = data.name;

    try {
      // Build skeleton from default layout
      const skeleton = this.skeletonLoader.buildSkeleton(this.defaultLayout);

      // Decode mesh data
      if (data.meshData) {
        const geometry = this.meshDecoder.decode(data.meshData);

        // Create skeleton helper for debugging (commented out for production)
        // const helper = new THREE.SkeletonHelper(skeleton.bones[0]);
        // group.add(helper);

        // Create skinned mesh
        const material = new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          roughness: 0.7,
          metalness: 0.1,
        });

        const skinnedMesh = new THREE.SkinnedMesh(geometry, material);
        skinnedMesh.add(skeleton.bones[0]);
        skinnedMesh.bind(skeleton);
        skinnedMesh.castShadow = true;
        group.add(skinnedMesh);
      }
    } catch (err) {
      console.warn(`[AvatarRenderer] Failed to create mesh avatar for ${data.name}:`, err);
      // Fallback to placeholder
      const placeholder = this.createPlaceholder(data.name);
      while (placeholder.children.length > 0) {
        group.add(placeholder.children[0]);
      }
    }

    // Name label
    const sprite = this.createNameLabel(data.name);
    group.add(sprite);

    return group;
  }

  /**
   * Create a simple humanoid placeholder.
   */
  private createPlaceholder(name: string): THREE.Group {
    const group = new THREE.Group();
    group.name = name;

    // Body (torso)
    const bodyGeo = new THREE.CapsuleGeometry(0.25, 0.7, 8, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4488ff, roughness: 0.6 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.0;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.65;
    head.castShadow = true;
    group.add(head);

    // Name label
    const sprite = this.createNameLabel(name);
    group.add(sprite);

    return group;
  }

  /**
   * Create a floating name label as a sprite.
   */
  private createNameLabel(name: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.roundRect(0, 0, 256, 64, 8);
    ctx.fill();
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(name, 128, 42);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.y = 2.1;
    sprite.scale.set(1.5, 0.4, 1);
    return sprite;
  }

  removeAvatar(id: string): void {
    const avatar = this.avatars.get(id);
    if (avatar) {
      this.scene.remove(avatar);
      avatar.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      this.avatars.delete(id);
    }
  }
}

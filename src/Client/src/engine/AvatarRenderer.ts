import * as THREE from 'three';

/**
 * Avatar data received from LibreMetaverse.
 */
export interface AvatarData {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
}

/**
 * Renders avatars in the scene. Uses placeholder humanoid meshes
 * until full mesh loading is implemented.
 * SL coordinate system is converted to Three.js.
 */
export class AvatarRenderer {
  private scene: THREE.Scene;
  private avatars: Map<string, THREE.Group> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Add or update an avatar in the scene.
   */
  updateAvatar(data: AvatarData): void {
    let group = this.avatars.get(data.id);

    if (!group) {
      group = this.createPlaceholder(data.name);
      this.scene.add(group);
      this.avatars.set(data.id, group);
    }

    // SL → Three.js: SL position (x, y=forward, z=up) → Three.js (x, z=forward, y=up)
    group.position.set(data.position.x, data.position.z, data.position.y);
    group.quaternion.set(data.rotation.x, data.rotation.z, data.rotation.y, data.rotation.w);
  }

  /**
   * Create a simple humanoid placeholder.
   * Will be replaced with full mesh avatar loading from avatar_lad.xml + MeshmerizerR.
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

    // Name label using sprite
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
    group.add(sprite);

    return group;
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

import * as THREE from 'three';

export interface AvatarData {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  meshData?: ArrayBuffer;
}

export class AvatarRenderer {
  private scene: THREE.Scene;
  private avatars: Map<string, THREE.Group> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  async updateAvatar(data: AvatarData): Promise<void> {
    let group = this.avatars.get(data.id);

    if (!group) {
      group = this.createAvatar(data);
      this.scene.add(group);
      this.avatars.set(data.id, group);
    }

    // SL → Three.js: Y=forward → Z=forward, Z=up → Y=up
    group.position.set(data.position.x, data.position.z, data.position.y);
    group.quaternion.set(data.rotation.x, data.rotation.z, data.rotation.y, data.rotation.w);
  }

  private createAvatar(data: AvatarData): THREE.Group {
    const group = new THREE.Group();
    group.name = data.name;

    // Body
    const bodyGeo = new THREE.CapsuleGeometry(0.18, 0.55, 8, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3366aa, roughness: 0.6, metalness: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.05;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xddbb99, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.55;
    head.castShadow = true;
    group.add(head);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(0.05, 1.57, -0.12);
    group.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(-0.05, 1.57, -0.12);
    group.add(eyeR);

    // Left arm
    const armGeo = new THREE.CapsuleGeometry(0.05, 0.35, 4, 8);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x3366aa, roughness: 0.6 });
    const armL = new THREE.Mesh(armGeo, armMat);
    armL.position.set(0.28, 1.15, 0);
    armL.rotation.z = -0.3;
    group.add(armL);

    // Right arm
    const armR = new THREE.Mesh(armGeo, armMat);
    armR.position.set(-0.28, 1.15, 0);
    armR.rotation.z = 0.3;
    group.add(armR);

    // Left leg
    const legGeo = new THREE.CapsuleGeometry(0.06, 0.4, 4, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x222244, roughness: 0.7 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(0.08, 0.55, 0);
    group.add(legL);

    // Right leg
    const legR = new THREE.Mesh(legGeo, legMat);
    legR.position.set(-0.08, 0.55, 0);
    group.add(legR);

    // Name label
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.roundRect(0, 0, 256, 64, 8);
    ctx.fill();
    ctx.font = 'bold 26px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(data.name, 128, 42);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.y = 1.9;
    sprite.scale.set(1.8, 0.45, 1);
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
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material.dispose();
        }
      });
      this.avatars.delete(id);
    }
  }
}

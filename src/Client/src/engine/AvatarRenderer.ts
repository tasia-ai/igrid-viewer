import * as THREE from 'three';

export interface AvatarData {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  bakedTextures?: Record<string, string>; // { head: uuid, upper: uuid, lower: uuid, ... }
}

export class AvatarRenderer {
  private scene: THREE.Scene;
  private avatars: Map<string, THREE.Group> = new Map();
  private textureCache: Map<string, THREE.Texture> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  async updateAvatar(data: AvatarData): Promise<void> {
    let group = this.avatars.get(data.id);

    if (!group) {
      group = await this.createAvatar(data);
      this.scene.add(group);
      this.avatars.set(data.id, group);
    }

    group.position.set(data.position.x, data.position.z, data.position.y);
    group.quaternion.set(data.rotation.x, data.rotation.z, data.rotation.y, data.rotation.w);

    // Update baked textures if new ones arrived
    if (data.bakedTextures && Object.keys(data.bakedTextures).length > 0) {
      await this.applyBakedTextures(group, data.bakedTextures);
    }
  }

  private async createAvatar(data: AvatarData): Promise<THREE.Group> {
    const group = new THREE.Group();
    group.name = data.name;

    // Humanoid body parts
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3366aa, roughness: 0.6 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xddbb99, roughness: 0.5 });

    // Torso
    const torsoGeo = new THREE.CapsuleGeometry(0.18, 0.45, 8, 16);
    const torso = new THREE.Mesh(torsoGeo, bodyMat.clone());
    torso.position.y = 1.05;
    torso.castShadow = true;
    torso.name = 'upper';
    group.add(torso);

    // Head
    const headGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const head = new THREE.Mesh(headGeo, skinMat.clone());
    head.position.y = 1.55;
    head.castShadow = true;
    head.name = 'head';
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

    // Arms
    const armGeo = new THREE.CapsuleGeometry(0.05, 0.35, 4, 8);
    const armMat = bodyMat.clone();
    const armL = new THREE.Mesh(armGeo, armMat);
    armL.position.set(0.28, 1.15, 0);
    armL.rotation.z = -0.3;
    group.add(armL);
    const armR = new THREE.Mesh(armGeo, armMat.clone());
    armR.position.set(-0.28, 1.15, 0);
    armR.rotation.z = 0.3;
    group.add(armR);

    // Legs
    const legGeo = new THREE.CapsuleGeometry(0.06, 0.4, 4, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x222244, roughness: 0.7 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(0.08, 0.55, 0);
    group.add(legL);
    const legR = new THREE.Mesh(legGeo, legMat.clone());
    legR.position.set(-0.08, 0.55, 0);
    group.add(legR);

    // Hair (simple sphere on top)
    const hairGeo = new THREE.SphereGeometry(0.15, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x553322, roughness: 0.8 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 1.62;
    hair.name = 'hair';
    group.add(hair);

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
    const spriteMat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.y = 1.9;
    sprite.scale.set(1.8, 0.45, 1);
    group.add(sprite);

    // Apply baked textures if available
    if (data.bakedTextures) {
      await this.applyBakedTextures(group, data.bakedTextures);
    }

    return group;
  }

  private async applyBakedTextures(group: THREE.Group, bakedTextures: Record<string, string>): Promise<void> {
    for (const [slotName, textureId] of Object.entries(bakedTextures)) {
      if (!textureId || textureId === '00000000-0000-0000-0000-000000000000') continue;

      const texture = await this.fetchTexture(textureId);
      if (!texture) continue;

      // Apply texture to matching mesh by name
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === slotName) {
          (child.material as THREE.MeshStandardMaterial).map = texture;
          (child.material as THREE.MeshStandardMaterial).needsUpdate = true;
        }
      });

      // Also apply to body (upper) if it's head/upper/lower
      if (['head', 'upper', 'lower'].includes(slotName)) {
        group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.name === slotName) {
            (child.material as THREE.MeshStandardMaterial).map = texture;
            (child.material as THREE.MeshStandardMaterial).needsUpdate = true;
          }
        });
      }
    }
  }

  private async fetchTexture(textureId: string): Promise<THREE.Texture | null> {
    if (this.textureCache.has(textureId)) return this.textureCache.get(textureId)!;

    try {
      const res = await fetch(`/api/textures/${textureId}`);
      if (!res.ok) return null;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('Image load failed'));
        el.src = url;
      });

      const texture = new THREE.Texture(img);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      URL.revokeObjectURL(url);

      this.textureCache.set(textureId, texture);
      return texture;
    } catch {
      return null;
    }
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

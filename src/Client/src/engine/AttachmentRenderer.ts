import * as THREE from 'three';

/**
 * SL Attachment point byte → body part position mapping.
 * Based on Second Life's 58 attachment points.
 * Positions are relative to the avatar's root (0,0,0 = feet).
 */
const ATTACHMENT_POSITIONS: Record<number, { name: string; offset: THREE.Vector3 }> = {
  0:   { name: 'unknown',          offset: new THREE.Vector3(0, 1.0, 0) },
  1:   { name: 'chest',            offset: new THREE.Vector3(0, 1.2, 0) },
  2:   { name: 'head',             offset: new THREE.Vector3(0, 1.6, 0) },
  3:   { name: 'left shoulder',    offset: new THREE.Vector3(0.35, 1.3, 0) },
  4:   { name: 'right shoulder',   offset: new THREE.Vector3(-0.35, 1.3, 0) },
  5:   { name: 'left hand',        offset: new THREE.Vector3(0.45, 0.8, 0) },
  6:   { name: 'right hand',       offset: new THREE.Vector3(-0.45, 0.8, 0) },
  7:   { name: 'left foot',        offset: new THREE.Vector3(0.1, 0.1, 0) },
  8:   { name: 'right foot',       offset: new THREE.Vector3(-0.1, 0.1, 0) },
  9:   { name: 'right hip',        offset: new THREE.Vector3(-0.15, 0.9, 0) },
  10:  { name: 'right hip',        offset: new THREE.Vector3(-0.15, 0.9, 0) },
  11:  { name: 'right hip',        offset: new THREE.Vector3(-0.15, 0.9, 0) },
  12:  { name: 'left hip',         offset: new THREE.Vector3(0.15, 0.9, 0) },
  13:  { name: 'left hip',         offset: new THREE.Vector3(0.15, 0.9, 0) },
  14:  { name: 'left hip',         offset: new THREE.Vector3(0.15, 0.9, 0) },
  15:  { name: 'torso',            offset: new THREE.Vector3(0, 1.1, 0) },
  16:  { name: 'neck',             offset: new THREE.Vector3(0, 1.5, 0) },
  17:  { name: 'right shoulder',   offset: new THREE.Vector3(-0.35, 1.3, 0) },
  18:  { name: 'right forearm',    offset: new THREE.Vector3(-0.4, 1.05, 0) },
  19:  { name: 'right forearm',    offset: new THREE.Vector3(-0.4, 1.05, 0) },
  20:  { name: 'left forearm',     offset: new THREE.Vector3(0.4, 1.05, 0) },
  21:  { name: 'left forearm',     offset: new THREE.Vector3(0.4, 1.05, 0) },
  22:  { name: 'left shoulder',    offset: new THREE.Vector3(0.35, 1.3, 0) },
  23:  { name: 'right hip',        offset: new THREE.Vector3(-0.15, 0.9, 0) },
  24:  { name: 'right hip',        offset: new THREE.Vector3(-0.15, 0.9, 0) },
  25:  { name: 'left hip',         offset: new THREE.Vector3(0.15, 0.9, 0) },
  26:  { name: 'left hip',         offset: new THREE.Vector3(0.15, 0.9, 0) },
  27:  { name: 'head',             offset: new THREE.Vector3(0, 1.65, 0) },
  28:  { name: 'head',             offset: new THREE.Vector3(0, 1.7, 0) },
  29:  { name: 'head',             offset: new THREE.Vector3(0, 1.75, 0) },
  30:  { name: 'right hand',       offset: new THREE.Vector3(-0.45, 0.8, 0) },
  31:  { name: 'left hand',        offset: new THREE.Vector3(0.45, 0.8, 0) },
  32:  { name: 'right hand',       offset: new THREE.Vector3(-0.45, 0.75, 0) },
  33:  { name: 'left hand',        offset: new THREE.Vector3(0.45, 0.75, 0) },
  34:  { name: 'right hand',       offset: new THREE.Vector3(-0.45, 0.85, 0) },
  35:  { name: 'left hand',        offset: new THREE.Vector3(0.45, 0.85, 0) },
  36:  { name: 'torso',            offset: new THREE.Vector3(0, 1.0, 0) },
  37:  { name: 'right hip',        offset: new THREE.Vector3(-0.15, 0.85, 0) },
  38:  { name: 'left hip',         offset: new THREE.Vector3(0.15, 0.85, 0) },
  39:  { name: 'head',             offset: new THREE.Vector3(0, 1.8, 0) },
  // HUD points (38-58) — screen-space, not world-space
  40:  { name: 'hud right',        offset: new THREE.Vector3(0, 1.2, 0) },
  41:  { name: 'hud left',         offset: new THREE.Vector3(0, 1.2, 0) },
  42:  { name: 'hud right',        offset: new THREE.Vector3(0, 1.2, 0) },
  43:  { name: 'hud left',         offset: new THREE.Vector3(0, 1.2, 0) },
  44:  { name: 'hud right',        offset: new THREE.Vector3(0, 1.2, 0) },
  45:  { name: 'hud left',         offset: new THREE.Vector3(0, 1.2, 0) },
};

/**
 * Data for an attachment placed on an avatar.
 */
export interface AttachmentData {
  avatarId: string;
  attachmentPoint: number;  // 0-58
  objectId: string;
  objectName: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  scale: { x: number; y: number; z: number };
}

/**
 * Manages attachment objects placed on avatar body parts.
 * Tracks which objects are attached where and updates their positions each frame.
 */
export class AttachmentRenderer {
  private scene: THREE.Scene;
  private attachments: Map<string, {
    data: AttachmentData;
    group: THREE.Group;
  }> = new Map();
  private avatarGroups: Map<string, THREE.Group> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Register an avatar group for attachment tracking.
   */
  registerAvatar(avatarId: string, group: THREE.Group): void {
    this.avatarGroups.set(avatarId, group);
  }

  /**
   * Update or create an attachment.
   */
  updateAttachment(data: AttachmentData): void {
    const existing = this.attachments.get(data.objectId);

    if (existing) {
      // Update existing attachment
      existing.data = data;
      this.positionAttachment(existing);
    } else {
      // Create new attachment placeholder
      const group = new THREE.Group();
      group.name = `attachment_${data.objectName}`;

      // Simple placeholder geometry — a colored box
      const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x44aaff,
        roughness: 0.5,
        metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      group.add(mesh);

      this.scene.add(group);

      const entry = { data, group };
      this.attachments.set(data.objectId, entry);
      this.positionAttachment(entry);
    }
  }

  /**
   * Remove an attachment.
   */
  removeAttachment(objectId: string): void {
    const entry = this.attachments.get(objectId);
    if (!entry) return;

    this.scene.remove(entry.group);
    entry.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    });
    this.attachments.delete(objectId);
  }

  /**
   * Update all attachment positions — call every frame.
   */
  update(): void {
    for (const [, entry] of this.attachments) {
      this.positionAttachment(entry);
    }
  }

  /**
   * Clear all attachments.
   */
  clear(): void {
    for (const [id] of this.attachments) {
      this.removeAttachment(id);
    }
    this.avatarGroups.clear();
  }

  /**
   * Get attachment point position info.
   */
  static getAttachmentInfo(point: number): { name: string; offset: THREE.Vector3 } {
    return ATTACHMENT_POSITIONS[point] || ATTACHMENT_POSITIONS[0];
  }

  // ── Private ───────────────────────────────────────────────

  private positionAttachment(entry: { data: AttachmentData; group: THREE.Group }): void {
    const { data, group } = entry;
    const avatarGroup = this.avatarGroups.get(data.avatarId);

    if (avatarGroup) {
      // Position relative to avatar
      const attachInfo = AttachmentRenderer.getAttachmentInfo(data.attachmentPoint);
      const worldPos = new THREE.Vector3();
      worldPos.copy(attachInfo.offset);
      worldPos.applyQuaternion(avatarGroup.quaternion);
      worldPos.add(avatarGroup.position);

      group.position.copy(worldPos);
      group.quaternion.set(
        data.rotation.x,
        data.rotation.z,
        data.rotation.y,
        data.rotation.w
      );
      group.scale.set(data.scale.x, data.scale.z, data.scale.y);
    } else {
      // Fallback: position at object's world position
      group.position.set(
        data.position.x,
        data.position.z,
        data.position.y
      );
      group.quaternion.set(
        data.rotation.x,
        data.rotation.z,
        data.rotation.y,
        data.rotation.w
      );
      group.scale.set(data.scale.x, data.scale.z, data.scale.y);
    }
  }
}

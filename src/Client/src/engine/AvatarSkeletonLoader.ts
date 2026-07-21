import * as THREE from 'three';

/**
 * Joint definition from avatar_skeleton.xml.
 * Defines a single bone in the avatar skeleton.
 */
export interface JointDefinition {
  name: string;
  parent: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  pivot: THREE.Vector3;
}

/**
 * Mesh assignment from avatar_lad.xml.
 * Maps a mesh UUID to a joint for binding.
 */
export interface MeshAssignment {
  meshId: string;
  jointName: string;
}

/**
 * Avatar layout definition parsed from avatar_lad.xml + avatar_skeleton.xml.
 * Contains the full skeleton hierarchy and mesh assignments.
 */
export interface AvatarLayout {
  joints: Map<string, JointDefinition>;
  meshAssignments: MeshAssignment[];
  rootJoint: string;
}

/**
 * Default SL avatar skeleton hierarchy (53 bones).
 * Based on avatar_skeleton.xml from LibreMetaverse.
 *
 * Coordinate system: SL uses X=forward, Y=left, Z=up.
 * Bone positions are RELATIVE to parent bone.
 *
 * Children are nested inside their parent <bone> element.
 */
const DEFAULT_SKELETON: JointDefinition[] = [
  // Root
  { name: 'mPelvis', parent: '', position: new THREE.Vector3(0, 0, 1.067), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0, 0, 1.067) },

  // Spine
  { name: 'mTorso', parent: 'mPelvis', position: new THREE.Vector3(0, 0, 0.084), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0, 0, 1.151) },
  { name: 'mChest', parent: 'mTorso', position: new THREE.Vector3(-0.015, 0, 0.205), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.015, 0, 1.356) },

  // Neck & Head
  { name: 'mNeck', parent: 'mChest', position: new THREE.Vector3(-0.010, 0, 0.251), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.025, 0, 1.607) },
  { name: 'mHead', parent: 'mNeck', position: new THREE.Vector3(0, 0, 0.076), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.025, 0, 1.683) },
  { name: 'mSkull', parent: 'mHead', position: new THREE.Vector3(0, 0, 0.079), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.025, 0, 1.762) },
  { name: 'mEyeRight', parent: 'mHead', position: new THREE.Vector3(0.098, -0.036, 0.079), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.073, -0.036, 1.762) },
  { name: 'mEyeLeft', parent: 'mHead', position: new THREE.Vector3(0.098, 0.036, 0.079), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.073, 0.036, 1.762) },

  // Left Collar & Arm
  { name: 'mCollarLeft', parent: 'mChest', position: new THREE.Vector3(-0.021, 0.085, 0.165), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.085, 1.521) },
  { name: 'mShoulderLeft', parent: 'mCollarLeft', position: new THREE.Vector3(0, 0.079, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.164, 1.521) },
  { name: 'mElbowLeft', parent: 'mShoulderLeft', position: new THREE.Vector3(0, 0.248, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.412, 1.521) },
  { name: 'mWristLeft', parent: 'mElbowLeft', position: new THREE.Vector3(0, 0.205, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.617, 1.521) },

  // Left Hand Fingers
  { name: 'mForeArmLeft', parent: 'mWristLeft', position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.617, 1.521) },
  { name: 'mHandLeft', parent: 'mForeArmLeft', position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.617, 1.521) },
  { name: 'mThumbLeft', parent: 'mHandLeft', position: new THREE.Vector3(0.02, -0.01, 0.03), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.016, 0.607, 1.551) },
  { name: 'mThumb1Left', parent: 'mThumbLeft', position: new THREE.Vector3(0.03, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.014, 0.607, 1.551) },
  { name: 'mThumb2Left', parent: 'mThumb1Left', position: new THREE.Vector3(0.03, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.044, 0.607, 1.551) },
  { name: 'mIndexLeft', parent: 'mHandLeft', position: new THREE.Vector3(0.06, -0.01, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.627, 1.521) },
  { name: 'mIndex1Left', parent: 'mIndexLeft', position: new THREE.Vector3(0.05, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.014, 0.627, 1.521) },
  { name: 'mIndex2Left', parent: 'mIndex1Left', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.054, 0.627, 1.521) },
  { name: 'mMiddleLeft', parent: 'mHandLeft', position: new THREE.Vector3(0.06, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.617, 1.521) },
  { name: 'mMiddle1Left', parent: 'mMiddleLeft', position: new THREE.Vector3(0.06, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.024, 0.617, 1.521) },
  { name: 'mMiddle2Left', parent: 'mMiddle1Left', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.064, 0.617, 1.521) },
  { name: 'mRingLeft', parent: 'mHandLeft', position: new THREE.Vector3(0.06, 0.01, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.607, 1.521) },
  { name: 'mRing1Left', parent: 'mRingLeft', position: new THREE.Vector3(0.05, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.014, 0.607, 1.521) },
  { name: 'mRing2Left', parent: 'mRing1Left', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.054, 0.607, 1.521) },
  { name: 'mPinkyLeft', parent: 'mHandLeft', position: new THREE.Vector3(0.05, 0.02, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, 0.597, 1.521) },
  { name: 'mPinky1Left', parent: 'mPinkyLeft', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.004, 0.597, 1.521) },
  { name: 'mPinky2Left', parent: 'mPinky1Left', position: new THREE.Vector3(0.03, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.034, 0.597, 1.521) },

  // Right Collar & Arm (mirror of left)
  { name: 'mCollarRight', parent: 'mChest', position: new THREE.Vector3(-0.021, -0.085, 0.165), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.085, 1.521) },
  { name: 'mShoulderRight', parent: 'mCollarRight', position: new THREE.Vector3(0, -0.079, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.164, 1.521) },
  { name: 'mElbowRight', parent: 'mShoulderRight', position: new THREE.Vector3(0, -0.248, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.412, 1.521) },
  { name: 'mWristRight', parent: 'mElbowRight', position: new THREE.Vector3(0, -0.205, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.617, 1.521) },

  // Right Hand Fingers (mirror of left)
  { name: 'mForeArmRight', parent: 'mWristRight', position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.617, 1.521) },
  { name: 'mHandRight', parent: 'mForeArmRight', position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.617, 1.521) },
  { name: 'mThumbRight', parent: 'mHandRight', position: new THREE.Vector3(0.02, 0.01, 0.03), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.016, -0.607, 1.551) },
  { name: 'mThumb1Right', parent: 'mThumbRight', position: new THREE.Vector3(0.03, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.014, -0.607, 1.551) },
  { name: 'mThumb2Right', parent: 'mThumb1Right', position: new THREE.Vector3(0.03, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.044, -0.607, 1.551) },
  { name: 'mIndexRight', parent: 'mHandRight', position: new THREE.Vector3(0.06, 0.01, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.627, 1.521) },
  { name: 'mIndex1Right', parent: 'mIndexRight', position: new THREE.Vector3(0.05, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.014, -0.627, 1.521) },
  { name: 'mIndex2Right', parent: 'mIndex1Right', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.054, -0.627, 1.521) },
  { name: 'mMiddleRight', parent: 'mHandRight', position: new THREE.Vector3(0.06, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.617, 1.521) },
  { name: 'mMiddle1Right', parent: 'mMiddleRight', position: new THREE.Vector3(0.06, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.024, -0.617, 1.521) },
  { name: 'mMiddle2Right', parent: 'mMiddle1Right', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.064, -0.617, 1.521) },
  { name: 'mRingRight', parent: 'mHandRight', position: new THREE.Vector3(0.06, -0.01, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.607, 1.521) },
  { name: 'mRing1Right', parent: 'mRingRight', position: new THREE.Vector3(0.05, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.014, -0.607, 1.521) },
  { name: 'mRing2Right', parent: 'mRing1Right', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.054, -0.607, 1.521) },
  { name: 'mPinkyRight', parent: 'mHandRight', position: new THREE.Vector3(0.05, -0.02, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(-0.036, -0.597, 1.521) },
  { name: 'mPinky1Right', parent: 'mPinkyRight', position: new THREE.Vector3(0.04, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.004, -0.597, 1.521) },
  { name: 'mPinky2Right', parent: 'mPinky1Right', position: new THREE.Vector3(0.03, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.034, -0.597, 1.521) },

  // Left Leg
  { name: 'mHipLeft', parent: 'mPelvis', position: new THREE.Vector3(0.034, 0.127, -0.041), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.034, 0.127, 1.026) },
  { name: 'mKneeLeft', parent: 'mHipLeft', position: new THREE.Vector3(-0.001, -0.046, -0.491), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.033, 0.081, 0.535) },
  { name: 'mAnkleLeft', parent: 'mKneeLeft', position: new THREE.Vector3(-0.029, 0.001, -0.468), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.004, 0.082, 0.067) },
  { name: 'mFootLeft', parent: 'mAnkleLeft', position: new THREE.Vector3(0.112, 0, -0.061), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.116, 0.082, 0.006) },
  { name: 'mToeLeft', parent: 'mFootLeft', position: new THREE.Vector3(0.109, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.225, 0.082, 0.006) },

  // Right Leg
  { name: 'mHipRight', parent: 'mPelvis', position: new THREE.Vector3(0.034, -0.129, -0.041), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.034, -0.129, 1.026) },
  { name: 'mKneeRight', parent: 'mHipRight', position: new THREE.Vector3(-0.001, 0.049, -0.491), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.033, -0.080, 0.535) },
  { name: 'mAnkleRight', parent: 'mKneeRight', position: new THREE.Vector3(-0.029, 0, -0.468), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.004, -0.080, 0.067) },
  { name: 'mFootRight', parent: 'mAnkleRight', position: new THREE.Vector3(0.112, 0, -0.061), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.116, -0.080, 0.006) },
  { name: 'mToeRight', parent: 'mFootRight', position: new THREE.Vector3(0.109, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0.225, -0.080, 0.006) },

  // HUD
  { name: 'mScreen', parent: 'mTorso', position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0, 0, 1.151) },
  { name: 'mHUDCenter', parent: 'mScreen', position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(1, 1, 1), pivot: new THREE.Vector3(0, 0, 1.151) },
];

/**
 * Parses avatar_skeleton.xml and avatar_lad.xml to build a Three.js Skeleton.
 * Falls back to the default SL skeleton if no XML is provided.
 */
export class AvatarSkeletonLoader {
  /**
   * Parse avatar_skeleton.xml into an AvatarLayout.
   * Format: <linden_skeleton> containing nested <bone name="..." pos="x y z" rot="rx ry rz" scale="sx sy sz" pivot="px py pz"> elements.
   */
  parseSkeletonXml(xmlContent: string): AvatarLayout {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'text/xml');
    const joints = new Map<string, JointDefinition>();

    // Recursive parser for nested <bone> elements
    const parseBone = (boneEl: Element, parentName: string) => {
      const name = boneEl.getAttribute('name');
      if (!name) return;

      const posStr = boneEl.getAttribute('pos') ?? '0 0 0';
      const rotStr = boneEl.getAttribute('rot') ?? '0 0 0';
      const scaleStr = boneEl.getAttribute('scale') ?? '1 1 1';
      const pivotStr = boneEl.getAttribute('pivot') ?? '0 0 0';

      const pos = this.parseVector3(posStr);
      const rot = this.parseEuler(rotStr);
      const scale = this.parseVector3(scaleStr);
      const pivot = this.parseVector3(pivotStr);

      joints.set(name, {
        name,
        parent: parentName,
        position: pos,
        rotation: rot,
        scale,
        pivot,
      });

      // Parse child bones
      const children = boneEl.querySelectorAll(':scope > bone');
      for (const child of children) {
        parseBone(child, name);
      }
    };

    // Find root bones (bones without parent)
    const skeletonEl = doc.querySelector('linden_skeleton');
    if (skeletonEl) {
      const rootBones = skeletonEl.querySelectorAll(':scope > bone');
      for (const bone of rootBones) {
        parseBone(bone, '');
      }
    }

    return {
      joints,
      meshAssignments: [],
      rootJoint: 'mPelvis',
    };
  }

  /**
   * Parse avatar_lad.xml for mesh assignments.
   */
  parseLadXml(xmlContent: string): MeshAssignment[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'text/xml');
    const assignments: MeshAssignment[] = [];

    // Parse mesh entries
    const meshNodes = doc.querySelectorAll('mesh > key');
    for (const node of meshNodes) {
      const meshId = node.querySelector('mesh_id')?.textContent ?? '';
      const jointName = node.querySelector('joint')?.textContent ?? '';
      if (meshId && jointName) {
        assignments.push({ meshId, jointName });
      }
    }

    return assignments;
  }

  /**
   * Build a Three.js Skeleton from an AvatarLayout.
   */
  buildSkeleton(layout: AvatarLayout): THREE.Skeleton {
    const boneMap = new Map<string, THREE.Bone>();
    const rootBones: THREE.Bone[] = [];

    // Create all bones
    for (const [name, joint] of layout.joints) {
      const bone = new THREE.Bone();
      bone.name = name;
      bone.position.copy(joint.position);
      bone.rotation.copy(joint.rotation);
      bone.scale.copy(joint.scale);
      boneMap.set(name, bone);
    }

    // Build hierarchy
    for (const [name, joint] of layout.joints) {
      const bone = boneMap.get(name)!;
      if (joint.parent && boneMap.has(joint.parent)) {
        boneMap.get(joint.parent)!.add(bone);
      } else {
        rootBones.push(bone);
      }
    }

    // Ensure we have at least one root bone
    if (rootBones.length === 0) {
      const firstBone = layout.joints.values().next().value;
      if (firstBone) {
        rootBones.push(boneMap.get(firstBone.name)!);
      }
    }

    const skeleton = new THREE.Skeleton(rootBones);
    skeleton.update();
    return skeleton;
  }

  /**
   * Get default SL skeleton layout.
   */
  getDefaultLayout(): AvatarLayout {
    const joints = new Map<string, JointDefinition>();
    for (const joint of DEFAULT_SKELETON) {
      joints.set(joint.name, { ...joint });
    }
    return {
      joints,
      meshAssignments: [],
      rootJoint: 'mPelvis',
    };
  }

  private parseVector3(text: string): THREE.Vector3 {
    const parts = text.trim().split(/[\s,]+/).map(Number);
    return new THREE.Vector3(parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0);
  }

  private parseEuler(text: string): THREE.Euler {
    // SL uses degrees
    const parts = text.trim().split(/[\s,]+/).map(Number);
    return new THREE.Euler(
      (parts[0] ?? 0) * Math.PI / 180,
      (parts[1] ?? 0) * Math.PI / 180,
      (parts[2] ?? 0) * Math.PI / 180
    );
  }
}

import * as THREE from 'three';

/**
 * Joint definition from avatar_lad.xml.
 * Defines a single bone in the avatar skeleton.
 */
export interface JointDefinition {
  name: string;
  parent: string;
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
  /** Joint priority for animation blending */
  priority: number;
}

/**
 * Mesh assignment from avatar_lad.xml.
 * Maps a mesh UUID to a joint for binding.
 */
export interface MeshAssignment {
  meshId: string;
  jointName: string;
  /** Blend weights for multiple joints (for skinning) */
  weights?: { joint: string; weight: number }[];
}

/**
 * Avatar layout definition parsed from avatar_lad.xml.
 * Contains the full skeleton hierarchy and mesh assignments.
 */
export interface AvatarLayout {
  joints: Map<string, JointDefinition>;
  meshAssignments: MeshAssignment[];
  /** Root joint name (usually "mPelvis") */
  rootJoint: string;
}

/**
 * Default SL avatar skeleton hierarchy (mBones).
 * Based on the standard SL avatar_lad.xml structure.
 */
const DEFAULT_SKELETON: JointDefinition[] = [
  { name: 'mPelvis', parent: '', position: new THREE.Vector3(0, 0, 0.95), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mTorso', parent: 'mPelvis', position: new THREE.Vector3(0, 0, 0.09), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mChest', parent: 'mTorso', position: new THREE.Vector3(0, 0, 0.18), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mNeck', parent: 'mChest', position: new THREE.Vector3(0, 0, 0.24), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mHead', parent: 'mNeck', position: new THREE.Vector3(0, 0, 0.12), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mCollarLeft', parent: 'mChest', position: new THREE.Vector3(0.08, 0, 0.18), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mCollarRight', parent: 'mChest', position: new THREE.Vector3(-0.08, 0, 0.18), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mShoulderLeft', parent: 'mCollarLeft', position: new THREE.Vector3(0.12, 0, 0), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mShoulderRight', parent: 'mCollarRight', position: new THREE.Vector3(-0.12, 0, 0), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mElbowLeft', parent: 'mShoulderLeft', position: new THREE.Vector3(0.24, 0, 0), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mElbowRight', parent: 'mShoulderRight', position: new THREE.Vector3(-0.24, 0, 0), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mWristLeft', parent: 'mElbowLeft', position: new THREE.Vector3(0.22, 0, 0), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mWristRight', parent: 'mElbowRight', position: new THREE.Vector3(-0.22, 0, 0), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mHipLeft', parent: 'mPelvis', position: new THREE.Vector3(0.09, 0, -0.06), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mHipRight', parent: 'mPelvis', position: new THREE.Vector3(-0.09, 0, -0.06), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mKneeLeft', parent: 'mHipLeft', position: new THREE.Vector3(0, 0, -0.42), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mKneeRight', parent: 'mHipRight', position: new THREE.Vector3(0, 0, -0.42), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mAnkleLeft', parent: 'mKneeLeft', position: new THREE.Vector3(0, 0, -0.40), rotation: new THREE.Quaternion(), priority: 0 },
  { name: 'mAnkleRight', parent: 'mKneeRight', position: new THREE.Vector3(0, 0, -0.40), rotation: new THREE.Quaternion(), priority: 0 },
];

/**
 * Parses avatar_lad.xml and builds a Three.js Skeleton.
 * Falls back to the default SL skeleton if no XML is provided.
 */
export class AvatarSkeletonLoader {
  /**
   * Parse avatar_lad.xml content into an AvatarLayout.
   */
  parseLadXml(xmlContent: string): AvatarLayout {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'text/xml');
    const joints = new Map<string, JointDefinition>();
    const meshAssignments: MeshAssignment[] = [];

    // Parse skeleton joint definitions
    const skeletonNodes = doc.querySelectorAll('skeleton > key');
    for (const node of skeletonNodes) {
      const jointName = node.getAttribute('name');
      if (!jointName) continue;

      const parentEl = node.querySelector('parent');
      const posEl = node.querySelector('position');
      const rotEl = node.querySelector('rotation');

      const parent = parentEl?.textContent ?? '';
      const pos = this.parseVector3(posEl?.textContent ?? '0 0 0');
      const rot = this.parseQuaternion(rotEl?.textContent ?? '0 0 0 1');

      joints.set(jointName, {
        name: jointName,
        parent,
        position: pos,
        rotation: rot,
        priority: 0,
      });
    }

    // Parse mesh assignments
    const meshNodes = doc.querySelectorAll('mesh > key');
    for (const node of meshNodes) {
      const meshId = node.querySelector('mesh_id')?.textContent ?? '';
      const jointName = node.querySelector('joint')?.textContent ?? '';

      if (meshId && jointName) {
        meshAssignments.push({ meshId, jointName });
      }
    }

    return {
      joints,
      meshAssignments,
      rootJoint: 'mPelvis',
    };
  }

  /**
   * Build a Three.js Skeleton from an AvatarLayout.
   */
  buildSkeleton(layout: AvatarLayout): THREE.Skeleton {
    const boneList: THREE.Bone[] = [];
    const boneMap = new Map<string, THREE.Bone>();

    // Create all bones
    for (const [name, joint] of layout.joints) {
      const bone = new THREE.Bone();
      bone.name = name;
      bone.position.copy(joint.position);
      bone.quaternion.copy(joint.rotation);
      boneMap.set(name, bone);
    }

    // Build hierarchy
    for (const [name, joint] of layout.joints) {
      const bone = boneMap.get(name)!;
      if (joint.parent && boneMap.has(joint.parent)) {
        boneMap.get(joint.parent)!.add(bone);
      } else {
        boneList.push(bone);
      }
    }

    // If no root bones found, use the first bone without a parent
    if (boneList.length === 0) {
      for (const [name, joint] of layout.joints) {
        if (!joint.parent || !layout.joints.has(joint.parent)) {
          boneList.push(boneMap.get(name)!);
        }
      }
    }

    // If still empty, just add all bones in order
    if (boneList.length === 0) {
      for (const bone of boneMap.values()) {
        boneList.push(bone);
      }
    }

    // Create skeleton
    const skeleton = new THREE.Skeleton(boneList);

    // Build bind matrix inverse
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

  private parseQuaternion(text: string): THREE.Quaternion {
    const parts = text.trim().split(/[\s,]+/).map(Number);
    return new THREE.Quaternion(parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, parts[3] ?? 1);
  }
}

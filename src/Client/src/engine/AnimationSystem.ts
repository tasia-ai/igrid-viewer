import * as THREE from 'three';
import { SLAnimationPlayer } from './SLAnimationPlayer';

/**
 * SL Animation UUIDs for common animations.
 * Maps known UUIDs to human-readable names.
 */
const SL_ANIMATION_MAP: Record<string, string> = {
  '80b6b4bd-4796-4c05-a425-5cd20e665141': 'STAND',     // Standing
  '6b61c8e8-4747-0d75-12d7-e49ff207a4ca': 'AFRAID',
  '5747a48e-073e-c331-f6f3-7c2149613d3e': 'ANGRY',
  'fd037134-85d4-f241-72c6-4f42164fedee': 'AWAY',
  'c4ca6188-9127-4f31-0158-23c4e2f93304': 'BACKFLIP',
  '82e99230-c906-1403-4d9c-3889dd98daba': 'BOW',
  '9b0c1c4e-8ac7-7969-1494-28c874c4f668': 'CLAP',
  '9ba1c942-08be-e43a-fb29-16ad440efc50': 'COURTBOW',
  '201f3fdf-cb1f-dbec-201f-7333e328ae7c': 'CROUCH',
  '47f5f6fb-22e5-ae44-f871-73aaaf4a6022': 'CROUCHWALK',
  '92624d3e-1068-f1aa-a5ec-8244585193ed': 'CRY',
  'db84829b-462c-ee83-1e27-9bbee66bd624': 'BLOW_KISS',
  '18b3a4b5-b463-bd48-e4b6-71eaac76c515': 'BELLY_LAUGH',
  'efcf670c-2d18-8128-973a-034ebc806b67': 'BUSY',
  'b906c4ba-703b-1940-32a3-0c7f7d791510': 'BORED',
  '349a3801-54f9-bf2c-3bd0-1ac89772af01': 'BRUSH',
  // Walking / movement
  '3c09b488-b004-0ea5-a704-07e0159f3261': 'WALK',
  '2446cb30-43b5-443c-b05e-09aea530128e': 'WALK',
  '9f54d3be-81f4-4e40-a25a-890ab179487f': 'FLY',
  '58dc6e64-44f0-4a3a-b0bf-e05e9a84a63c': 'FLY',
  // Sitting
  '1c7e3004-be1e-3a03-0430-d368413c542e': 'SIT',
  'b5a0da24-42b3-4980-8165-c8e016c6312f': 'SIT',
  // Hover
  '35a1806c-e783-4713-b6b5-d89ea9469f32': 'HOVER',
  'c5e8ac3e-4894-4830-8f3c-a4b16cf9bc99': 'HOVER_FLY',
  // Type
  '3eabae79-c516-23c3-ffff-000000000000': 'TYPE',
};

/**
 * Animation state for a single avatar.
 */
interface AvatarAnimState {
  avatarId: string;
  activeAnimations: string[];       // List of active animation names
  activeAnimationIds: string[];     // List of active animation UUIDs
  currentState: string;             // 'stand', 'walk', 'fly', 'sit', 'gesture'
  blendWeight: number;
}

/**
 * Simple procedural animation data for body parts.
 * Maps animation name → body part rotation offsets.
 */
const PROCEDURAL_ANIMATIONS: Record<string, {
  duration: number;
  keyframes: Record<string, { time: number; rotX: number; rotY: number; rotZ: number }[]>;
}> = {
  WALK: {
    duration: 0.8,
    keyframes: {
      legL: [
        { time: 0, rotX: 0.4, rotY: 0, rotZ: 0 },
        { time: 0.4, rotX: -0.4, rotY: 0, rotZ: 0 },
        { time: 0.8, rotX: 0.4, rotY: 0, rotZ: 0 },
      ],
      legR: [
        { time: 0, rotX: -0.4, rotY: 0, rotZ: 0 },
        { time: 0.4, rotX: 0.4, rotY: 0, rotZ: 0 },
        { time: 0.8, rotX: -0.4, rotY: 0, rotZ: 0 },
      ],
      armL: [
        { time: 0, rotX: -0.3, rotY: 0, rotZ: 0 },
        { time: 0.4, rotX: 0.3, rotY: 0, rotZ: 0 },
        { time: 0.8, rotX: -0.3, rotY: 0, rotZ: 0 },
      ],
      armR: [
        { time: 0, rotX: 0.3, rotY: 0, rotZ: 0 },
        { time: 0.4, rotX: -0.3, rotY: 0, rotZ: 0 },
        { time: 0.8, rotX: 0.3, rotY: 0, rotZ: 0 },
      ],
    },
  },
  FLY: {
    duration: 1.2,
    keyframes: {
      armL: [
        { time: 0, rotX: -0.8, rotY: 0, rotZ: -0.5 },
        { time: 0.6, rotX: -0.5, rotY: 0, rotZ: -0.8 },
        { time: 1.2, rotX: -0.8, rotY: 0, rotZ: -0.5 },
      ],
      armR: [
        { time: 0, rotX: -0.8, rotY: 0, rotZ: 0.5 },
        { time: 0.6, rotX: -0.5, rotY: 0, rotZ: 0.8 },
        { time: 1.2, rotX: -0.8, rotY: 0, rotZ: 0.5 },
      ],
    },
  },
  SIT: {
    duration: 0,
    keyframes: {
      legL: [{ time: 0, rotX: -1.2, rotY: 0, rotZ: 0 }],
      legR: [{ time: 0, rotX: -1.2, rotY: 0, rotZ: 0 }],
    },
  },
  IDLE: {
    duration: 2.0,
    keyframes: {
      torso: [
        { time: 0, rotX: 0, rotY: 0, rotZ: 0 },
        { time: 1.0, rotX: 0.02, rotY: 0, rotZ: 0.01 },
        { time: 2.0, rotX: 0, rotY: 0, rotZ: 0 },
      ],
    },
  },
};

/**
 * AnimationSystem — manages avatar animations.
 * Supports both SL animation UUIDs (server-provided) and procedural fallbacks.
 */
export class AnimationSystem {
  private scene: THREE.Scene;
  private avatarStates: Map<string, AvatarAnimState> = new Map();
  private avatarMixers: Map<string, THREE.AnimationMixer> = new Map();
  private avatarGroups: Map<string, THREE.Group> = new Map();
  private animTimers: Map<string, number> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Register an avatar group for animation.
   */
  registerAvatar(avatarId: string, group: THREE.Group): void {
    this.avatarGroups.set(avatarId, group);
    this.avatarStates.set(avatarId, {
      avatarId,
      activeAnimations: [],
      activeAnimationIds: [],
      currentState: 'stand',
      blendWeight: 1.0,
    });
    this.animTimers.set(avatarId, 0);
  }

  /**
   * Handle animation update from server (AvatarAnimation event).
   */
  updateAnimations(avatarId: string, animationIds: string[]): void {
    const state = this.avatarStates.get(avatarId);
    if (!state) return;

    // Map UUIDs to names
    const names = animationIds
      .map(id => SL_ANIMATION_MAP[id] || 'UNKNOWN')
      .filter(name => name !== 'UNKNOWN');

    state.activeAnimationIds = animationIds;
    state.activeAnimations = names;

    // Determine current state from active animations
    if (names.includes('WALK') || names.includes('CROUCHWALK')) {
      state.currentState = 'walk';
    } else if (names.includes('FLY') || names.includes('HOVER_FLY') || names.includes('HOVER')) {
      state.currentState = 'fly';
    } else if (names.includes('SIT')) {
      state.currentState = 'sit';
    } else if (names.includes('TYPE') || names.includes('CROUCH')) {
      state.currentState = 'gesture';
    } else {
      state.currentState = 'stand';
    }
  }

  /**
   * Update all animations — call every frame.
   */
  update(delta: number): void {
    for (const [avatarId, state] of this.avatarStates) {
      const group = this.avatarGroups.get(avatarId);
      if (!group) continue;

      // Update procedural animation timer
      const timer = (this.animTimers.get(avatarId) || 0) + delta;
      this.animTimers.set(avatarId, timer);

      // Get the current animation
      const animName = this.mapStateToAnimation(state.currentState);
      const animData = PROCEDURAL_ANIMATIONS[animName];

      if (animData && animData.duration > 0) {
        // Loop the timer
        const t = timer % animData.duration;

        // Apply keyframe rotations to body parts
        for (const [partName, keyframes] of Object.entries(animData.keyframes)) {
          const part = group.getObjectByName(partName);
          if (!part) continue;

          // Find the two keyframes to interpolate between
          let kf0 = keyframes[0];
          let kf1 = keyframes[keyframes.length - 1];
          for (let i = 0; i < keyframes.length - 1; i++) {
            if (t >= keyframes[i].time && t <= keyframes[i + 1].time) {
              kf0 = keyframes[i];
              kf1 = keyframes[i + 1];
              break;
            }
          }

          // Interpolation factor
          const duration = kf1.time - kf0.time;
          const blend = duration > 0 ? (t - kf0.time) / duration : 0;

          // Apply rotation
          part.rotation.x = THREE.MathUtils.lerp(kf0.rotX, kf1.rotX, blend);
          part.rotation.y = THREE.MathUtils.lerp(kf0.rotY, kf1.rotY, blend);
          part.rotation.z = THREE.MathUtils.lerp(kf0.rotZ, kf1.rotZ, blend);
        }
      } else {
        // No animation — reset to default pose
        this.resetPose(group);
      }
    }
  }

  /**
   * Get current animation state for an avatar.
   */
  getState(avatarId: string): string {
    return this.avatarStates.get(avatarId)?.currentState || 'stand';
  }

  /**
   * Remove an avatar from the animation system.
   */
  removeAvatar(avatarId: string): void {
    this.avatarStates.delete(avatarId);
    this.avatarGroups.delete(avatarId);
    this.animTimers.delete(avatarId);
    const mixer = this.avatarMixers.get(avatarId);
    if (mixer) {
      mixer.stopAllAction();
      this.avatarMixers.delete(avatarId);
    }
  }

  /**
   * Clear all avatars.
   */
  clear(): void {
    for (const [, mixer] of this.avatarMixers) {
      mixer.stopAllAction();
    }
    this.avatarStates.clear();
    this.avatarGroups.clear();
    this.avatarMixers.clear();
    this.animTimers.clear();
  }

  // ── Private ───────────────────────────────────────────────

  /**
   * Map avatar state to animation name.
   */
  private mapStateToAnimation(state: string): string {
    switch (state) {
      case 'walk': return 'WALK';
      case 'fly': return 'FLY';
      case 'sit': return 'SIT';
      case 'gesture': return 'IDLE';
      default: return 'IDLE';
    }
  }

  /**
   * Reset avatar to default standing pose.
   */
  private resetPose(group: THREE.Group): void {
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Smoothly interpolate back to default
        child.rotation.x *= 0.9;
        child.rotation.y *= 0.9;
        child.rotation.z *= 0.9;
      }
    });
  }
}

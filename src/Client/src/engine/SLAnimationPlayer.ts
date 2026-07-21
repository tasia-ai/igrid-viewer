import * as THREE from 'three';

/**
 * Joint keyframe for SL animation.
 * Stores the rotation delta for a specific joint at a specific time.
 */
export interface JointKeyframe {
  jointName: string;
  time: number;
  rotation: THREE.Quaternion;
}

/**
 * SL animation clip containing keyframes for multiple joints.
 */
export interface SLAnimationClip {
  name: string;
  duration: number;
  keyframes: Map<string, JointKeyframe[]>;
}

/**
 * SL Animation player that plays keyframe animations on a Three.js Skeleton.
 * Converts SL BVH/animation format to Three.js AnimationClip.
 */
export class SLAnimationPlayer {
  private mixer: THREE.AnimationMixer | null = null;
  private clips: Map<string, THREE.AnimationClip> = new Map();
  private actions: Map<string, THREE.AnimationAction> = new Map();
  private currentAction: THREE.AnimationAction | null = null;

  /**
   * Initialize the animation mixer for a skeleton root.
   */
  init(root: THREE.Object3D): void {
    this.mixer = new THREE.AnimationMixer(root);
  }

  /**
   * Convert an SL animation clip to Three.js AnimationClip.
   */
  createAnimationClip(clip: SLAnimationClip): THREE.AnimationClip {
    const tracks: THREE.KeyframeTrack[] = [];

    for (const [jointName, keyframes] of clip.keyframes) {
      if (keyframes.length === 0) continue;

      // Sort by time
      keyframes.sort((a, b) => a.time - b.time);

      const times: number[] = [];
      const values: number[] = [];

      for (const kf of keyframes) {
        times.push(kf.time);
        values.push(
          kf.rotation.x,
          kf.rotation.y,
          kf.rotation.z,
          kf.rotation.w
        );
      }

      // Three.js expects quaternion tracks with the bone name path
      const trackName = `${jointName}.quaternion`;
      const track = new THREE.QuaternionKeyframeTrack(
        trackName,
        times,
        values,
        THREE.InterpolateLinear
      );

      tracks.push(track);
    }

    const animationClip = new THREE.AnimationClip(
      clip.name,
      clip.duration,
      tracks
    );

    this.clips.set(clip.name, animationClip);
    return animationClip;
  }

  /**
   * Play an animation by name.
   */
  play(clipName: string, loop = true, blendTime = 0.3): void {
    if (!this.mixer) return;

    const clip = this.clips.get(clipName);
    if (!clip) {
      console.warn(`[SLAnimation] Clip not found: ${clipName}`);
      return;
    }

    // Stop current animation with crossfade
    if (this.currentAction) {
      this.currentAction.crossFadeTo(
        this.mixer.clipAction(clip),
        blendTime,
        true
      );
    }

    const action = this.mixer.clipAction(clip);
    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);
    action.clampWhenFinished = true;
    action.play();

    this.currentAction = action;
    this.actions.set(clipName, action);
  }

  /**
   * Stop all animations.
   */
  stop(): void {
    for (const action of this.actions.values()) {
      action.stop();
    }
    this.actions.clear();
    this.currentAction = null;
  }

  /**
   * Update animation (call each frame).
   */
  update(deltaTime: number): void {
    this.mixer?.update(deltaTime);
  }

  /**
   * Parse SL BVH animation data to SLAnimationClip.
   * BVH format: HIERARCHY section defines joints, MOTION section has keyframes.
   */
  parseBVH(bvhData: string): SLAnimationClip {
    const lines = bvhData.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const keyframes = new Map<string, JointKeyframe[]>();
    let duration = 0;
    let currentTime = 0;
    let numFrames = 0;
    let frameTime = 0;

    let inMotion = false;
    let currentJoint = '';
    let channels: string[] = [];
    const jointChannelMap = new Map<string, string[]>();

    let lineIdx = 0;

    // Parse hierarchy
    while (lineIdx < lines.length) {
      const line = lines[lineIdx];

      if (line.startsWith('MOTION')) {
        inMotion = true;
        lineIdx++;
        continue;
      }

      if (!inMotion) {
        // Parse joint hierarchy
        if (line.startsWith('ROOT') || line.startsWith('JOINT')) {
          const parts = line.split(/\s+/);
          currentJoint = parts[1] || parts[0];
        } else if (line.startsWith('CHANNELS')) {
          const parts = line.split(/\s+/);
          const numChannels = parseInt(parts[1]);
          channels = parts.slice(2, 2 + numChannels);
          jointChannelMap.set(currentJoint, channels);
        } else if (line === 'End Site') {
          // Skip end site
        }
      } else {
        // Parse motion data
        if (line.startsWith('Frames:')) {
          numFrames = parseInt(line.split(':')[1]);
        } else if (line.startsWith('Frame Time:')) {
          frameTime = parseFloat(line.split(':')[1]);
          duration = numFrames * frameTime;
        } else {
          // Parse keyframe data
          const values = line.split(/\s+/).map(Number);
          const jointChannels = jointChannelMap.get(currentJoint);

          if (jointChannels) {
            for (let i = 0; i < jointChannels.length; i++) {
              const channel = jointChannels[i];
              if (channel.endsWith('Zrotation')) {
                // Convert SL rotation to quaternion
                const angle = (values[i] || 0) * Math.PI / 180;
                const quat = new THREE.Quaternion();
                quat.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);

                if (!keyframes.has(currentJoint)) {
                  keyframes.set(currentJoint, []);
                }
                keyframes.get(currentJoint)!.push({
                  jointName: currentJoint,
                  time: currentTime,
                  rotation: quat,
                });
              }
            }
          }

          currentTime += frameTime;
        }
      }

      lineIdx++;
    }

    return {
      name: 'bvh_animation',
      duration,
      keyframes,
    };
  }

  /**
   * Dispose resources.
   */
  dispose(): void {
    this.stop();
    this.clips.clear();
    this.mixer = null;
  }
}

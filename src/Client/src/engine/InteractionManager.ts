import * as THREE from 'three';

/**
 * Interaction result from raycasting.
 */
export interface InteractionResult {
  objectId: string;
  objectName: string;
  point: THREE.Vector3;
  normal: THREE.Vector3;
  distance: number;
}

/**
 * Interaction types that can be performed on objects.
 */
export type InteractionType = 'touch' | 'sit' | 'pay' | 'grab' | 'edit' | 'none';

/**
 * Manages object interactions via raycasting and server events.
 * Handles click-to-touch, click-to-sit, and pay dialogs.
 */
export class InteractionManager {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2;
  private onInteract?: (result: InteractionResult, type: InteractionType) => void;
  private enabled = true;

  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  /**
   * Set the interaction callback.
   */
  setCallback(callback: (result: InteractionResult, type: InteractionType) => void): void {
    this.onInteract = callback;
  }

  /**
   * Enable/disable interactions.
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Handle a click event at screen coordinates.
   * Returns the interaction result if an object was hit.
   */
  handleClick(screenX: number, screenY: number, interactionType: InteractionType = 'touch'): InteractionResult | null {
    if (!this.enabled) return null;

    // Convert screen coordinates to normalized device coordinates
    this.mouse.x = (screenX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(screenY / window.innerHeight) * 2 + 1;

    // Cast ray
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Get all mesh objects in the scene
    const objects: THREE.Object3D[] = [];
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.visible) {
        objects.push(child);
      }
    });

    const intersects = this.raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const objectName = hit.object.name || 'Unknown';

      const result: InteractionResult = {
        objectId: hit.object.userData?.objectId || hit.object.parent?.userData?.objectId || 'unknown',
        objectName,
        point: hit.point.clone(),
        normal: hit.face?.normal?.clone() || new THREE.Vector3(0, 1, 0),
        distance: hit.distance,
      };

      this.onInteract?.(result, interactionType);
      return result;
    }

    return null;
  }

  /**
   * Get the object under the cursor (for hover highlight).
   */
  getHoveredObject(screenX: number, screenY: number): InteractionResult | null {
    if (!this.enabled) return null;

    this.mouse.x = (screenX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(screenY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const objects: THREE.Object3D[] = [];
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.visible) {
        objects.push(child);
      }
    });

    const intersects = this.raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      return {
        objectId: hit.object.userData?.objectId || hit.object.parent?.userData?.objectId || 'unknown',
        objectName: hit.object.name || 'Unknown',
        point: hit.point.clone(),
        normal: hit.face?.normal?.clone() || new THREE.Vector3(0, 1, 0),
        distance: hit.distance,
      };
    }

    return null;
  }

  dispose(): void {
    this.onInteract = undefined;
  }
}

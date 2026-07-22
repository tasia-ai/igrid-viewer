import * as THREE from 'three';

/**
 * HUD attachment points (SL HUD positions).
 * These are rendered in a separate camera pass at fixed screen positions.
 */
const HUD_POINTS: Record<string, { x: number; y: number; scale: number }> = {
  // HUD Bar positions
  'HUD Center': { x: 0, y: 0, scale: 0.3 },
  'HUD Center Down': { x: 0, y: -0.3, scale: 0.25 },
  'HUD Center Up': { x: 0, y: 0.3, scale: 0.25 },
  'HUD Left': { x: -0.5, y: 0, scale: 0.25 },
  'HUD Right': { x: 0.5, y: 0, scale: 0.25 },
  'HUD Top Left': { x: -0.7, y: 0.5, scale: 0.2 },
  'HUD Top Right': { x: 0.7, y: 0.5, scale: 0.2 },
  'HUD Bottom Left': { x: -0.7, y: -0.5, scale: 0.2 },
  'HUD Bottom Right': { x: 0.7, y: -0.5, scale: 0.2 },
  // Eye positions (special HUD)
  'HUD Eye Center': { x: 0, y: 0, scale: 0.15 },
};

export interface HUDObject {
  objectId: string;
  attachmentPoint: string;
  name: string;
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
  scale: THREE.Vector3;
  visible: boolean;
}

/**
 * Renders HUD attachments using a separate orthographic camera pass.
 * Objects attached to HUD points are rendered at fixed screen positions
 * independent of the main camera view.
 */
export class HUDRenderer {
  private scene: THREE.Scene;
  private hudScene: THREE.Scene;
  private hudCamera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private objects = new Map<string, THREE.Group>();
  private objectData = new Map<string, HUDObject>();

  constructor(mainScene: THREE.Scene, renderer: THREE.WebGLRenderer) {
    this.scene = mainScene;
    this.renderer = renderer;

    // Create separate HUD scene
    this.hudScene = new THREE.Scene();

    // Orthographic camera for HUD (normalized -1 to 1 coordinates)
    const aspect = window.innerWidth / window.innerHeight;
    this.hudCamera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 100);
    this.hudCamera.position.z = 10;

    // Add ambient light to HUD scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.hudScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 10);
    this.hudScene.add(directionalLight);
  }

  /**
   * Add a HUD object to be rendered.
   */
  addObject(objectId: string, attachmentPoint: string, object: THREE.Object3D): void {
    const group = new THREE.Group();
    group.add(object);

    // Position based on HUD attachment point
    const hudPos = HUD_POINTS[attachmentPoint] || { x: 0, y: 0, scale: 0.2 };
    group.position.set(hudPos.x * 2, hudPos.y * 2, 0);
    group.scale.setScalar(hudPos.scale);

    this.hudScene.add(group);
    this.objects.set(objectId, group);

    this.objectData.set(objectId, {
      objectId,
      attachmentPoint,
      name: object.name || 'HUD Object',
      position: new THREE.Vector3(hudPos.x * 2, hudPos.y * 2, 0),
      rotation: new THREE.Quaternion(),
      scale: new THREE.Vector3(hudPos.scale, hudPos.scale, hudPos.scale),
      visible: true,
    });
  }

  /**
   * Remove a HUD object.
   */
  removeObject(objectId: string): void {
    const group = this.objects.get(objectId);
    if (group) {
      this.hudScene.remove(group);
      this.objects.delete(objectId);
      this.objectData.delete(objectId);
    }
  }

  /**
   * Update a HUD object's position/rotation/scale.
   */
  updateObject(objectId: string, updates: Partial<{ position: THREE.Vector3; rotation: THREE.Quaternion; scale: THREE.Vector3; visible: boolean }>): void {
    const group = this.objects.get(objectId);
    const data = this.objectData.get(objectId);
    if (!group || !data) return;

    if (updates.position) {
      group.position.copy(updates.position);
      data.position.copy(updates.position);
    }
    if (updates.rotation) {
      group.quaternion.copy(updates.rotation);
      data.rotation.copy(updates.rotation);
    }
    if (updates.scale) {
      group.scale.copy(updates.scale);
      data.scale.copy(updates.scale);
    }
    if (updates.visible !== undefined) {
      group.visible = updates.visible;
      data.visible = updates.visible;
    }
  }

  /**
   * Render the HUD pass. Call this AFTER the main scene render.
   */
  render(): void {
    // Save main viewport
    const mainViewport = new THREE.Vector4();
    this.renderer.getViewport(mainViewport);
    const mainScissor = new THREE.Vector4();
    this.renderer.getScissor(mainScissor);
    const mainScissorTest = this.renderer.getScissorTest();

    // Render HUD scene full-screen with orthographic camera
    this.renderer.setScissorTest(false);
    this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    this.renderer.render(this.hudScene, this.hudCamera);

    // Restore main viewport
    this.renderer.setScissorTest(mainScissorTest);
    this.renderer.setViewport(mainViewport);
    this.renderer.setScissor(mainScissor);
  }

  /**
   * Get all HUD objects.
   */
  getObjects(): HUDObject[] {
    return Array.from(this.objectData.values());
  }

  /**
   * Check if a point is an HUD attachment point.
   */
  isHUDPoint(attachmentPoint: string): boolean {
    return attachmentPoint in HUD_POINTS || attachmentPoint.startsWith('HUD');
  }

  /**
   * Update viewport on window resize.
   */
  resize(width: number, height: number): void {
    const aspect = width / height;
    this.hudCamera.left = -aspect;
    this.hudCamera.right = aspect;
    this.hudCamera.updateProjectionMatrix();
  }

  dispose(): void {
    this.objects.clear();
    this.objectData.clear();
  }
}

import * as THREE from 'three';

/**
 * Build mode state.
 */
export type BuildTool = 'select' | 'move' | 'rotate' | 'scale' | 'create' | 'texture';

export interface SelectedObject {
  objectId: string;
  localId: number;
  name: string;
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
  scale: THREE.Vector3;
  mesh: THREE.Object3D;
}

/**
 * BuildTools — Object creation, selection, and editing.
 * Provides gizmo-based manipulation (move/rotate/scale) and edit panels.
 */
export class BuildTools {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private active = false;
  private currentTool: BuildTool = 'select';
  private selectedObject: SelectedObject | null = null;
  private gizmoGroup: THREE.Group;
  private onToolChange?: (tool: BuildTool) => void;
  private onSelectionChange?: (obj: SelectedObject | null) => void;
  private onEditProperty?: (objectId: string, property: string, value: any) => void;

  // Gizmo meshes
  private moveGizmo: THREE.Group | null = null;
  private rotateGizmo: THREE.Group | null = null;
  private scaleGizmo: THREE.Group | null = null;

  constructor(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.gizmoGroup = new THREE.Group();
    this.gizmoGroup.visible = false;
    this.scene.add(this.gizmoGroup);

    this.createGizmos();
  }

  /**
   * Enter or exit build mode.
   */
  setMode(active: boolean): void {
    this.active = active;
    if (!active) {
      this.deselect();
      this.gizmoGroup.visible = false;
    }
  }

  /**
   * Get current build mode state.
   */
  isActive(): boolean {
    return this.active;
  }

  /**
   * Set the current build tool.
   */
  setTool(tool: BuildTool): void {
    this.currentTool = tool;
    this.updateGizmoVisibility();
    this.onToolChange?.(tool);
  }

  /**
   * Get the current build tool.
   */
  getTool(): BuildTool {
    return this.currentTool;
  }

  /**
   * Select an object for editing.
   */
  selectObject(objectId: string, localId: number, name: string, mesh: THREE.Object3D): void {
    this.selectedObject = {
      objectId,
      localId,
      name,
      position: mesh.position.clone(),
      rotation: mesh.quaternion.clone(),
      scale: mesh.scale.clone(),
      mesh,
    };

    this.gizmoGroup.visible = true;
    this.updateGizmoPosition();
    this.updateGizmoVisibility();
    this.onSelectionChange?.(this.selectedObject);
  }

  /**
   * Deselect the current object.
   */
  deselect(): void {
    this.selectedObject = null;
    this.gizmoGroup.visible = false;
    this.onSelectionChange?.(null);
  }

  /**
   * Get the currently selected object.
   */
  getSelected(): SelectedObject | null {
    return this.selectedObject;
  }

  /**
   * Update selected object position (after move).
   */
  updatePosition(position: THREE.Vector3): void {
    if (!this.selectedObject) return;
    this.selectedObject.position.copy(position);
    this.selectedObject.mesh.position.copy(position);
    this.updateGizmoPosition();
    this.onEditProperty?.(this.selectedObject.objectId, 'position', {
      x: position.x, y: position.y, z: position.z,
    });
  }

  /**
   * Update selected object rotation (after rotate).
   */
  updateRotation(rotation: THREE.Quaternion): void {
    if (!this.selectedObject) return;
    this.selectedObject.rotation.copy(rotation);
    this.selectedObject.mesh.quaternion.copy(rotation);
    this.onEditProperty?.(this.selectedObject.objectId, 'rotation', {
      x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w,
    });
  }

  /**
   * Update selected object scale.
   */
  updateScale(scale: THREE.Vector3): void {
    if (!this.selectedObject) return;
    this.selectedObject.scale.copy(scale);
    this.selectedObject.mesh.scale.copy(scale);
    this.onEditProperty?.(this.selectedObject.objectId, 'scale', {
      x: scale.x, y: scale.y, z: scale.z,
    });
  }

  /**
   * Handle mouse click in build mode.
   */
  handleClick(screenX: number, screenY: number): SelectedObject | null {
    if (!this.active) return null;

    const mouse = new THREE.Vector2(
      (screenX / window.innerWidth) * 2 - 1,
      -(screenY / window.innerHeight) * 2 + 1,
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const objects: THREE.Object3D[] = [];
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.visible && child.userData?.objectId) {
        objects.push(child);
      }
    });

    const intersects = raycaster.intersectObjects(objects, false);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const objId = hit.userData?.objectId || hit.parent?.userData?.objectId || 'unknown';
      const localId = hit.userData?.localId || hit.parent?.userData?.localId || 0;
      const name = hit.name || hit.parent?.name || 'Object';
      this.selectObject(objId, localId, name, hit);
      return this.selectedObject;
    } else {
      this.deselect();
      return null;
    }
  }

  /**
   * Set callbacks.
   */
  setCallbacks(callbacks: {
    onToolChange?: (tool: BuildTool) => void;
    onSelectionChange?: (obj: SelectedObject | null) => void;
    onEditProperty?: (objectId: string, property: string, value: any) => void;
  }): void {
    this.onToolChange = callbacks.onToolChange;
    this.onSelectionChange = callbacks.onSelectionChange;
    this.onEditProperty = callbacks.onEditProperty;
  }

  private createGizmos(): void {
    // Move gizmo (arrows)
    this.moveGizmo = new THREE.Group();
    const arrowLength = 2;
    const colors = [0xff4444, 0x44ff44, 0x4444ff]; // R, G, B = X, Y, Z
    const dirs = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];

    for (let i = 0; i < 3; i++) {
      const arrow = new THREE.ArrowHelper(dirs[i], new THREE.Vector3(0, 0, 0), arrowLength, colors[i], 0.3, 0.2);
      this.moveGizmo.add(arrow);
    }
    this.gizmoGroup.add(this.moveGizmo);

    // Rotate gizmo (rings)
    this.rotateGizmo = new THREE.Group();
    const ringGeom = new THREE.RingGeometry(1.5, 1.6, 32);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: colors[i], side: THREE.DoubleSide }));
      if (i === 0) ring.rotation.y = Math.PI / 2; // X ring
      else if (i === 1) ring.rotation.x = Math.PI / 2; // Y ring
      // Z ring stays in XY plane
      this.rotateGizmo.add(ring);
    }
    this.gizmoGroup.add(this.rotateGizmo);

    // Scale gizmo (cubes at ends)
    this.scaleGizmo = new THREE.Group();
    const cubeGeom = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    for (let i = 0; i < 3; i++) {
      const cube = new THREE.Mesh(cubeGeom, new THREE.MeshBasicMaterial({ color: colors[i] }));
      cube.position.copy(dirs[i].multiplyScalar(2));
      this.scaleGizmo.add(cube);

      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), dirs[i].normalize().multiplyScalar(2)]),
        new THREE.LineBasicMaterial({ color: colors[i] }),
      );
      this.scaleGizmo.add(line);
    }
    this.gizmoGroup.add(this.scaleGizmo);
  }

  private updateGizmoPosition(): void {
    if (this.selectedObject) {
      this.gizmoGroup.position.copy(this.selectedObject.position);
    }
  }

  private updateGizmoVisibility(): void {
    if (this.moveGizmo) this.moveGizmo.visible = this.currentTool === 'move';
    if (this.rotateGizmo) this.rotateGizmo.visible = this.currentTool === 'rotate';
    if (this.scaleGizmo) this.scaleGizmo.visible = this.currentTool === 'scale';
  }

  dispose(): void {
    this.scene.remove(this.gizmoGroup);
    this.deselect();
  }
}

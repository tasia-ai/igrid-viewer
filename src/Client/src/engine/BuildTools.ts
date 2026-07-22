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

  toggle(): void {
    if (!this._active) { this._active = true; }
    else { this._active = false; this.deselect(); }
  }
  private _active = false;

  dispose(): void {
    this.scene.remove(this.gizmoGroup);
    this.deselect();
  }
}

// ═══════════════════════════════════════════════
// EditWindow — Object properties editor panel
// ═══════════════════════════════════════════════

export interface ObjectEditData {
  objectId: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number; w: number };
  scale: { x: number; y: number; z: number };
  phantom: boolean;
  physical: boolean;
  temporary: boolean;
  volumeDetect: boolean;
  selectedTexture?: string;
}

export class EditWindow {
  private panel: HTMLDivElement | null = null;
  private data: ObjectEditData | null = null;
  private onChange?: (objectId: string, prop: string, value: any) => void;

  constructor(callbacks?: { onChange?: (objectId: string, prop: string, value: any) => void }) {
    this.onChange = callbacks?.onChange;
  }

  show(data: ObjectEditData): void {
    this.hide();
    this.data = data;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position:fixed; right:20px; top:80px; width:300px; max-height:70vh;
      background:rgba(20,20,30,0.95); border:1px solid rgba(100,150,255,0.3);
      border-radius:10px; z-index:10000; overflow-y:auto;
      font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 8px 32px rgba(0,0,0,0.5);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size:13px; font-weight:600;';
    title.textContent = `🔧 ${data.name || 'Object'}`;
    header.appendChild(title);
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none; border:none; color:#888; font-size:16px; cursor:pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Tabs
    const tabs = document.createElement('div');
    tabs.style.cssText = 'display:flex; border-bottom:1px solid rgba(255,255,255,0.1);';
    const tabNames = ['General', 'Features', 'Texture', 'Permissions'];
    const tabContent = document.createElement('div');
    tabContent.style.cssText = 'padding:10px 14px;';

    for (const tabName of tabNames) {
      const tab = document.createElement('button');
      tab.textContent = tabName;
      tab.style.cssText = `flex:1; padding:6px; background:none; border:none; border-bottom:2px solid transparent; color:#888; cursor:pointer; font-size:11px;`;
      tab.onclick = () => {
        tabs.querySelectorAll('button').forEach(b => b.style.borderBottomColor = 'transparent');
        tab.style.borderBottomColor = 'rgba(100,150,255,0.8)';
        tab.style.color = '#fff';
        tabContent.innerHTML = '';
        if (tabName === 'General') this.renderGeneralTab(tabContent);
        else if (tabName === 'Features') this.renderFeaturesTab(tabContent);
        else if (tabName === 'Texture') this.renderTextureTab(tabContent);
        else if (tabName === 'Permissions') this.renderPermissionsTab(tabContent);
      };
      tabs.appendChild(tab);
    }
    this.panel.appendChild(tabs);

    // Default to General tab
    tabContent.innerHTML = '';
    this.renderGeneralTab(tabContent);
    this.panel.appendChild(tabContent);

    document.body.appendChild(this.panel);
  }

  hide(): void { if (this.panel) { this.panel.remove(); this.panel = null; } }

  private renderGeneralTab(container: HTMLDivElement): void {
    if (!this.data) return;
    const d = this.data;

    container.appendChild(this.makeInput('Name', d.name, (v) => this.onChange?.(d.objectId, 'name', v)));
    container.appendChild(this.makeInput('Description', d.description, (v) => this.onChange?.(d.objectId, 'description', v)));
    container.appendChild(this.makeVecInput('Position', d.position, (v) => this.onChange?.(d.objectId, 'position', v)));
    container.appendChild(this.makeVecInput('Scale', d.scale, (v) => this.onChange?.(d.objectId, 'scale', v)));
  }

  private renderFeaturesTab(container: HTMLDivElement): void {
    if (!this.data) return;
    const d = this.data;

    const flags = [
      { label: '👻 Phantom (no collisions)', key: 'phantom', value: d.phantom },
      { label: '🏋️ Physical (physics enabled)', key: 'physical', value: d.physical },
      { label: '⏱️ Temporary (auto-delete)', key: 'temporary', value: d.temporary },
      { label: '🔍 Volume Detect', key: 'volumeDetect', value: d.volumeDetect },
    ];

    for (const flag of flags) {
      const row = document.createElement('label');
      row.style.cssText = 'display:flex; align-items:center; gap:8px; padding:6px 0; cursor:pointer; font-size:12px;';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = flag.value;
      cb.onchange = () => this.onChange?.(d.objectId, flag.key, cb.checked);
      row.appendChild(cb);
      row.appendChild(document.createTextNode(flag.label));
      container.appendChild(row);
    }
  }

  private renderTextureTab(container: HTMLDivElement): void {
    const info = document.createElement('div');
    info.style.cssText = 'font-size:12px; color:#888; margin-bottom:8px;';
    info.textContent = 'Select a face and choose texture:';
    container.appendChild(info);

    // Face selector
    const faceRow = document.createElement('div');
    faceRow.style.cssText = 'display:flex; gap:4px; flex-wrap:wrap; margin-bottom:10px;';
    for (let i = 0; i < 6; i++) {
      const btn = document.createElement('button');
      btn.textContent = `Face ${i}`;
      btn.style.cssText = 'padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid transparent; border-radius:3px; color:#aaa; cursor:pointer; font-size:10px;';
      faceRow.appendChild(btn);
    }
    container.appendChild(faceRow);

    // File picker
    const fileBtn = document.createElement('button');
    fileBtn.textContent = '🖼️ Choose Texture File...';
    fileBtn.style.cssText = 'width:100%; padding:8px; background:rgba(100,150,255,0.2); border:1px solid rgba(100,150,255,0.4); border-radius:4px; color:#ccc; cursor:pointer; font-size:12px;';
    container.appendChild(fileBtn);
  }

  private renderPermissionsTab(container: HTMLDivElement): void {
    if (!this.data) return;

    const perms = [
      'Anyone can copy', 'Anyone can modify', 'Anyone can transfer',
      'Group can copy', 'Group can modify', 'Group can transfer',
    ];
    for (const perm of perms) {
      const row = document.createElement('label');
      row.style.cssText = 'display:flex; align-items:center; gap:8px; padding:4px 0; cursor:pointer; font-size:12px;';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      row.appendChild(cb);
      row.appendChild(document.createTextNode(perm));
      container.appendChild(row);
    }
  }

  private makeInput(label: string, value: string, onChange: (v: string) => void): HTMLDivElement {
    const row = document.createElement('div');
    row.style.cssText = 'margin-bottom:8px;';
    const lbl = document.createElement('div');
    lbl.style.cssText = 'font-size:11px; color:#888; margin-bottom:3px;';
    lbl.textContent = label;
    row.appendChild(lbl);
    const input = document.createElement('input');
    input.value = value;
    input.oninput = () => onChange(input.value);
    input.style.cssText = 'width:100%; padding:5px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:3px; color:#fff; font-size:12px; outline:none; box-sizing:border-box;';
    row.appendChild(input);
    return row;
  }

  private makeVecInput(label: string, value: { x: number; y: number; z: number }, onChange: (v: { x: number; y: number; z: number }) => void): HTMLDivElement {
    const row = document.createElement('div');
    row.style.cssText = 'margin-bottom:8px;';
    const lbl = document.createElement('div');
    lbl.style.cssText = 'font-size:11px; color:#888; margin-bottom:3px;';
    lbl.textContent = label;
    row.appendChild(lbl);
    const inputs = document.createElement('div');
    inputs.style.cssText = 'display:flex; gap:4px;';
    const vals = [value.x, value.y, value.z];
    const labels = ['X', 'Y', 'Z'];
    for (let i = 0; i < 3; i++) {
      const inp = document.createElement('input');
      inp.value = vals[i].toFixed(2);
      inp.style.cssText = 'width:80px; padding:4px 6px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:3px; color:#fff; font-size:11px; outline:none;';
      const lbl2 = document.createElement('span');
      lbl2.style.cssText = 'font-size:10px; color:#666; line-height:24px;';
      lbl2.textContent = labels[i];
      inputs.appendChild(lbl2);
      inputs.appendChild(inp);
    }
    row.appendChild(inputs);
    return row;
  }

  dispose(): void { this.hide(); }
}

import * as THREE from 'three';

/**
 * Camera controller with d-pad buttons (Firestorm-style).
 * - Click d-pad buttons for movement
 * - Right-click drag: orbit around target
 * - Scroll: zoom
 * - Zoom slider
 */
export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private domElement: HTMLElement;
  private target = new THREE.Vector3(0, 10, 0);
  private distance = 30;
  private phi = Math.PI / 4;
  private theta = 0;
  private isDragging = false;
  private lastMouse = { x: 0, y: 0 };
  private flySpeed = 15;
  private moveDirection = new THREE.Vector3(0, 0, 0);

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.setupOrbit();
    this.setupDpad();
    this.updateCamera();
  }

  setTarget(pos: THREE.Vector3) {
    this.target.copy(pos);
    this.updateCamera();
  }

  setTargetFromSL(x: number, y: number, z: number) {
    this.target.set(x, z, y);
    this.updateCamera();
  }

  update(deltaTime: number) {
    if (this.moveDirection.lengthSq() < 0.001) return;

    const forward = new THREE.Vector3(
      Math.sin(this.theta), 0, Math.cos(this.theta)
    ).normalize();
    const right = new THREE.Vector3(Math.cos(this.theta), 0, -Math.sin(this.theta)).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const speed = this.flySpeed * deltaTime;

    const move = new THREE.Vector3();
    if (this.moveDirection.z > 0) move.add(forward);  // forward
    if (this.moveDirection.z < 0) move.sub(forward);  // back
    if (this.moveDirection.x > 0) move.add(right);     // right
    if (this.moveDirection.x < 0) move.sub(right);     // left
    if (this.moveDirection.y > 0) move.add(up);         // up
    if (this.moveDirection.y < 0) move.sub(up);         // down

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed);
      this.target.add(move);
      this.updateCamera();
    }
  }

  // Called by d-pad buttons
  startMove(dx: number, dy: number, dz: number) {
    this.moveDirection.set(dx, dy, dz);
  }

  stopMove() {
    this.moveDirection.set(0, 0, 0);
  }

  setZoom(distance: number) {
    this.distance = Math.max(2, Math.min(200, distance));
    this.updateCamera();
  }

  getZoom(): number { return this.distance; }

  resetView() {
    this.theta = 0;
    this.phi = Math.PI / 4;
    this.distance = 30;
    this.updateCamera();
  }

  private updateCamera() {
    const x = this.target.x + this.distance * Math.sin(this.theta) * Math.cos(this.phi);
    const y = this.target.y + this.distance * Math.sin(this.phi);
    const z = this.target.z + this.distance * Math.cos(this.theta) * Math.cos(this.phi);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.target);
  }

  private setupOrbit() {
    this.domElement.addEventListener('mousedown', (e) => {
      if (e.button === 2) { this.isDragging = true; this.lastMouse = { x: e.clientX, y: e.clientY }; }
    });
    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      this.lastMouse = { x: e.clientX, y: e.clientY };
      this.theta -= dx * 0.005;
      this.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.01, this.phi + dy * 0.005));
      this.updateCamera();
    });
    window.addEventListener('mouseup', (e) => { if (e.button === 2) this.isDragging = false; });
    this.domElement.addEventListener('wheel', (e) => {
      this.distance = Math.max(2, Math.min(200, this.distance + e.deltaY * 0.05));
      this.updateCamera();
    });
    this.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private setupDpad() {
    // D-pad buttons are set up in HTML, we listen via event delegation
  }
}

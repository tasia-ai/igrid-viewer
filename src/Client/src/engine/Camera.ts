import * as THREE from 'three';

/**
 * Camera controller for SL-style fly camera.
 * Right-click drag: orbit around target
 * Scroll: zoom
 * WASD: fly (relative to camera direction)
 * Space/Ctrl: fly up/down
 */
export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private domElement: HTMLElement;
  private target = new THREE.Vector3(0, 10, 0);
  private distance = 30;
  private phi = Math.PI / 4; // elevation angle
  private theta = 0; // azimuth angle
  private isDragging = false;
  private lastMouse = { x: 0, y: 0 };
  private keys = new Set<string>();
  private flySpeed = 20; // units per second

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.setupListeners();
    this.updateCamera();
  }

  setTarget(pos: THREE.Vector3) {
    this.target.copy(pos);
    this.updateCamera();
  }

  setTargetFromSL(x: number, y: number, z: number) {
    // SL coords: X=forward, Y=left, Z=up → Three.js: X=right, Y=up, Z=forward
    this.target.set(x, z, y);
    this.updateCamera();
  }

  update(deltaTime: number) {
    if (this.keys.size === 0) return;

    // Calculate forward/right vectors from camera angles
    const forward = new THREE.Vector3(
      Math.sin(this.theta) * Math.cos(this.phi),
      Math.sin(this.phi),
      Math.cos(this.theta) * Math.cos(this.phi)
    ).normalize();

    const right = new THREE.Vector3(
      Math.cos(this.theta),
      0,
      -Math.sin(this.theta)
    ).normalize();

    const up = new THREE.Vector3(0, 1, 0);
    const speed = this.flySpeed * deltaTime;

    const move = new THREE.Vector3(0, 0, 0);
    if (this.keys.has('KeyW')) move.add(forward);
    if (this.keys.has('KeyS')) move.sub(forward);
    if (this.keys.has('KeyD')) move.add(right);
    if (this.keys.has('KeyA')) move.sub(right);
    if (this.keys.has('Space')) move.add(up);
    if (this.keys.has('ControlLeft') || this.keys.has('ControlRight')) move.sub(up);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed);
      this.target.add(move);
      this.updateCamera();
    }
  }

  private updateCamera() {
    const x = this.target.x + this.distance * Math.sin(this.theta) * Math.cos(this.phi);
    const y = this.target.y + this.distance * Math.sin(this.phi);
    const z = this.target.z + this.distance * Math.cos(this.theta) * Math.cos(this.phi);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.target);
  }

  private setupListeners() {
    // Right-click drag = orbit
    this.domElement.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        this.isDragging = true;
        this.lastMouse.x = e.clientX;
        this.lastMouse.y = e.clientY;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      this.lastMouse.x = e.clientX;
      this.lastMouse.y = e.clientY;

      this.theta -= dx * 0.005;
      this.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.01, this.phi + dy * 0.005));
      this.updateCamera();
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 2) this.isDragging = false;
    });

    // Scroll = zoom
    this.domElement.addEventListener('wheel', (e) => {
      this.distance = Math.max(2, Math.min(200, this.distance + e.deltaY * 0.05));
      this.updateCamera();
    });

    // WASD keys
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    // Prevent context menu
    this.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
  }
}

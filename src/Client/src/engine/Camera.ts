import * as THREE from 'three';

/**
 * Orbit camera controller. Right-click drag to rotate, scroll to zoom.
 */
export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private target: THREE.Vector3 = new THREE.Vector3();
  private distance: number = 20;
  private phi: number = Math.PI / 4;    // Vertical angle from top
  private theta: number = 0;            // Horizontal rotation
  private isDragging: boolean = false;
  private lastMouse = { x: 0, y: 0 };

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.camera = camera;
    this.setupControls(domElement);
    this.update();
  }

  private setupControls(domElement: HTMLElement): void {
    // Right-click drag to orbit
    domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    domElement.addEventListener('mousedown', (e) => {
      if (e.button === 2) { // Right click
        this.isDragging = true;
        this.lastMouse = { x: e.clientX, y: e.clientY };
      }
    });

    domElement.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      this.theta -= dx * 0.005;
      this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi + dy * 0.005));
      this.lastMouse = { x: e.clientX, y: e.clientY };
      this.update();
    });

    domElement.addEventListener('mouseup', (e) => {
      if (e.button === 2) this.isDragging = false;
    });

    domElement.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });

    // Scroll to zoom
    domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.distance = Math.max(1, Math.min(500, this.distance + e.deltaY * 0.05));
      this.update();
    }, { passive: false });
  }

  /**
   * Set the orbit target position (e.g., avatar position).
   */
  setTarget(pos: THREE.Vector3): void {
    this.target.copy(pos);
    this.update();
  }

  getTarget(): THREE.Vector3 {
    return this.target.clone();
  }

  private update(): void {
    const x = this.distance * Math.sin(this.phi) * Math.cos(this.theta);
    const y = this.distance * Math.cos(this.phi);
    const z = this.distance * Math.sin(this.phi) * Math.sin(this.theta);
    this.camera.position.set(
      this.target.x + x,
      this.target.y + y,
      this.target.z + z
    );
    this.camera.lookAt(this.target);
  }
}

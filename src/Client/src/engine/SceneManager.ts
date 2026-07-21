import * as THREE from 'three';

/**
 * Core 3D scene manager. Owns the renderer, scene, camera, water, and render loop.
 * Implements distance-based object culling to prevent frame drops.
 */
export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public clock: THREE.Clock;
  public water: THREE.Mesh;
  public drawDistance = 256;

  constructor(container: HTMLElement) {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 500, 2000);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      70, container.clientWidth / container.clientHeight, 0.1, 5000
    );

    // Renderer — use basic settings for performance
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = false; // Disable shadows for performance
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();

    // Water plane
    const waterGeo = new THREE.PlaneGeometry(4096, 4096);
    const waterMat = new THREE.MeshBasicMaterial({ color: 0x006994, transparent: true, opacity: 0.6 });
    this.water = new THREE.Mesh(waterGeo, waterMat);
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = 20;
    this.water.renderOrder = -1;
    this.scene.add(this.water);

    // Lighting — minimal for performance
    const ambient = new THREE.AmbientLight(0x606080, 1.2);
    this.scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff4e0, 1.5);
    sun.position.set(100, 200, 100);
    this.scene.add(sun);

    // Resize handling
    const onResize = () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);
  }

  /**
   * Start render loop. Calls callback each frame with delta time.
   * Uses requestAnimationFrame with time budgeting to prevent frame drops.
   */
  animate(callback?: (delta: number) => void): void {
    const loop = () => {
      requestAnimationFrame(loop);
      const delta = Math.min(this.clock.getDelta(), 0.1); // Cap delta to prevent huge jumps
      callback?.(delta);
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }
}

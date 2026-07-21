import * as THREE from 'three';

/**
 * Environment system for I-Grid viewer.
 * Sky gradient shader, day/night cycle, PBR water, fog.
 */
export class Environment {
  public scene: THREE.Scene;
  private sunLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private hemiLight: THREE.HemisphereLight;
  private water: THREE.Mesh;
  private skyDome: THREE.Mesh;
  private timeOfDay = 0.5;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // Sky dome with gradient shader
    const skyGeo = new THREE.SphereGeometry(4000, 32, 16);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(h, 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });
    this.skyDome = new THREE.Mesh(skyGeo, skyMat);
    scene.add(this.skyDome);

    // Lighting
    this.sunLight = new THREE.DirectionalLight(0xfff4e0, 1.5);
    this.sunLight.position.set(100, 200, 100);
    scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight(0x606080, 0.8);
    scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x362907, 0.4);
    scene.add(this.hemiLight);

    // PBR Water
    const waterGeo = new THREE.PlaneGeometry(4096, 4096);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x006994,
      transparent: true,
      opacity: 0.65,
      roughness: 0.05,
      metalness: 0.4,
      side: THREE.DoubleSide,
      envMapIntensity: 1.0,
    });
    this.water = new THREE.Mesh(waterGeo, waterMat);
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = 20;
    scene.add(this.water);

    // Fog
    scene.fog = new THREE.Fog(0x87ceeb, 200, 1500);

    this.setTimeOfDay(0.5);
  }

  setTimeOfDay(t: number) {
    this.timeOfDay = Math.max(0, Math.min(1, t));
    const angle = this.timeOfDay * Math.PI;

    // Sun position
    const sunY = Math.sin(angle) * 300;
    const sunZ = Math.cos(angle) * 300;
    this.sunLight.position.set(100, sunY, sunZ);

    // Sun intensity
    this.sunLight.intensity = Math.max(0.1, Math.sin(angle) * 1.5);

    // Sun color
    const warmth = 1 - Math.abs(this.timeOfDay - 0.5) * 2;
    this.sunLight.color.setHSL(0.1 - warmth * 0.05, 0.3 + warmth * 0.5, 0.8 + warmth * 0.2);

    // Sky
    const skyMat = this.skyDome.material as THREE.ShaderMaterial;
    const brightness = Math.max(0.1, Math.sin(angle) * 0.7);
    skyMat.uniforms.topColor.value.setHSL(0.6, 0.7, brightness);
    skyMat.uniforms.bottomColor.value.setHSL(0.1, 0.5, brightness * 0.5);

    // Ambient
    this.ambientLight.intensity = 0.3 + Math.sin(angle) * 0.5;

    // Background + fog
    this.scene.background = skyMat.uniforms.topColor.value.clone() as THREE.Color;
    if (this.scene.fog) this.scene.fog.color.copy(this.scene.background);

    // Water color
    (this.water.material as THREE.MeshStandardMaterial).color.setHSL(0.55, 0.6, 0.15 + Math.sin(angle) * 0.2);
  }

  update(_delta: number) {
    this.water.position.y = 20 + Math.sin(Date.now() * 0.0005) * 0.5;
  }
}

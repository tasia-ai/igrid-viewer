import * as THREE from 'three';

/**
 * Sky / environment preset definition.
 * Every field is explicit so setPreset can apply the whole look at once.
 */
export interface SkyPreset {
  name: string;
  topColor: THREE.Color;
  midColor: THREE.Color;
  bottomColor: THREE.Color;
  sunDirection: THREE.Vector3;
  sunIntensity: number;
  sunColor: THREE.Color;
  fogColor: THREE.Color;
  fogNear: number;
  fogFar: number;
  ambientIntensity: number;
  ambientColor: THREE.Color;
  hemiSkyColor: THREE.Color;
  hemiGroundColor: THREE.Color;
  hemiIntensity: number;
  waterColor: THREE.Color;
  waterOpacity: number;
  timeOfDay: number;
}

/** Pre-defined sky presets keyed by lowercase name. */
const SKY_PRESETS: Record<string, SkyPreset> = {
  day: {
    name: 'Day',
    topColor: new THREE.Color(0x0077ff),
    midColor: new THREE.Color(0x87ceeb),
    bottomColor: new THREE.Color(0xffffff),
    sunDirection: new THREE.Vector3(0.5, 0.9, 0.5).normalize(),
    sunIntensity: 1.5,
    sunColor: new THREE.Color(0xfff4e0),
    fogColor: new THREE.Color(0x87ceeb),
    fogNear: 200,
    fogFar: 1500,
    ambientIntensity: 0.8,
    ambientColor: new THREE.Color(0x606080),
    hemiSkyColor: new THREE.Color(0x87ceeb),
    hemiGroundColor: new THREE.Color(0x362907),
    hemiIntensity: 0.4,
    waterColor: new THREE.Color(0x006994),
    waterOpacity: 0.65,
    timeOfDay: 0.5,
  },

  sunset: {
    name: 'Sunset',
    topColor: new THREE.Color(0x2a1a4e),
    midColor: new THREE.Color(0xcc5533),
    bottomColor: new THREE.Color(0xff7722),
    sunDirection: new THREE.Vector3(0.8, 0.15, 0.3).normalize(),
    sunIntensity: 0.8,
    sunColor: new THREE.Color(0xff6622),
    fogColor: new THREE.Color(0xcc6633),
    fogNear: 150,
    fogFar: 1200,
    ambientIntensity: 0.35,
    ambientColor: new THREE.Color(0x884422),
    hemiSkyColor: new THREE.Color(0xcc6644),
    hemiGroundColor: new THREE.Color(0x2a1508),
    hemiIntensity: 0.35,
    waterColor: new THREE.Color(0x663322),
    waterOpacity: 0.7,
    timeOfDay: 0.2,
  },

  night: {
    name: 'Night',
    topColor: new THREE.Color(0x050510),
    midColor: new THREE.Color(0x0a0a2e),
    bottomColor: new THREE.Color(0x111133),
    sunDirection: new THREE.Vector3(0.3, 0.8, 0.5).normalize(),
    sunIntensity: 0.04,
    sunColor: new THREE.Color(0xaabbdd),
    fogColor: new THREE.Color(0x080820),
    fogNear: 100,
    fogFar: 800,
    ambientIntensity: 0.12,
    ambientColor: new THREE.Color(0x222244),
    hemiSkyColor: new THREE.Color(0x0a0a2e),
    hemiGroundColor: new THREE.Color(0x000000),
    hemiIntensity: 0.15,
    waterColor: new THREE.Color(0x060618),
    waterOpacity: 0.8,
    timeOfDay: 0.0,
  },

  mars: {
    name: 'Mars',
    topColor: new THREE.Color(0x6b2a1a),
    midColor: new THREE.Color(0xcc5533),
    bottomColor: new THREE.Color(0xdd6633),
    sunDirection: new THREE.Vector3(0.6, 0.35, 0.4).normalize(),
    sunIntensity: 0.7,
    sunColor: new THREE.Color(0xff4422),
    fogColor: new THREE.Color(0x884433),
    fogNear: 120,
    fogFar: 900,
    ambientIntensity: 0.3,
    ambientColor: new THREE.Color(0x663322),
    hemiSkyColor: new THREE.Color(0x994433),
    hemiGroundColor: new THREE.Color(0x331108),
    hemiIntensity: 0.3,
    waterColor: new THREE.Color(0x552211),
    waterOpacity: 0.75,
    timeOfDay: 0.3,
  },
};

/**
 * Environment system for I-Grid viewer.
 * Sky gradient shader, day/night cycle, PBR water, fog.
 * Enhanced with sun disc, sun glow/halo, and horizon glow.
 * Supports sky presets for quick environment switching.
 */
export class Environment {
  public scene: THREE.Scene;
  private sunLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private hemiLight: THREE.HemisphereLight;
  private water: THREE.Mesh;
  private skyDome: THREE.Mesh;
  private timeOfDay = 0.5;
  private currentPreset: string = 'day';

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // Sky dome with gradient shader (enhanced with sun disc, glow, horizon glow)
    const skyGeo = new THREE.SphereGeometry(4000, 32, 16);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor:     { value: new THREE.Color(0x0077ff) },
        midColor:     { value: new THREE.Color(0x87ceeb) },
        bottomColor:  { value: new THREE.Color(0xffffff) },
        sunDirection: { value: new THREE.Vector3(0.5, 0.9, 0.5).normalize() },
        sunIntensity: { value: 1.0 },
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
        uniform vec3 midColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDirection;
        uniform float sunIntensity;
        varying vec3 vWorldPosition;

        void main() {
          vec3 dir = normalize(vWorldPosition);

          // ---- 3-stop sky gradient (zenith → mid → horizon) ----
          float h = dir.y;
          // Clamp horizon band: map [-0.1 .. 0.3] to [0 .. 1]
          float horizonBlend = smoothstep(-0.1, 0.3, h);
          // Upper blend: map [0.3 .. 1.0] to [0 .. 1]
          float upperBlend = smoothstep(0.3, 1.0, h);

          vec3 skyColor = mix(midColor, topColor, upperBlend);
          // Below horizon fade into bottomColor
          skyColor = mix(bottomColor, skyColor, horizonBlend);

          // ---- Sun disc ----
          float sunDot = dot(dir, sunDirection);
          // Sharp disc: smooth edge just below 1.0
          float sunDisc = smoothstep(0.9995, 0.9998, sunDot);
          vec3 sunColor = vec3(1.0, 0.98, 0.85);
          skyColor += sunColor * sunDisc * 2.0 * sunIntensity;

          // ---- Sun glow / halo ----
          // Wider exponential falloff around the sun
          float glow = pow(max(sunDot, 0.0), 64.0);
          skyColor += sunColor * glow * 0.6 * sunIntensity;

          // Broad outer halo
          float halo = pow(max(sunDot, 0.0), 8.0);
          skyColor += vec3(1.0, 0.9, 0.7) * halo * 0.25 * sunIntensity;

          // ---- Horizon glow (warm orange, strongest when sun is low) ----
          float horizonFactor = exp(-abs(h) * 6.0);
          // Horizon glow is brightest when sun is near the horizon
          float sunNearHorizon = 1.0 - abs(sunDirection.y);
          vec3 horizonGlowColor = vec3(1.0, 0.55, 0.15);
          skyColor += horizonGlowColor * horizonFactor * sunNearHorizon * 0.5 * sunIntensity;

          gl_FragColor = vec4(skyColor, 1.0);
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

  // ── Preset API ──────────────────────────────────────────────

  /** Return the list of available preset key names (in display order). */
  getPresetNames(): string[] {
    return Object.keys(SKY_PRESETS);
  }

  /** Return the current preset key, or 'day' if using setTimeOfDay directly. */
  getCurrentPreset(): string {
    return this.currentPreset;
  }

  /**
   * Apply a sky preset by key name.
   * Sets all environment parameters at once (sky colours, sun, fog, water, lights).
   * After this call, setTimeOfDay can still be used to override values.
   */
  setPreset(name: string): void {
    const key = name.toLowerCase();
    const preset = SKY_PRESETS[key];
    if (!preset) {
      console.warn(`[Environment] Unknown preset: "${name}". Available: ${Object.keys(SKY_PRESETS).join(', ')}`);
      return;
    }
    this.currentPreset = key;

    // --- Sky shader uniforms ---
    const skyMat = this.skyDome.material as THREE.ShaderMaterial;
    skyMat.uniforms.topColor.value.copy(preset.topColor);
    skyMat.uniforms.midColor.value.copy(preset.midColor);
    skyMat.uniforms.bottomColor.value.copy(preset.bottomColor);
    skyMat.uniforms.sunDirection.value.copy(preset.sunDirection);
    skyMat.uniforms.sunIntensity.value = preset.sunIntensity;

    // --- Directional (sun/moon) light ---
    const sunY = preset.sunDirection.y * 300;
    const sunZ = preset.sunDirection.z * 300;
    this.sunLight.position.set(preset.sunDirection.x * 300, sunY, sunZ);
    this.sunLight.color.copy(preset.sunColor);
    this.sunLight.intensity = preset.sunIntensity;

    // --- Ambient light ---
    this.ambientLight.color.copy(preset.ambientColor);
    this.ambientLight.intensity = preset.ambientIntensity;

    // --- Hemisphere light ---
    this.hemiLight.color.copy(preset.hemiSkyColor);
    this.hemiLight.groundColor.copy(preset.hemiGroundColor);
    this.hemiLight.intensity = preset.hemiIntensity;

    // --- Fog ---
    if (this.scene.fog) {
      (this.scene.fog as THREE.Fog).color.copy(preset.fogColor);
      (this.scene.fog as THREE.Fog).near = preset.fogNear;
      (this.scene.fog as THREE.Fog).far = preset.fogFar;
    }

    // --- Scene background (matches sky zenith) ---
    this.scene.background = preset.topColor.clone();

    // --- Water ---
    const waterMat = this.water.material as THREE.MeshStandardMaterial;
    waterMat.color.copy(preset.waterColor);
    waterMat.opacity = preset.waterOpacity;

    // Store the time-of-day so setTimeOfDay can still pick up later
    this.timeOfDay = preset.timeOfDay;
  }

  // ── Original API (unchanged signature) ──────────────────────

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

    // Sky uniforms
    const skyMat = this.skyDome.material as THREE.ShaderMaterial;
    const brightness = Math.max(0.1, Math.sin(angle) * 0.7);

    // 3-stop gradient colors
    skyMat.uniforms.topColor.value.setHSL(0.6, 0.7, brightness);
    skyMat.uniforms.midColor.value.setHSL(0.55, 0.5, brightness * 0.7 + 0.15);
    skyMat.uniforms.bottomColor.value.setHSL(0.1, 0.5, brightness * 0.5);

    // Sun direction for the sky shader (normalized)
    const sunDir = new THREE.Vector3(100, sunY, sunZ).normalize();
    skyMat.uniforms.sunDirection.value.copy(sunDir);

    // Sun visibility fades at night
    skyMat.uniforms.sunIntensity.value = Math.max(0, Math.sin(angle) * 1.5);

    // Ambient
    this.ambientLight.intensity = 0.3 + Math.sin(angle) * 0.5;

    // Background + fog
    this.scene.background = skyMat.uniforms.topColor.value.clone() as THREE.Color;
    if (this.scene.fog) this.scene.fog.color.copy(this.scene.background);

    // Water color
    (this.water.material as THREE.MeshStandardMaterial).color.setHSL(0.55, 0.6, 0.15 + Math.sin(angle) * 0.2);

    // Mark that we are no longer on a named preset
    this.currentPreset = '';
  }

  update(_delta: number) {
    this.water.position.y = 20 + Math.sin(Date.now() * 0.0005) * 0.5;
  }
}

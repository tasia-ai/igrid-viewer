import * as THREE from 'three';

// ── WindlightSettings (matches OpenMetaverse format) ─────────────────

/**
 * Windlight / EEP settings transmitted from the server.
 * Maps to the fields available in LibreMetaverse's RegionInfoPacket
 * and the broader SecondLife Windlight / EEP specification.
 */
export interface WindlightSettings {
  // -- Sky colours (RGB 0-1) --
  skyTopColor:     { r: number; g: number; b: number };
  skyMidColor:     { r: number; g: number; b: number };
  skyBottomColor:  { r: number; g: number; b: number };

  // -- Sun / Moon --
  sunDirection:    { x: number; y: number; z: number };
  sunColor:        { r: number; g: number; b: number };
  sunIntensity:    number;
  moonDirection:   { x: number; y: number; z: number };
  moonColor:       { r: number; g: number; b: number };
  moonIntensity:   number;

  // -- Fog --
  fogColor:        { r: number; g: number; b: number };
  fogNear:         number;
  fogFar:          number;

  // -- Lighting --
  ambientColor:    { r: number; g: number; b: number };
  ambientIntensity: number;
  hemiSkyColor:    { r: number; g: number; b: number };
  hemiGroundColor: { r: number; g: number; b: number };
  hemiIntensity:   number;

  // -- Water --
  waterColor:      { r: number; g: number; b: number };
  waterOpacity:    number;
  waterHeight:     number;

  // -- Time --
  /** 0 = midnight, 0.25 = sunrise, 0.5 = noon, 0.75 = sunset */
  timeOfDay:       number;
  useEstateSun:    boolean;

  // -- Cloud density (placeholder for future) --
  cloudDensity:    number;
}

/** Helper: convert {r,g,b} 0-1 to THREE.Color */
function vec3ToColor(v: { r: number; g: number; b: number }): THREE.Color {
  return new THREE.Color(v.r, v.g, v.b);
}

/** Create a default daytime WindlightSettings. */
export function defaultWindlightSettings(): WindlightSettings {
  return {
    skyTopColor:    { r: 0.0, g: 0.467, b: 1.0 },
    skyMidColor:    { r: 0.529, g: 0.808, b: 0.922 },
    skyBottomColor: { r: 1.0, g: 1.0, b: 1.0 },
    sunDirection:   { x: 0.5, y: 0.9, z: 0.5 },
    sunColor:       { r: 1.0, g: 0.957, b: 0.878 },
    sunIntensity:   1.5,
    moonDirection:  { x: -0.3, y: 0.8, z: -0.5 },
    moonColor:      { r: 0.69, g: 0.73, b: 0.87 },
    moonIntensity:  0.04,
    fogColor:       { r: 0.529, g: 0.808, b: 0.922 },
    fogNear:        200,
    fogFar:         1500,
    ambientColor:   { r: 0.376, g: 0.376, b: 0.502 },
    ambientIntensity: 0.8,
    hemiSkyColor:   { r: 0.529, g: 0.808, b: 0.922 },
    hemiGroundColor:{ r: 0.212, g: 0.161, b: 0.027 },
    hemiIntensity:  0.4,
    waterColor:     { r: 0.0, g: 0.412, b: 0.58 },
    waterOpacity:   0.65,
    waterHeight:    20,
    timeOfDay:      0.5,
    useEstateSun:   true,
    cloudDensity:   0.5,
  };
}

/**
 * Interpolate two WindlightSettings linearly.
 * Useful for day/night cycle blending.
 */
export function lerpWindlightSettings(a: WindlightSettings, b: WindlightSettings, t: number): WindlightSettings {
  const lerp3 = (ca: { r: number; g: number; b: number }, cb: { r: number; g: number; b: number }) => ({
    r: ca.r + (cb.r - ca.r) * t,
    g: ca.g + (cb.g - ca.g) * t,
    b: ca.b + (cb.b - ca.b) * t,
  });
  const lerpV3 = (ca: { x: number; y: number; z: number }, cb: { x: number; y: number; z: number }) => ({
    x: ca.x + (cb.x - ca.x) * t,
    y: ca.y + (cb.y - ca.y) * t,
    z: ca.z + (cb.z - ca.z) * t,
  });
  return {
    skyTopColor:    lerp3(a.skyTopColor, b.skyTopColor),
    skyMidColor:    lerp3(a.skyMidColor, b.skyMidColor),
    skyBottomColor: lerp3(a.skyBottomColor, b.skyBottomColor),
    sunDirection:   lerpV3(a.sunDirection, b.sunDirection),
    sunColor:       lerp3(a.sunColor, b.sunColor),
    sunIntensity:   a.sunIntensity + (b.sunIntensity - a.sunIntensity) * t,
    moonDirection:  lerpV3(a.moonDirection, b.moonDirection),
    moonColor:      lerp3(a.moonColor, b.moonColor),
    moonIntensity:  a.moonIntensity + (b.moonIntensity - a.moonIntensity) * t,
    fogColor:       lerp3(a.fogColor, b.fogColor),
    fogNear:        a.fogNear + (b.fogNear - a.fogNear) * t,
    fogFar:         a.fogFar + (b.fogFar - a.fogFar) * t,
    ambientColor:   lerp3(a.ambientColor, b.ambientColor),
    ambientIntensity: a.ambientIntensity + (b.ambientIntensity - a.ambientIntensity) * t,
    hemiSkyColor:   lerp3(a.hemiSkyColor, b.hemiSkyColor),
    hemiGroundColor:lerp3(a.hemiGroundColor, b.hemiGroundColor),
    hemiIntensity:  a.hemiIntensity + (b.hemiIntensity - a.hemiIntensity) * t,
    waterColor:     lerp3(a.waterColor, b.waterColor),
    waterOpacity:   a.waterOpacity + (b.waterOpacity - a.waterOpacity) * t,
    waterHeight:    a.waterHeight + (b.waterHeight - a.waterHeight) * t,
    timeOfDay:      a.timeOfDay + (b.timeOfDay - a.timeOfDay) * t,
    useEstateSun:   b.useEstateSun,
    cloudDensity:   a.cloudDensity + (b.cloudDensity - a.cloudDensity) * t,
  };
}

// ── Sky Preset ───────────────────────────────────────────────────────

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

// ── Environment class ────────────────────────────────────────────────

/**
 * Environment system for I-Grid viewer.
 * Sky gradient shader, day/night cycle, PBR water, fog, moon.
 * Enhanced with sun disc, sun glow/halo, horizon glow, and moon disc.
 * Supports sky presets and WindlightSettings from server.
 */
export class Environment {
  public scene: THREE.Scene;
  private sunLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private hemiLight: THREE.HemisphereLight;
  private water: THREE.Mesh;
  private skyDome: THREE.Mesh;
  private moonLight: THREE.DirectionalLight;
  private moonDisc: THREE.Mesh;
  private timeOfDay = 0.5;
  private currentPreset: string = 'day';
  private currentWindlight: WindlightSettings;

  // Day/night cycle support (item 1.1b)
  private dayNightEnabled = false;
  private dayNightSpeed = 1.0;       // full cycle per hour
  private dayNightAccumulator = 0;

  // Draw distance for fog sync
  private drawDistance = 1500;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.currentWindlight = defaultWindlightSettings();

    // ── Sky dome with gradient shader (sun disc, glow, halo, horizon glow, moon) ──
    const skyGeo = new THREE.SphereGeometry(4000, 32, 16);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor:      { value: new THREE.Color(0x0077ff) },
        midColor:      { value: new THREE.Color(0x87ceeb) },
        bottomColor:   { value: new THREE.Color(0xffffff) },
        sunDirection:  { value: new THREE.Vector3(0.5, 0.9, 0.5).normalize() },
        sunIntensity:  { value: 1.0 },
        sunColor:      { value: new THREE.Color(1.0, 0.957, 0.878) },
        moonDirection: { value: new THREE.Vector3(-0.3, 0.8, -0.5).normalize() },
        moonIntensity: { value: 0.0 },
        moonColor:     { value: new THREE.Color(0.69, 0.73, 0.87) },
        fogColor:      { value: new THREE.Color(0x87ceeb) },
        horizonGlow:   { value: 1.0 },
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
        uniform vec3 sunColor;
        uniform vec3 moonDirection;
        uniform float moonIntensity;
        uniform vec3 moonColor;
        uniform vec3 fogColor;
        uniform float horizonGlow;
        varying vec3 vWorldPosition;

        void main() {
          vec3 dir = normalize(vWorldPosition);

          // ---- 3-stop sky gradient (zenith → mid → horizon) ----
          float h = dir.y;
          float horizonBlend = smoothstep(-0.1, 0.3, h);
          float upperBlend = smoothstep(0.3, 1.0, h);

          vec3 skyColor = mix(midColor, topColor, upperBlend);
          skyColor = mix(bottomColor, skyColor, horizonBlend);

          // ---- Sun disc ----
          float sunDot = dot(dir, sunDirection);
          float sunDisc = smoothstep(0.9995, 0.9998, sunDot);
          skyColor += sunColor * sunDisc * 2.0 * sunIntensity;

          // ---- Sun glow / halo ----
          float glow = pow(max(sunDot, 0.0), 64.0);
          skyColor += sunColor * glow * 0.6 * sunIntensity;

          float halo = pow(max(sunDot, 0.0), 8.0);
          skyColor += vec3(1.0, 0.9, 0.7) * halo * 0.25 * sunIntensity;

          // ---- Horizon glow (warm orange, strongest when sun is low) ----
          float horizonFactor = exp(-abs(h) * 6.0);
          float sunNearHorizon = 1.0 - abs(sunDirection.y);
          vec3 horizonGlowColor = vec3(1.0, 0.55, 0.15);
          skyColor += horizonGlowColor * horizonFactor * sunNearHorizon * 0.5 * sunIntensity * horizonGlow;

          // ---- Moon disc (soft glow) ----
          float moonDot = dot(dir, moonDirection);
          float moonDisc = smoothstep(0.998, 0.9995, moonDot);
          skyColor += moonColor * moonDisc * 1.5 * moonIntensity;
          float moonHalo = pow(max(moonDot, 0.0), 32.0);
          skyColor += moonColor * moonHalo * 0.3 * moonIntensity;

          // ---- Horizon fog blend ----
          float fogBlend = smoothstep(-0.05, 0.0, h);
          skyColor = mix(skyColor, fogColor, fogBlend * 0.3);

          gl_FragColor = vec4(skyColor, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });
    this.skyDome = new THREE.Mesh(skyGeo, skyMat);
    scene.add(this.skyDome);

    // ── Lighting ──
    this.sunLight = new THREE.DirectionalLight(0xfff4e0, 1.5);
    this.sunLight.position.set(100, 200, 100);
    scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight(0x606080, 0.8);
    scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x362907, 0.4);
    scene.add(this.hemiLight);

    // Moon light (subtle, for nighttime)
    this.moonLight = new THREE.DirectionalLight(0xaabbdd, 0.0);
    this.moonLight.position.set(-100, 200, -100);
    scene.add(this.moonLight);

    // Moon visual disc in the sky dome (billboard-like, small sphere)
    const moonGeo = new THREE.SphereGeometry(30, 16, 16);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xaabbdd });
    this.moonDisc = new THREE.Mesh(moonGeo, moonMat);
    this.moonDisc.visible = false;
    scene.add(this.moonDisc);

    // ── PBR Water ──
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

    // ── Fog ──
    scene.fog = new THREE.Fog(0x87ceeb, 200, 1500);

    this.setTimeOfDay(0.5);
  }

  // ══════════════════════════════════════════════════════════════════
  //  WindlightSettings API (server-driven environment)
  // ══════════════════════════════════════════════════════════════════

  /**
   * Apply WindlightSettings received from the server.
   * This is the primary method for server-driven environment control.
   */
  applyWindlightSettings(settings: WindlightSettings): void {
    this.currentWindlight = settings;

    // ── Sky shader uniforms ──
    const skyMat = this.skyDome.material as THREE.ShaderMaterial;
    skyMat.uniforms.topColor.value.copy(vec3ToColor(settings.skyTopColor));
    skyMat.uniforms.midColor.value.copy(vec3ToColor(settings.skyMidColor));
    skyMat.uniforms.bottomColor.value.copy(vec3ToColor(settings.skyBottomColor));
    skyMat.uniforms.sunDirection.value.set(
      settings.sunDirection.x,
      settings.sunDirection.y,
      settings.sunDirection.z,
    ).normalize();
    skyMat.uniforms.sunIntensity.value = settings.sunIntensity;
    skyMat.uniforms.sunColor.value.copy(vec3ToColor(settings.sunColor));
    skyMat.uniforms.moonDirection.value.set(
      settings.moonDirection.x,
      settings.moonDirection.y,
      settings.moonDirection.z,
    ).normalize();
    skyMat.uniforms.moonIntensity.value = settings.moonIntensity;
    skyMat.uniforms.moonColor.value.copy(vec3ToColor(settings.moonColor));

    // ── Sun light ──
    const sunDist = 300;
    this.sunLight.position.set(
      settings.sunDirection.x * sunDist,
      settings.sunDirection.y * sunDist,
      settings.sunDirection.z * sunDist,
    );
    this.sunLight.color.copy(vec3ToColor(settings.sunColor));
    this.sunLight.intensity = settings.sunIntensity;

    // ── Moon light + disc ──
    const moonDist = 300;
    this.moonLight.position.set(
      settings.moonDirection.x * moonDist,
      settings.moonDirection.y * moonDist,
      settings.moonDirection.z * moonDist,
    );
    this.moonLight.color.copy(vec3ToColor(settings.moonColor));
    this.moonLight.intensity = settings.moonIntensity;

    // Position moon disc in the sky
    const moonPos = new THREE.Vector3(
      settings.moonDirection.x,
      settings.moonDirection.y,
      settings.moonDirection.z,
    ).normalize().multiplyScalar(3900);
    this.moonDisc.position.copy(moonPos);
    this.moonDisc.visible = settings.moonIntensity > 0.01;

    // ── Ambient light ──
    this.ambientLight.color.copy(vec3ToColor(settings.ambientColor));
    this.ambientLight.intensity = settings.ambientIntensity;

    // ── Hemisphere light ──
    this.hemiLight.color.copy(vec3ToColor(settings.hemiSkyColor));
    this.hemiLight.groundColor.copy(vec3ToColor(settings.hemiGroundColor));
    this.hemiLight.intensity = settings.hemiIntensity;

    // ── Fog ──
    if (this.scene.fog) {
      const fog = this.scene.fog as THREE.Fog;
      fog.color.copy(vec3ToColor(settings.fogColor));
      // Scale fog near/far relative to draw distance
      const fogScale = this.drawDistance / 1500;
      fog.near = settings.fogNear * fogScale;
      fog.far = settings.fogFar * fogScale;
    }

    // ── Scene background (matches sky zenith) ──
    this.scene.background = vec3ToColor(settings.skyTopColor);

    // ── Water ──
    const waterMat = this.water.material as THREE.MeshStandardMaterial;
    waterMat.color.copy(vec3ToColor(settings.waterColor));
    waterMat.opacity = settings.waterOpacity;
    this.water.position.y = settings.waterHeight;

    this.timeOfDay = settings.timeOfDay;
    this.currentPreset = ''; // no longer on a named preset
  }

  /**
   * Get the current WindlightSettings (useful for serialization/caching).
   */
  getWindlightSettings(): WindlightSettings {
    return { ...this.currentWindlight };
  }

  // ══════════════════════════════════════════════════════════════════
  //  Draw distance / fog
  // ══════════════════════════════════════════════════════════════════

  /**
   * Update fog distances based on the viewer's draw distance slider.
   * Fog near = 80% of drawDistance, Fog far = 100% of drawDistance.
   */
  setDrawDistance(distance: number): void {
    this.drawDistance = distance;
    if (this.scene.fog) {
      const fog = this.scene.fog as THREE.Fog;
      fog.near = distance * 0.8;
      fog.far = distance * 2;
    }
  }

  // ══════════════════════════════════════════════════════════════════
  //  Day/Night Cycle (item 1.1b placeholder)
  // ══════════════════════════════════════════════════════════════════

  /**
   * Enable or disable automatic day/night cycle.
   * When enabled, timeOfDay advances automatically via update().
   */
  setDayNightCycle(enabled: boolean, speed: number = 1.0): void {
    this.dayNightEnabled = enabled;
    this.dayNightSpeed = speed;
    this.dayNightAccumulator = 0;
  }

  isDayNightCycleEnabled(): boolean {
    return this.dayNightEnabled;
  }

  // ══════════════════════════════════════════════════════════════════
  //  Preset API
  // ══════════════════════════════════════════════════════════════════

  /** Return the list of available preset key names (in display order). */
  getPresetNames(): string[] {
    return Object.keys(SKY_PRESETS);
  }

  /** Return the current preset key, or '' if using setTimeOfDay/applyWindlightSettings directly. */
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

    // Hide moon during preset (presets don't define moon)
    this.moonDisc.visible = false;
    this.moonLight.intensity = 0;

    // Store the time-of-day so setTimeOfDay can still pick up later
    this.timeOfDay = preset.timeOfDay;
  }

  // ══════════════════════════════════════════════════════════════════
  //  Original API (unchanged signature)
  // ══════════════════════════════════════════════════════════════════

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
    skyMat.uniforms.sunColor.value.copy(this.sunLight.color);

    // Sun visibility fades at night
    skyMat.uniforms.sunIntensity.value = Math.max(0, Math.sin(angle) * 1.5);

    // Moon: visible at night, opposite sun
    const moonIntensity = Math.max(0, -Math.sin(angle) * 0.5);
    skyMat.uniforms.moonIntensity.value = moonIntensity;
    const moonDir = new THREE.Vector3(-100, -sunY, -sunZ).normalize();
    skyMat.uniforms.moonDirection.value.copy(moonDir);
    this.moonLight.intensity = moonIntensity * 0.3;
    this.moonLight.position.copy(moonDir.clone().multiplyScalar(300));

    // Moon disc
    this.moonDisc.position.copy(moonDir.clone().multiplyScalar(3900));
    this.moonDisc.visible = moonIntensity > 0.01;

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

  update(delta: number) {
    // Water wave animation
    this.water.position.y = (this.currentWindlight?.waterHeight ?? 20)
      + Math.sin(Date.now() * 0.0005) * 0.5;

    // Day/night cycle advancement (item 1.1b)
    if (this.dayNightEnabled) {
      this.dayNightAccumulator += delta;
      const cycleDuration = 3600 / this.dayNightSpeed; // seconds per full cycle
      this.timeOfDay = (this.dayNightAccumulator % cycleDuration) / cycleDuration;
      this.setTimeOfDay(this.timeOfDay);
    }
  }
}

import * as THREE from 'three';

/**
 * SnapshotTools — Capture 3D scene and upload to TasiaFeed.
 * Supports camera angles, resolution options, and direct upload.
 */

export type SnapshotAngle = 'front' | 'back' | 'top' | 'custom';
export type SnapshotFormat = 'png' | 'jpeg' | 'webp';
export type SnapshotResolution = 'current' | '1280x720' | '1920x1080' | '2560x1440';

export interface SnapshotOptions {
  angle: SnapshotAngle;
  format: SnapshotFormat;
  quality: number; // 1-100
  resolution: SnapshotResolution;
  title: string;
  description: string;
  visibility: 'public' | 'unlisted';
  maturity: 'general' | 'moderate' | 'restricted';
}

export interface SnapshotResult {
  success: boolean;
  postUrl?: string;
  message?: string;
  imageData?: string;
}

export class SnapshotTools {
  private panel: HTMLDivElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private scene: THREE.Scene | null = null;
  private options: SnapshotOptions = {
    angle: 'custom',
    format: 'png',
    quality: 90,
    resolution: 'current',
    title: '',
    description: '',
    visibility: 'public',
    maturity: 'general',
  };
  private onCapture?: (imageData: string, options: SnapshotOptions) => void;
  private feedUrl = 'https://apps.easierit.org/igrid/feed/api/v1/snapshots/upload.php';

  constructor(callbacks?: {
    onCapture?: (imageData: string, options: SnapshotOptions) => void;
  }) {
    this.onCapture = callbacks?.onCapture;
  }

  /**
   * Set the Three.js objects needed for capture.
   */
  setRenderer(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, scene: THREE.Scene): void {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
  }

  toggle(): void {
    if (this.panel) this.hide(); else this.show();
  }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 380px; background: rgba(20, 20, 30, 0.95);
      border: 1px solid rgba(100, 150, 255, 0.3); border-radius: 10px;
      z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size: 14px; font-weight: 600;';
    title.textContent = '📸 Snapshot';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 18px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Form
    const form = document.createElement('div');
    form.style.cssText = 'padding: 12px 16px; display: flex; flex-direction: column; gap: 10px;';

    // Title
    form.appendChild(this.createInput('Title', 'text', this.options.title, (v) => this.options.title = v));

    // Description
    form.appendChild(this.createInput('Description', 'text', this.options.description, (v) => this.options.description = v));

    // Camera angle
    const angleRow = document.createElement('div');
    angleRow.style.cssText = 'display: flex; gap: 6px;';
    const angles: SnapshotAngle[] = ['front', 'back', 'top', 'custom'];
    for (const angle of angles) {
      const btn = document.createElement('button');
      btn.textContent = angle.charAt(0).toUpperCase() + angle.slice(1);
      btn.style.cssText = `
        flex: 1; padding: 5px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${angle === this.options.angle ? 'rgba(100,150,255,0.3)' : 'rgba(255,255,255,0.08)'};
        border: 1px solid ${angle === this.options.angle ? 'rgba(100,150,255,0.5)' : 'transparent'};
        color: ${angle === this.options.angle ? '#fff' : '#888'};
      `;
      btn.onclick = () => {
        this.options.angle = angle;
        this.refresh();
      };
      angleRow.appendChild(btn);
    }
    const angleLabel = document.createElement('div');
    angleLabel.style.cssText = 'font-size: 11px; color: #888; margin-bottom: 4px;';
    angleLabel.textContent = 'Camera Angle';
    form.appendChild(angleLabel);
    form.appendChild(angleRow);

    // Format
    const formatRow = document.createElement('div');
    formatRow.style.cssText = 'display: flex; gap: 6px;';
    const formats: SnapshotFormat[] = ['png', 'jpeg', 'webp'];
    for (const fmt of formats) {
      const btn = document.createElement('button');
      btn.textContent = fmt.toUpperCase();
      btn.style.cssText = `
        flex: 1; padding: 5px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${fmt === this.options.format ? 'rgba(100,150,255,0.3)' : 'rgba(255,255,255,0.08)'};
        border: 1px solid ${fmt === this.options.format ? 'rgba(100,150,255,0.5)' : 'transparent'};
        color: ${fmt === this.options.format ? '#fff' : '#888'};
      `;
      btn.onclick = () => {
        this.options.format = fmt;
        this.refresh();
      };
      formatRow.appendChild(btn);
    }
    const fmtLabel = document.createElement('div');
    fmtLabel.style.cssText = 'font-size: 11px; color: #888; margin-bottom: 4px;';
    fmtLabel.textContent = 'Format';
    form.appendChild(fmtLabel);
    form.appendChild(formatRow);

    // Visibility
    const visRow = document.createElement('div');
    visRow.style.cssText = 'display: flex; gap: 6px;';
    for (const vis of ['public', 'unlisted'] as const) {
      const btn = document.createElement('button');
      btn.textContent = vis === 'public' ? '🌍 Public' : '🔗 Unlisted';
      btn.style.cssText = `
        flex: 1; padding: 5px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${vis === this.options.visibility ? 'rgba(100,150,255,0.3)' : 'rgba(255,255,255,0.08)'};
        border: 1px solid ${vis === this.options.visibility ? 'rgba(100,150,255,0.5)' : 'transparent'};
        color: ${vis === this.options.visibility ? '#fff' : '#888'};
      `;
      btn.onclick = () => {
        this.options.visibility = vis;
        this.refresh();
      };
      visRow.appendChild(btn);
    }
    const visLabel = document.createElement('div');
    visLabel.style.cssText = 'font-size: 11px; color: #888; margin-bottom: 4px;';
    visLabel.textContent = 'Visibility';
    form.appendChild(visLabel);
    form.appendChild(visRow);

    this.panel.appendChild(form);

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = 'padding: 10px 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px; justify-content: flex-end;';

    const captureBtn = document.createElement('button');
    captureBtn.textContent = '📸 Capture & Upload';
    captureBtn.style.cssText = 'padding: 8px 18px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5); border-radius: 4px; color: #fff; cursor: pointer; font-size: 13px; font-weight: 500;';
    captureBtn.onclick = () => this.capture();
    footer.appendChild(captureBtn);

    this.panel.appendChild(footer);
    document.body.appendChild(this.panel);
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  private createInput(label: string, type: string, value: string, onChange: (v: string) => void): HTMLDivElement {
    const row = document.createElement('div');

    const lbl = document.createElement('div');
    lbl.style.cssText = 'font-size: 11px; color: #888; margin-bottom: 4px;';
    lbl.textContent = label;
    row.appendChild(lbl);

    const input = document.createElement('input');
    input.type = type;
    input.value = value;
    input.style.cssText = `
      width: 100%; padding: 6px 10px; background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
      color: #fff; font-size: 12px; outline: none; box-sizing: border-box;
    `;
    input.oninput = () => onChange(input.value);
    row.appendChild(input);

    return row;
  }

  private async capture(): Promise<void> {
    if (!this.renderer || !this.camera || !this.scene) {
      alert('3D renderer not initialized');
      return;
    }

    // Apply camera angle
    this.applyCameraAngle();

    // Render one frame
    this.renderer.render(this.scene, this.camera);

    // Capture
    const mimeType = this.options.format === 'jpeg' ? 'image/jpeg' : this.options.format === 'webp' ? 'image/webp' : 'image/png';
    const dataUrl = this.renderer.domElement.toDataURL(mimeType, this.options.quality / 100);

    this.onCapture?.(dataUrl, this.options);
  }

  private applyCameraAngle(): void {
    if (!this.camera) return;

    // Save current position
    const savedPos = this.camera.position.clone();
    const savedLookAt = new THREE.Vector3();
    this.camera.getWorldDirection(savedLookAt);

    switch (this.options.angle) {
      case 'front':
        this.camera.position.set(0, 2, 10);
        this.camera.lookAt(0, 1, 0);
        break;
      case 'back':
        this.camera.position.set(0, 2, -10);
        this.camera.lookAt(0, 1, 0);
        break;
      case 'top':
        this.camera.position.set(0, 15, 0);
        this.camera.lookAt(0, 0, 0);
        break;
      // 'custom' keeps current position
    }
  }

  /**
   * Upload snapshot to TasiaFeed.
   */
  async uploadToFeed(imageData: string, options: SnapshotOptions, metadata: {
    avatarName: string;
    gridName: string;
    regionName: string;
    position: string;
  }): Promise<SnapshotResult> {
    try {
      const body = {
        image: imageData,
        title: options.title || 'Untitled Snapshot',
        description: options.description,
        visibility: options.visibility,
        maturity: options.maturity,
        avatar_name: metadata.avatarName,
        grid_name: metadata.gridName,
        region_name: metadata.regionName,
        position: metadata.position,
        viewer_ver: 'I-Grid Viewer v2.0',
      };

      const response = await fetch(this.feedUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      return {
        success: result.success || false,
        postUrl: result.post_url,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  private refresh(): void {
    if (this.panel) {
      this.hide();
      this.show();
    }
  }

  dispose(): void {
    this.hide();
  }
}

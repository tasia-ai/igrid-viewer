import * as THREE from 'three';

/**
 * Renders a top-down minimap of terrain patches onto a 2D canvas.
 * Each terrain patch is drawn as a small colored square in the minimap.
 */
export class MinimapRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private patches: Map<string, Float32Array> = new Map();
  private scale = 0.15; // pixels per meter
  private centerX = 90;
  private centerY = 90;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  /**
   * Update a terrain patch on the minimap.
   */
  updatePatch(patchX: number, patchY: number, heights: Float32Array | number[]): void {
    const key = `${patchX},${patchY}`;
    const arr = heights instanceof Float32Array ? heights : new Float32Array(heights);
    this.patches.set(key, arr);
    this.render();
  }

  /**
   * Set the player position marker on the minimap.
   */
  setPlayerPosition(x: number, y: number): void {
    this.centerX = 90 - x * this.scale;
    this.centerY = 90 - y * this.scale;
    this.render();
  }

  private render(): void {
    const ctx = this.ctx;
    const patchSize = 256;
    const pixelPerPatch = patchSize * this.scale;

    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 180, 180);

    for (const [key, heights] of this.patches) {
      const [px, py] = key.split(',').map(Number);
      const screenX = px * pixelPerPatch + this.centerX;
      const screenY = py * pixelPerPatch + this.centerY;

      // Draw each height sample as a small pixel
      const sampleStep = 4; // sample every 4th height for performance
      const samplePixelSize = pixelPerPatch / (16 / sampleStep);

      for (let iy = 0; iy < 16; iy += sampleStep) {
        for (let ix = 0; ix < 16; ix += sampleStep) {
          const height = heights[iy * 16 + ix] ?? 0;
          const normalizedHeight = Math.min(Math.max(height / 60, 0), 1);

          const r = Math.floor(30 + normalizedHeight * 50);
          const g = Math.floor(60 + normalizedHeight * 120);
          const b = Math.floor(20 + normalizedHeight * 30);

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(
            screenX + ix * samplePixelSize,
            screenY + iy * samplePixelSize,
            samplePixelSize + 0.5,
            samplePixelSize + 0.5
          );
        }
      }
    }

    // Draw player marker
    ctx.fillStyle = '#4fc3f7';
    ctx.beginPath();
    ctx.arc(90, 90, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw marker border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(90, 90, 3, 0, Math.PI * 2);
    ctx.stroke();
  }
}

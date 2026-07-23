/**
 * WorldMap — Full world map with region grid, parcel overlays, and teleport.
 */

export interface RegionInfo {
  id: string;
  name: string;
  x: number;
  y: number;
  access: 'open' | 'offline' | 'locked';
  owner?: string;
}

export interface MapParcel {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  forSale: boolean;
  salePrice?: number;
  color: string;
}

export class WorldMap {
  private panel: HTMLDivElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private regions: RegionInfo[] = [];
  private parcels: MapParcel[] = [];
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private isDragging = false;
  private lastMouse = { x: 0, y: 0 };
  private onTeleport?: (regionId: string, x: number, y: number) => void;

  constructor(callbacks?: {
    onTeleport?: (regionId: string, x: number, y: number) => void;
  }) {
    this.onTeleport = callbacks?.onTeleport;
  }

  toggle(): void {
    if (this.panel) this.hide(); else this.show();
  }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 700px; height: 500px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 10px; z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size: 14px; font-weight: 600;';
    title.textContent = '🗺️ World Map';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 18px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 680;
    this.canvas.height = 420;
    this.canvas.style.cssText = 'flex: 1; cursor: grab; background: #0a0a12;';
    this.ctx = this.canvas.getContext('2d');

    // Mouse events for pan/zoom
    this.canvas.onmousedown = (e) => {
      this.isDragging = true;
      this.lastMouse = { x: e.clientX, y: e.clientY };
      this.canvas!.style.cursor = 'grabbing';
    };
    this.canvas.onmousemove = (e) => {
      if (this.isDragging) {
        this.offsetX += e.clientX - this.lastMouse.x;
        this.offsetY += e.clientY - this.lastMouse.y;
        this.lastMouse = { x: e.clientX, y: e.clientY };
        this.draw();
      }
    };
    this.canvas.onmouseup = () => {
      this.isDragging = false;
      this.canvas!.style.cursor = 'grab';
    };
    this.canvas.onmouseleave = () => {
      this.isDragging = false;
      this.canvas!.style.cursor = 'grab';
    };
    this.canvas.onwheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      this.scale = Math.max(0.3, Math.min(5, this.scale * zoomFactor));
      this.draw();
    };
    this.canvas.onclick = (e) => {
      if (!this.isDragging) this.handleClick(e);
    };

    this.panel.appendChild(this.canvas);

    // Status bar
    const status = document.createElement('div');
    status.style.cssText = 'padding: 6px 16px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #666;';
    status.textContent = `${this.regions.length} regions | Scroll to zoom, drag to pan, click to teleport`;
    this.panel.appendChild(status);

    document.body.appendChild(this.panel);
    // Don't draw in constructor — defer until first show
    requestAnimationFrame(() => this.draw());
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  /**
   * Update region data.
   */
  setRegions(regions: RegionInfo[]): void {
    this.regions = regions;
    this.draw();
  }

  /**
   * Update parcel overlays.
   */
  setParcels(parcels: MapParcel[]): void {
    this.parcels = parcels;
    this.draw();
  }

  private draw(): void {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w / 2 + this.offsetX, h / 2 + this.offsetY);
    ctx.scale(this.scale, this.scale);

    // Draw grid
    const gridSize = 256;
    const gridRange = 50;

    ctx.strokeStyle = 'rgba(40, 40, 60, 0.5)';
    ctx.lineWidth = 0.5 / this.scale;

    for (let x = -gridRange; x <= gridRange; x++) {
      ctx.beginPath();
      ctx.moveTo(x * gridSize, -gridRange * gridSize);
      ctx.lineTo(x * gridSize, gridRange * gridSize);
      ctx.stroke();
    }
    for (let y = -gridRange; y <= gridRange; y++) {
      ctx.beginPath();
      ctx.moveTo(-gridRange * gridSize, y * gridSize);
      ctx.lineTo(gridRange * gridSize, y * gridSize);
      ctx.stroke();
    }

    // Draw parcel overlays
    for (const parcel of this.parcels) {
      ctx.fillStyle = parcel.color || 'rgba(100, 150, 255, 0.2)';
      ctx.fillRect(parcel.x * gridSize, parcel.y * gridSize, parcel.width * gridSize, parcel.height * gridSize);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.strokeRect(parcel.x * gridSize, parcel.y * gridSize, parcel.width * gridSize, parcel.height * gridSize);
    }

    // Draw regions
    for (const region of this.regions) {
      const rx = region.x * gridSize;
      const ry = region.y * gridSize;

      if (region.access === 'offline') {
        ctx.fillStyle = 'rgba(80, 40, 40, 0.6)';
      } else if (region.access === 'locked') {
        ctx.fillStyle = 'rgba(120, 100, 40, 0.6)';
      } else {
        ctx.fillStyle = 'rgba(40, 80, 40, 0.6)';
      }
      ctx.fillRect(rx + 1, ry + 1, gridSize - 2, gridSize - 2);

      ctx.strokeStyle = region.access === 'offline' ? '#663333' : '#336633';
      ctx.lineWidth = 1 / this.scale;
      ctx.strokeRect(rx + 1, ry + 1, gridSize - 2, gridSize - 2);

      // Region name
      if (this.scale > 0.6) {
        ctx.fillStyle = '#ccc';
        ctx.font = `${Math.max(8, 12 / this.scale)}px Segoe UI`;
        ctx.textAlign = 'center';
        ctx.fillText(region.name, rx + gridSize / 2, ry + gridSize / 2 + 4);
      }
    }

    ctx.restore();
  }

  private handleClick(e: MouseEvent): void {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    // Convert to world coordinates
    const worldX = (canvasX - this.canvas.width / 2 - this.offsetX) / this.scale;
    const worldY = (canvasY - this.canvas.height / 2 - this.offsetY) / this.scale;

    const gridSize = 256;
    const gridX = Math.floor(worldX / gridSize);
    const gridY = Math.floor(worldY / gridSize);

    const region = this.regions.find(r => r.x === gridX && r.y === gridY);
    if (region && region.access !== 'offline') {
      this.onTeleport?.(region.id, gridX * gridSize, gridY * gridSize);
    }
  }

  dispose(): void {
    this.hide();
  }
}

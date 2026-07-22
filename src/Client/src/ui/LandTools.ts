/**
 * LandTools — UI for land/parcel management.
 * Shows parcel info, buy/sell options, access controls, and terrain editing.
 */

export interface ParcelInfo {
  id: string;
  name: string;
  description?: string;
  area: number;
  salePrice: number;
  forSale: boolean;
  ownerName?: string;
  ownerId?: string;
  groupOwned?: boolean;
  traffic?: number;
  prims?: number;
  maxPrims?: number;
  accessList?: { name: string; type: 'allow' | 'ban' }[];
  musicUrl?: string;
  mediaUrl?: string;
}

export type LandAction = 'buy' | 'sell' | 'subdivide' | 'join' | 'setHome' | 'terraform' | 'access' | 'ban';

export class LandTools {
  private panel: HTMLDivElement | null = null;
  private parcelInfo: ParcelInfo | null = null;
  private terraformMode = false;
  private brushSize = 4;
  private brushStrength = 0.5;
  private onAction?: (action: LandAction, data?: any) => void;

  constructor(callbacks?: {
    onAction?: (action: LandAction, data?: any) => void;
  }) {
    this.onAction = callbacks?.onAction;
  }

  toggle(): void {
    if (this.panel) this.hide(); else this.show();
  }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; left: 20px; bottom: 20px; width: 340px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px; z-index: 9999; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);
    `;

    this.refresh();
    document.body.appendChild(this.panel);
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  /**
   * Update parcel info from server.
   */
  updateParcelInfo(info: ParcelInfo): void {
    this.parcelInfo = info;
    this.refresh();
  }

  /**
   * Toggle terraform mode.
   */
  toggleTerraform(): void {
    this.terraformMode = !this.terraformMode;
    this.onAction?.('terraform', { enabled: this.terraformMode, brushSize: this.brushSize, strength: this.brushStrength });
    this.refresh();
  }

  private refresh(): void {
    if (!this.panel) return;
    this.panel.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size: 13px; font-weight: 600;';
    title.textContent = '🏠 Land Tools';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 16px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Parcel info
    if (this.parcelInfo) {
      const infoDiv = document.createElement('div');
      infoDiv.style.cssText = 'padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.05);';

      const nameRow = document.createElement('div');
      nameRow.style.cssText = 'font-size: 13px; font-weight: 500; margin-bottom: 4px;';
      nameRow.textContent = this.parcelInfo.name || 'Unnamed Parcel';
      infoDiv.appendChild(nameRow);

      if (this.parcelInfo.ownerName) {
        const owner = document.createElement('div');
        owner.style.cssText = 'font-size: 11px; color: #888;';
        owner.textContent = `Owner: ${this.parcelInfo.ownerName}`;
        infoDiv.appendChild(owner);
      }

      const stats = document.createElement('div');
      stats.style.cssText = 'font-size: 11px; color: #666; margin-top: 4px;';
      stats.textContent = `Area: ${this.parcelInfo.area}m² | Prims: ${this.parcelInfo.prims || 0}/${this.parcelInfo.maxPrims || 0}`;
      infoDiv.appendChild(stats);

      if (this.parcelInfo.forSale) {
        const sale = document.createElement('div');
        sale.style.cssText = 'font-size: 11px; color: #4CAF50; margin-top: 4px;';
        sale.textContent = `For Sale: $${this.parcelInfo.salePrice}`;
        infoDiv.appendChild(sale);
      }

      this.panel.appendChild(infoDiv);
    }

    // Actions
    const actions = document.createElement('div');
    actions.style.cssText = 'padding: 10px 14px; display: flex; flex-wrap: wrap; gap: 6px;';

    const buttons = [
      { label: '🗺️ Buy', action: 'buy' as LandAction, disabled: !this.parcelInfo?.forSale },
      { label: '💰 Sell', action: 'sell' as LandAction },
      { label: '✂️ Subdivide', action: 'subdivide' as LandAction },
      { label: '🔗 Join', action: 'join' as LandAction },
      { label: '📍 Set Home', action: 'setHome' as LandAction },
      { label: '⛰️ Terraform', action: 'terraform' as LandAction, active: this.terraformMode },
      { label: '👥 Access', action: 'access' as LandAction },
      { label: '🚫 Ban', action: 'ban' as LandAction },
    ];

    for (const btn of buttons) {
      const el = document.createElement('button');
      el.textContent = btn.label;
      el.style.cssText = `
        padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${btn.active ? 'rgba(100,150,255,0.3)' : 'rgba(255,255,255,0.08)'};
        border: 1px solid ${btn.active ? 'rgba(100,150,255,0.5)' : 'rgba(255,255,255,0.15)'};
        color: ${btn.disabled ? '#555' : '#ccc'};
        ${btn.disabled ? 'cursor: not-allowed;' : ''}
      `;
      if (!btn.disabled) {
        el.onclick = () => {
          if (btn.action === 'terraform') {
            this.toggleTerraform();
          } else {
            this.onAction?.(btn.action);
          }
        };
      }
      actions.appendChild(el);
    }
    this.panel.appendChild(actions);

    // Terraform controls (if active)
    if (this.terraformMode) {
      const terraform = document.createElement('div');
      terraform.style.cssText = 'padding: 10px 14px; border-top: 1px solid rgba(255,255,255,0.1);';

      const brushLabel = document.createElement('div');
      brushLabel.style.cssText = 'font-size: 11px; color: #888; margin-bottom: 4px;';
      brushLabel.textContent = `Brush Size: ${this.brushSize}`;
      terraform.appendChild(brushLabel);

      const brushSlider = document.createElement('input');
      brushSlider.type = 'range';
      brushSlider.min = '1';
      brushSlider.max = '16';
      brushSlider.value = String(this.brushSize);
      brushSlider.style.cssText = 'width: 100%; height: 4px; -webkit-appearance: none; appearance: none; background: rgba(255,255,255,0.15); border-radius: 2px;';
      brushSlider.oninput = () => {
        this.brushSize = Number(brushSlider.value);
        brushLabel.textContent = `Brush Size: ${this.brushSize}`;
      };
      terraform.appendChild(brushSlider);

      const strengthLabel = document.createElement('div');
      strengthLabel.style.cssText = 'font-size: 11px; color: #888; margin-top: 8px; margin-bottom: 4px;';
      strengthLabel.textContent = `Strength: ${(this.brushStrength * 100).toFixed(0)}%`;
      terraform.appendChild(strengthLabel);

      const strengthSlider = document.createElement('input');
      strengthSlider.type = 'range';
      strengthSlider.min = '0';
      strengthSlider.max = '100';
      strengthSlider.value = String(this.brushStrength * 100);
      strengthSlider.style.cssText = 'width: 100%; height: 4px; -webkit-appearance: none; appearance: none; background: rgba(255,255,255,0.15); border-radius: 2px;';
      strengthSlider.oninput = () => {
        this.brushStrength = Number(strengthSlider.value) / 100;
        strengthLabel.textContent = `Strength: ${(this.brushStrength * 100).toFixed(0)}%`;
      };
      terraform.appendChild(strengthSlider);

      this.panel.appendChild(terraform);
    }
  }

  dispose(): void {
    this.hide();
  }
}

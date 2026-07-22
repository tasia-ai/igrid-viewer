/**
 * AppearanceEditor — UI for editing avatar appearance.
 * Shows wearable slots, visual param sliders, and bake button.
 */

export interface WearableSlot {
  type: string; // Shape, Skin, Hair, Eyes, Shirt, Pants, etc.
  name: string;
  itemId?: string;
  assetId?: string;
  isDirty: boolean;
}

export interface VisualParam {
  id: number;
  name: string;
  label: string;
  group: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  currentValue: number;
}

export class AppearanceEditor {
  private panel: HTMLDivElement | null = null;
  private wearables: WearableSlot[] = [
    { type: 'Shape', name: 'Shape', isDirty: false },
    { type: 'Skin', name: 'Skin', isDirty: false },
    { type: 'Hair', name: 'Hair', isDirty: false },
    { type: 'Eyes', name: 'Eyes', isDirty: false },
    { type: 'Shirt', name: 'Shirt', isDirty: false },
    { type: 'Pants', name: 'Pants', isDirty: false },
    { type: 'Shoes', name: 'Shoes', isDirty: false },
    { type: 'Socks', name: 'Socks', isDirty: false },
    { type: 'Jacket', name: 'Jacket', isDirty: false },
    { type: 'Skirt', name: 'Skirt', isDirty: false },
    { type: 'Gloves', name: 'Gloves', isDirty: false },
    { type: 'Undershirt', name: 'Undershirt', isDirty: false },
    { type: 'Underpants', name: 'Underpants', isDirty: false },
    { type: 'Avatar', name: 'Skin Texture', isDirty: false },
  ];

  private visualParams: VisualParam[] = [
    // Body shape params (common SL visual params)
    { id: 3, name: 'HEAD_SIZE', label: 'Head Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 6, name: 'NECK_LENGTH', label: 'Neck Length', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 7, name: 'NECK_THICKNESS', label: 'Neck Thickness', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 9, name: 'TORSO_LENGTH', label: 'Torso Length', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 10, name: 'TORSO_MUSCLES', label: 'Torso Muscles', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 11, name: 'BELLY_SIZE', label: 'Belly Size', group: 'Shape', defaultValue: 0, minValue: 0, maxValue: 100, currentValue: 0 },
    { id: 12, name: 'HIPS_SIZE', label: 'Hip Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 13, name: 'LEG_LENGTH', label: 'Leg Length', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 14, name: 'LEG_MUSCLES', label: 'Leg Muscles', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 15, name: 'ARM_LENGTH', label: 'Arm Length', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 16, name: 'ARM_MUSCLES', label: 'Arm Muscles', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 17, name: 'ARM_THICKNESS', label: 'Arm Thickness', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 18, name: 'HAND_SIZE', label: 'Hand Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 19, name: 'FOOT_SIZE', label: 'Foot Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 20, name: 'BREAST_SIZE', label: 'Breast Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 21, name: 'BREAST_GRAVITY', label: 'Breast Gravity', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 23, name: 'HIP_WIDTH', label: 'Hip Width', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 24, name: 'BUTT_SIZE', label: 'Butt Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 25, name: 'JAW_ANGLE', label: 'Jaw Angle', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 26, name: 'JAW_SHAPE', label: 'Jaw Shape', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 27, name: 'CHIN_LENGTH', label: 'Chin Length', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 28, name: 'CHIN_SHAPE', label: 'Chin Shape', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 29, name: 'EYE_SIZE', label: 'Eye Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 30, name: 'EYE_SPACING', label: 'Eye Spacing', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 33, name: 'NOSE_SIZE', label: 'Nose Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 34, name: 'NOSE_WIDTH', label: 'Nose Width', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 35, name: 'NOSE_HEIGHT', label: 'Nose Height', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 36, name: 'LIP_SIZE', label: 'Lip Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 37, name: 'LIP_THICKNESS', label: 'Lip Thickness', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 38, name: 'EAR_SIZE', label: 'Ear Size', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 39, name: 'EAR_FLAP', label: 'Ear Flap', group: 'Shape', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 40, name: 'HAIR_VOLUMNE', label: 'Hair Volume', group: 'Hair', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
    { id: 41, name: 'HAIR_BRIGHTNESS', label: 'Hair Brightness', group: 'Hair', defaultValue: 50, minValue: 0, maxValue: 100, currentValue: 50 },
  ];

  private currentGroup: string = 'Shape';
  private onParamChange?: (paramId: number, value: number) => void;
  private onBake?: () => void;

  constructor(callbacks?: {
    onParamChange?: (paramId: number, value: number) => void;
    onBake?: () => void;
  }) {
    this.onParamChange = callbacks?.onParamChange;
    this.onBake = callbacks?.onBake;
  }

  toggle(): void {
    if (this.panel) this.hide(); else this.show();
  }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 600px; max-height: 80vh; background: rgba(20, 20, 30, 0.95);
      border: 1px solid rgba(100, 150, 255, 0.3); border-radius: 10px;
      z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size: 16px; font-weight: 600;';
    title.textContent = '👗 Appearance Editor';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: #888; font-size: 20px; cursor: pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Content area with 2 columns
    const content = document.createElement('div');
    content.style.cssText = 'display: flex; flex: 1; overflow: hidden;';

    // Left: Wearable slots
    const leftPanel = document.createElement('div');
    leftPanel.style.cssText = 'width: 200px; border-right: 1px solid rgba(255,255,255,0.1); overflow-y: auto; padding: 8px 0;';

    const slotsTitle = document.createElement('div');
    slotsTitle.style.cssText = 'padding: 4px 12px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;';
    slotsTitle.textContent = 'Wearable Slots';
    leftPanel.appendChild(slotsTitle);

    for (const slot of this.wearables) {
      const row = document.createElement('div');
      row.style.cssText = `
        padding: 6px 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
        font-size: 12px; transition: background 0.15s;
      `;
      row.onmouseenter = () => row.style.background = 'rgba(255,255,255,0.05)';
      row.onmouseleave = () => row.style.background = 'transparent';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = slot.name;
      row.appendChild(nameSpan);

      if (slot.isDirty) {
        const dot = document.createElement('span');
        dot.style.cssText = 'width: 6px; height: 6px; border-radius: 50%; background: #f0ad4e;';
        row.appendChild(dot);
      }

      leftPanel.appendChild(row);
    }
    content.appendChild(leftPanel);

    // Right: Visual param sliders
    const rightPanel = document.createElement('div');
    rightPanel.style.cssText = 'flex: 1; overflow-y: auto; padding: 8px 16px;';

    // Group tabs
    const groupTabs = document.createElement('div');
    groupTabs.style.cssText = 'display: flex; gap: 4px; margin-bottom: 12px; flex-wrap: wrap;';
    const groups = [...new Set(this.visualParams.map(p => p.group))];
    for (const group of groups) {
      const tab = document.createElement('button');
      tab.textContent = group;
      tab.style.cssText = `
        padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${group === this.currentGroup ? 'rgba(100,150,255,0.3)' : 'rgba(255,255,255,0.08)'};
        border: 1px solid ${group === this.currentGroup ? 'rgba(100,150,255,0.5)' : 'transparent'};
        color: ${group === this.currentGroup ? '#fff' : '#888'};
      `;
      tab.onclick = () => {
        this.currentGroup = group;
        this.refresh();
      };
      groupTabs.appendChild(tab);
    }
    rightPanel.appendChild(groupTabs);

    // Param sliders
    const params = this.visualParams.filter(p => p.group === this.currentGroup);
    for (const param of params) {
      const row = document.createElement('div');
      row.style.cssText = 'margin-bottom: 10px;';

      const labelRow = document.createElement('div');
      labelRow.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 4px;';

      const label = document.createElement('span');
      label.style.cssText = 'font-size: 12px;';
      label.textContent = param.label;
      labelRow.appendChild(label);

      const valueLabel = document.createElement('span');
      valueLabel.style.cssText = 'font-size: 11px; color: #888; font-variant-numeric: tabular-nums;';
      valueLabel.textContent = param.currentValue.toFixed(0);
      labelRow.appendChild(valueLabel);

      row.appendChild(labelRow);

      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = String(param.minValue);
      slider.max = String(param.maxValue);
      slider.value = String(param.currentValue);
      slider.step = '1';
      slider.style.cssText = `
        width: 100%; height: 4px; -webkit-appearance: none; appearance: none;
        background: rgba(255,255,255,0.15); border-radius: 2px; outline: none;
      `;
      slider.oninput = () => {
        param.currentValue = Number(slider.value);
        valueLabel.textContent = param.currentValue.toFixed(0);
        this.onParamChange?.(param.id, param.currentValue);
      };
      row.appendChild(slider);

      rightPanel.appendChild(row);
    }
    content.appendChild(rightPanel);
    this.panel.appendChild(content);

    // Footer with bake button
    const footer = document.createElement('div');
    footer.style.cssText = 'padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;';

    const resetBtn = document.createElement('button');
    resetBtn.textContent = '↺ Reset';
    resetBtn.style.cssText = 'padding: 6px 14px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #ccc; cursor: pointer; font-size: 12px;';
    resetBtn.onclick = () => {
      for (const param of this.visualParams) {
        param.currentValue = param.defaultValue;
      }
      this.refresh();
    };
    footer.appendChild(resetBtn);

    const bakeBtn = document.createElement('button');
    bakeBtn.textContent = '✅ Bake & Save';
    bakeBtn.style.cssText = 'padding: 8px 20px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5); border-radius: 4px; color: #fff; cursor: pointer; font-size: 13px; font-weight: 500;';
    bakeBtn.onclick = () => this.onBake?.();
    footer.appendChild(bakeBtn);

    this.panel.appendChild(footer);
    document.body.appendChild(this.panel);
  }

  hide(): void {
    if (this.panel) { this.panel.remove(); this.panel = null; }
  }

  /**
   * Update a wearable slot.
   */
  updateWearable(type: string, itemId?: string, assetId?: string): void {
    const slot = this.wearables.find(s => s.type === type);
    if (slot) {
      slot.itemId = itemId;
      slot.assetId = assetId;
      this.refresh();
    }
  }

  /**
   * Update a visual param value from server.
   */
  updateParam(paramId: number, value: number): void {
    const param = this.visualParams.find(p => p.id === paramId);
    if (param) {
      param.currentValue = value;
      this.refresh();
    }
  }

  /**
   * Get current visual params as a map.
   */
  getVisualParams(): Record<number, number> {
    const result: Record<number, number> = {};
    for (const param of this.visualParams) {
      result[param.id] = param.currentValue;
    }
    return result;
  }

  refresh(): void {
    if (this.panel) {
      this.hide();
      this.show();
    }
  }

  dispose(): void {
    this.hide();
  }
}

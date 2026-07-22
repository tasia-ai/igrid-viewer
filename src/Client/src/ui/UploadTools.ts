/**
 * UploadTools — UI for uploading textures, sounds, animations, mesh.
 */

export type UploadType = 'texture' | 'sound' | 'animation' | 'mesh';

export interface UploadData {
  type: UploadType;
  name: string;
  file: File;
  description?: string;
}

export class UploadTools {
  private panel: HTMLDivElement | null = null;
  private onUpload?: (data: UploadData) => void;

  constructor(callbacks?: { onUpload?: (data: UploadData) => void }) {
    this.onUpload = callbacks?.onUpload;
  }

  toggle(): void { if (this.panel) this.hide(); else this.show(); }

  show(): void {
    if (this.panel) return;

    this.panel = document.createElement('div');
    this.panel.style.cssText = `
      position:fixed; left:50%; top:50%; transform:translate(-50%,-50%);
      width:400px; background:rgba(20,20,30,0.95);
      border:1px solid rgba(100,150,255,0.3); border-radius:10px;
      z-index:10000; font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 12px 48px rgba(0,0,0,0.6); backdrop-filter:blur(12px);
    `;

    const header = document.createElement('div');
    header.style.cssText = 'padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size:14px; font-weight:600;';
    title.textContent = '📤 Upload Asset';
    header.appendChild(title);
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none; border:none; color:#888; font-size:18px; cursor:pointer;';
    closeBtn.onclick = () => this.hide();
    header.appendChild(closeBtn);
    this.panel.appendChild(header);

    // Form body
    const form = document.createElement('div');
    form.style.cssText = 'padding:14px 16px; display:flex; flex-direction:column; gap:10px;';

    // Type selector
    const typeLabel = document.createElement('div');
    typeLabel.style.cssText = 'font-size:11px; color:#888; margin-bottom:2px;';
    typeLabel.textContent = 'Asset Type';
    form.appendChild(typeLabel);

    const typeRow = document.createElement('div');
    typeRow.style.cssText = 'display:flex; gap:6px;';
    const types: { key: UploadType; label: string }[] = [
      { key: 'texture', label: '🖼️ Texture' },
      { key: 'sound', label: '🔊 Sound' },
      { key: 'animation', label: '🎬 Anim' },
      { key: 'mesh', label: '🧊 Mesh' },
    ];
    let selectedType: UploadType = 'texture';
    const typeButtons: HTMLButtonElement[] = [];

    for (const t of types) {
      const btn = document.createElement('button');
      btn.textContent = t.label;
      btn.style.cssText = `
        flex:1; padding:6px; border-radius:4px; font-size:11px; cursor:pointer;
        background:${t.key === selectedType ? 'rgba(100,150,255,0.3)' : 'rgba(255,255,255,0.08)'};
        border:1px solid ${t.key === selectedType ? 'rgba(100,150,255,0.5)' : 'transparent'};
        color:${t.key === selectedType ? '#fff' : '#888'};
      `;
      btn.onclick = () => {
        selectedType = t.key;
        typeButtons.forEach(b => { b.style.background = 'rgba(255,255,255,0.08)'; b.style.borderColor = 'transparent'; b.style.color = '#888'; });
        btn.style.background = 'rgba(100,150,255,0.3)';
        btn.style.borderColor = 'rgba(100,150,255,0.5)';
        btn.style.color = '#fff';
      };
      typeButtons.push(btn);
      typeRow.appendChild(btn);
    }
    form.appendChild(typeRow);

    // Name input
    const nameLabel = document.createElement('div');
    nameLabel.style.cssText = 'font-size:11px; color:#888; margin-bottom:2px;';
    nameLabel.textContent = 'Name';
    form.appendChild(nameLabel);
    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Asset name...';
    nameInput.style.cssText = 'width:100%; padding:6px 10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff; font-size:12px; outline:none; box-sizing:border-box;';
    form.appendChild(nameInput);

    // Description
    const descLabel = document.createElement('div');
    descLabel.style.cssText = 'font-size:11px; color:#888; margin-bottom:2px; margin-top:4px;';
    descLabel.textContent = 'Description (optional)';
    form.appendChild(descLabel);
    const descInput = document.createElement('input');
    descInput.placeholder = 'Description...';
    descInput.style.cssText = 'width:100%; padding:6px 10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff; font-size:12px; outline:none; box-sizing:border-box;';
    form.appendChild(descInput);

    // File input
    const fileLabel = document.createElement('div');
    fileLabel.style.cssText = 'font-size:11px; color:#888; margin-bottom:2px; margin-top:4px;';
    fileLabel.textContent = 'File';
    form.appendChild(fileLabel);

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.png,.jpg,.jpeg,.bmp,.tga,.gif,.wav,.mp3,.ogg,.bvh,.dae,.obj,.fbx';
    fileInput.style.cssText = 'width:100%; font-size:12px; color:#aaa;';

    const fileDisplay = document.createElement('div');
    fileDisplay.style.cssText = 'padding:10px; border:2px dashed rgba(255,255,255,0.15); border-radius:6px; text-align:center; color:#666; font-size:12px; cursor:pointer;';
    fileDisplay.textContent = '📁 Click to select file or drag & drop';
    fileDisplay.onclick = () => fileInput.click();

    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const f = fileInput.files[0];
        fileDisplay.textContent = `📎 ${f.name} (${(f.size / 1024).toFixed(1)} KB)`;
        fileDisplay.style.color = '#ccc';
        if (!nameInput.value) nameInput.value = f.name.replace(/\.[^.]+$/, '');
      }
    };

    form.appendChild(fileInput);
    form.appendChild(fileDisplay);

    this.panel.appendChild(form);

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = 'padding:10px 16px; border-top:1px solid rgba(255,255,255,0.1); display:flex; justify-content:flex-end; gap:8px;';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = 'padding:6px 14px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:4px; color:#ccc; cursor:pointer; font-size:12px;';
    cancelBtn.onclick = () => this.hide();
    footer.appendChild(cancelBtn);

    const uploadBtn = document.createElement('button');
    uploadBtn.textContent = '📤 Upload';
    uploadBtn.style.cssText = 'padding:6px 14px; background:rgba(100,150,255,0.3); border:1px solid rgba(100,150,255,0.5); border-radius:4px; color:#fff; cursor:pointer; font-size:12px; font-weight:500;';
    uploadBtn.onclick = () => {
      if (fileInput.files && fileInput.files.length > 0 && nameInput.value) {
        this.onUpload?.({
          type: selectedType,
          name: nameInput.value,
          file: fileInput.files[0],
          description: descInput.value,
        });
        this.hide();
      }
    };
    footer.appendChild(uploadBtn);
    this.panel.appendChild(footer);

    document.body.appendChild(this.panel);
  }

  hide(): void { if (this.panel) { this.panel.remove(); this.panel = null; } }
  dispose(): void { this.hide(); }
}

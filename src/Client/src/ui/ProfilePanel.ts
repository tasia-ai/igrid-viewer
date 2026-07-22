/**
 * ProfilePanel — UI component for displaying avatar profile cards.
 * Shows name, title, account status, picks, groups, and profile image.
 */

export interface ProfileData {
  id: string;
  name: string;
  title?: string;
  accountStatus?: string;
  profileImage?: string;
  bio?: string;
  homeLocation?: string;
  online?: boolean;
  /** Timestamp of last login */
  lastLogin?: string;
}

/**
 * Creates and manages a floating profile card panel.
 */
export class ProfilePanel {
  private panel: HTMLDivElement | null = null;
  private currentProfile: ProfileData | null = null;

  /**
   * Show profile panel for an avatar.
   */
  show(profile: ProfileData, anchorX?: number, anchorY?: number): void {
    this.hide(); // Close any existing panel
    this.currentProfile = profile;

    this.panel = document.createElement('div');
    this.panel.className = 'profile-panel';
    this.panel.style.cssText = `
      position: fixed;
      top: ${anchorY ?? 100}px;
      left: ${anchorX ?? 100}px;
      width: 320px;
      background: rgba(20, 20, 30, 0.95);
      border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px;
      padding: 16px;
      font-family: 'Segoe UI', sans-serif;
      color: #e0e0e0;
      z-index: 10000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
    `;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      position: absolute; top: 8px; right: 12px;
      background: none; border: none; color: #888; font-size: 20px;
      cursor: pointer; line-height: 1;
    `;
    closeBtn.onclick = () => this.hide();
    this.panel.appendChild(closeBtn);

    // Header row
    const header = document.createElement('div');
    header.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 12px;';

    // Avatar icon (placeholder)
    const avatarIcon = document.createElement('div');
    avatarIcon.style.cssText = `
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; font-weight: bold; color: white; flex-shrink: 0;
    `;
    avatarIcon.textContent = profile.name.charAt(0).toUpperCase();
    header.appendChild(avatarIcon);

    // Name and status
    const nameBlock = document.createElement('div');
    nameBlock.style.cssText = 'flex: 1; min-width: 0;';

    const nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-size: 16px; font-weight: 600; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
    nameEl.textContent = profile.name;
    nameBlock.appendChild(nameEl);

    if (profile.title) {
      const titleEl = document.createElement('div');
      titleEl.style.cssText = 'font-size: 12px; color: #aaa; font-style: italic;';
      titleEl.textContent = profile.title;
      nameBlock.appendChild(titleEl);
    }

    // Online indicator
    const statusDot = document.createElement('div');
    statusDot.style.cssText = `
      width: 10px; height: 10px; border-radius: 50%;
      background: ${profile.online !== false ? '#4caf50' : '#666'};
      flex-shrink: 0;
    `;
    header.appendChild(nameBlock);
    header.appendChild(statusDot);
    this.panel.appendChild(header);

    // Divider
    const divider = document.createElement('div');
    divider.style.cssText = 'height: 1px; background: rgba(255,255,255,0.1); margin: 12px 0;';
    this.panel.appendChild(divider);

    // Info rows
    const addRow = (label: string, value?: string) => {
      if (!value) return;
      const row = document.createElement('div');
      row.style.cssText = 'margin-bottom: 8px;';
      const labelEl = document.createElement('span');
      labelEl.style.cssText = 'font-size: 11px; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px;';
      labelEl.textContent = label;
      const valueEl = document.createElement('span');
      valueEl.style.cssText = 'font-size: 13px; color: #ccc;';
      valueEl.textContent = value;
      row.appendChild(labelEl);
      row.appendChild(valueEl);
      this.panel!.appendChild(row);
    };

    addRow('Account', profile.accountStatus || 'Resident');
    addRow('Home', profile.homeLocation);
    addRow('Last Seen', profile.lastLogin || (profile.online !== false ? 'Online now' : 'Offline'));

    if (profile.bio) {
      addRow('About');
      const bioEl = document.createElement('div');
      bioEl.style.cssText = 'font-size: 12px; color: #aaa; line-height: 1.4; max-height: 80px; overflow-y: auto; margin-top: 4px;';
      bioEl.textContent = profile.bio;
      this.panel!.appendChild(bioEl);
    }

    // Profile image (if available)
    if (profile.profileImage) {
      const imgContainer = document.createElement('div');
      imgContainer.style.cssText = 'margin-top: 12px; text-align: center;';
      const img = document.createElement('img');
      img.src = profile.profileImage;
      img.style.cssText = 'max-width: 100%; max-height: 120px; border-radius: 4px;';
      img.onerror = () => img.remove();
      imgContainer.appendChild(img);
      this.panel!.appendChild(imgContainer);
    }

    document.body.appendChild(this.panel);
  }

  /**
   * Hide the profile panel.
   */
  hide(): void {
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
      this.currentProfile = null;
    }
  }

  /**
   * Get current visible profile.
   */
  get current(): ProfileData | null {
    return this.currentProfile;
  }

  /**
   * Check if panel is visible.
   */
  get visible(): boolean {
    return this.panel !== null;
  }

  toggle(): void {
    if (this.panel) this.hide();
  }

  /**
   * Dispose and clean up.
   */
  dispose(): void {
    this.hide();
  }
}

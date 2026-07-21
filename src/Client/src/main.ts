import { SceneManager } from './engine/SceneManager';
import { GridClient } from './network/GridClient';
import { MinimapRenderer } from './engine/MinimapRenderer';

// DOM elements
const viewport = document.getElementById('viewport')!;
const loginPanel = document.getElementById('login-panel')!;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginError = document.getElementById('login-error')!;
const avatarPanel = document.getElementById('avatar-panel')!;
const avatarList = document.getElementById('avatar-list')!;
const connectBtn = document.getElementById('connect-btn') as HTMLButtonElement;
const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
const hud = document.getElementById('hud')!;
const chatMessages = document.getElementById('chat-messages')!;
const chatForm = document.getElementById('chat-form') as HTMLFormElement;
const chatInput = document.getElementById('chat-input') as HTMLInputElement;
const positionInfo = document.getElementById('position-info')!;
const minimapCanvas = document.getElementById('minimap-canvas') as HTMLCanvasElement;
const teleportForm = document.getElementById('teleport-form') as HTMLFormElement;
const teleportInput = document.getElementById('teleport-input') as HTMLInputElement;

// State
let authToken: string = '';
let gridClient: GridClient | null = null;
let sceneManager: SceneManager | null = null;
let minimap: MinimapRenderer | null = null;
let selectedAvatarId: number | null = null;

// --- Login ---
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.style.display = 'none';

  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      loginError.textContent = err.error || 'Login failed';
      loginError.style.display = 'block';
      return;
    }

    const data = await res.json();
    authToken = data.token;
    loginPanel.style.display = 'none';
    await loadAvatars();
  } catch (err) {
    loginError.textContent = 'Connection error';
    loginError.style.display = 'block';
  }
});

// --- Load avatars ---
async function loadAvatars(): Promise<void> {
  avatarPanel.style.display = 'block';
  avatarList.innerHTML = '<li style="color:#888;text-align:center">Loading...</li>';

  try {
    const res = await fetch('/api/avatars', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!res.ok) throw new Error('Failed to load avatars');

    const avatars = await res.json();

    if (avatars.length === 0) {
      avatarList.innerHTML = '<li style="color:#888;text-align:center">No avatars yet. Create one on the grid first.</li>';
      connectBtn.disabled = true;
      return;
    }

    avatarList.innerHTML = '';
    for (const avatar of avatars) {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="avatar-name">${avatar.firstName} ${avatar.lastName}</div>
        <div style="font-size:0.8rem;color:#888;margin-top:2px">${avatar.homeUri || 'Default location'}</div>
      `;
      li.addEventListener('click', () => {
        avatarList.querySelectorAll('li').forEach((el) => el.classList.remove('selected'));
        li.classList.add('selected');
        selectedAvatarId = avatar.id;
        connectBtn.disabled = false;
      });
      avatarList.appendChild(li);
    }
  } catch (err) {
    avatarList.innerHTML = '<li style="color:#ef5350;text-align:center">Error loading avatars</li>';
  }
}

// --- Connect to world ---
connectBtn.addEventListener('click', async () => {
  if (!selectedAvatarId) return;

  // Initialize 3D scene
  sceneManager = new SceneManager(viewport);

  // Initialize minimap
  minimap = new MinimapRenderer(minimapCanvas);

  // Pass base URL for texture proxy
  const baseUrl = window.location.origin;

  // Add chat callback
  gridClient = new GridClient(
    sceneManager,
    authToken,
    baseUrl,
    (from, message) => addChatMessage(from, message),
    (x, y, z) => {
      positionInfo.textContent = `${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)}`;
      // Update minimap player position
      minimap?.setPlayerPosition(x, y);
    }
  );

  try {
    await gridClient.start();
    await gridClient.connectAvatar(selectedAvatarId);

    // Hide avatar panel, show HUD
    avatarPanel.style.display = 'none';
    hud.style.display = 'flex';

    // Start render loop
    sceneManager.animate();
  } catch (err) {
    console.error('Failed to connect:', err);
  }
});

// --- Logout ---
logoutBtn.addEventListener('click', async () => {
  if (gridClient) {
    await gridClient.stop();
    gridClient = null;
  }
  authToken = '';
  selectedAvatarId = null;
  hud.style.display = 'none';
  avatarPanel.style.display = 'none';
  loginPanel.style.display = 'block';
  loginForm.reset();

  // Dispose 3D scene
  if (sceneManager) {
    sceneManager.renderer.dispose();
    viewport.innerHTML = '';
    sceneManager = null;
  }
  minimap = null;
});

// --- Chat ---
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg || !gridClient) return;

  await gridClient.sendChat(msg);
  addChatMessage('You', msg);
  chatInput.value = '';
});

function addChatMessage(from: string, message: string): void {
  const line = document.createElement('div');
  line.className = 'chat-line';
  line.innerHTML = `<span class="chat-name">${escapeHtml(from)}:</span> ${escapeHtml(message)}`;
  chatMessages.appendChild(line);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Keep only last 200 messages
  while (chatMessages.children.length > 200) {
    chatMessages.removeChild(chatMessages.firstChild!);
  }
}

// --- Teleport ---
teleportForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const regionName = teleportInput.value.trim();
  if (!regionName || !gridClient) return;

  try {
    await gridClient.teleport(regionName);
    teleportInput.value = '';
    addChatMessage('System', `Teleporting to ${regionName}...`);
  } catch (err) {
    addChatMessage('System', 'Teleport failed');
  }
});

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

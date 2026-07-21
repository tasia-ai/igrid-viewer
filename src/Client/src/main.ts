import { SceneManager } from './engine/SceneManager';
import { GridClient } from './network/GridClient';
import { MinimapRenderer } from './engine/MinimapRenderer';

// DOM elements
const viewport = document.getElementById('viewport')!;
const loginPanel = document.getElementById('login-panel')!;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginError = document.getElementById('login-error')!;
const authBtn = document.getElementById('auth-btn') as HTMLButtonElement;
const toggleAuth = document.getElementById('toggle-auth') as HTMLAnchorElement;
const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
const betaKeyInput = document.getElementById('beta-key') as HTMLInputElement;
const avatarPanel = document.getElementById('avatar-panel')!;
const avatarList = document.getElementById('avatar-list')!;
const connectBtn = document.getElementById('connect-btn') as HTMLButtonElement;
const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
const createAvatarBtn = document.getElementById('create-avatar-btn') as HTMLButtonElement;
const avatarFirstName = document.getElementById('avatar-first') as HTMLInputElement;
const avatarLastName = document.getElementById('avatar-last') as HTMLInputElement;
const avatarSlPass = document.getElementById('avatar-sl-pass') as HTMLInputElement;
const avatarCreateError = document.getElementById('avatar-create-error')!;
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
let isRegisterMode = false;

// --- Auth mode toggle ---
toggleAuth.addEventListener('click', (e) => {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;
  loginError.style.display = 'none';
  if (isRegisterMode) {
    authBtn.textContent = 'Register';
    confirmPasswordInput.style.display = 'block';
    confirmPasswordInput.required = true;
    betaKeyInput.style.display = 'block';
    betaKeyInput.required = true;
    toggleAuth.textContent = 'Already have an account? Login';
  } else {
    authBtn.textContent = 'Login';
    confirmPasswordInput.style.display = 'none';
    confirmPasswordInput.required = false;
    betaKeyInput.style.display = 'none';
    betaKeyInput.required = false;
    toggleAuth.textContent = "Don't have an account? Register";
  }
});

// --- Login / Register ---
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.style.display = 'none';

  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  // Validate confirm password in register mode
  if (isRegisterMode) {
    // Validate beta key
    if (betaKeyInput.value.trim() !== 'tasia') {
      loginError.textContent = 'Invalid beta key';
      loginError.style.display = 'block';
      return;
    }
    const confirm = confirmPasswordInput.value;
    if (password !== confirm) {
      loginError.textContent = 'Passwords do not match';
      loginError.style.display = 'block';
      return;
    }
    if (password.length < 4) {
      loginError.textContent = 'Password must be at least 4 characters';
      loginError.style.display = 'block';
      return;
    }
  }

  const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      loginError.textContent = err.error || (isRegisterMode ? 'Registration failed' : 'Login failed');
      loginError.style.display = 'block';
      return;
    }

    const data = await res.json();

    // Registration returns a message, login returns a token
    if (isRegisterMode) {
      // Auto-login after registration
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!loginRes.ok) {
        loginError.textContent = 'Account created! Now login.';
        isRegisterMode = false;
        authBtn.textContent = 'Login';
        confirmPasswordInput.style.display = 'none';
        toggleAuth.textContent = "Don't have an account? Register";
        return;
      }
      const loginData = await loginRes.json();
      authToken = loginData.token;
    } else {
      authToken = data.token;
    }

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

// --- Create avatar ---
createAvatarBtn.addEventListener('click', async () => {
  avatarCreateError.style.display = 'none';
  const firstName = avatarFirstName.value.trim();
  const lastName = avatarLastName.value.trim();
  const slPass = avatarSlPass.value.trim();

  if (!firstName || !lastName) {
    avatarCreateError.textContent = 'First and last name required';
    avatarCreateError.style.display = 'block';
    return;
  }

  createAvatarBtn.textContent = 'Creating...';
  createAvatarBtn.disabled = true;

  try {
    const res = await fetch('/api/avatars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        slPassword: slPass || undefined,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      avatarCreateError.textContent = err.error || 'Failed to create avatar';
      avatarCreateError.style.display = 'block';
      return;
    }

    avatarFirstName.value = '';
    avatarLastName.value = '';
    avatarSlPass.value = '';
    await loadAvatars();
  } catch (err) {
    avatarCreateError.textContent = 'Connection error';
    avatarCreateError.style.display = 'block';
  } finally {
    createAvatarBtn.textContent = 'Create Avatar';
    createAvatarBtn.disabled = false;
  }
});

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
      minimap?.setPlayerPosition(x, y);
    },
    undefined,
    (id, name, online) => {
      friends.set(id, { id, name, online });
      renderFriends();
    },
    (from, message, fromId) => {
      addIMMessage(from, message, fromId);
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

// --- Teleport (supports Hypergrid URIs) ---
teleportForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const destination = teleportInput.value.trim();
  if (!destination || !gridClient) return;

  // Detect if this is a Hypergrid URI (contains :// or @)
  const isHypergrid = destination.includes('://') || destination.includes('@');

  try {
    if (isHypergrid) {
      await gridClient.hypergridTeleport(destination);
      addChatMessage('System', `Hypergrid teleport to ${destination}...`);
    } else {
      await gridClient.teleport(destination);
      addChatMessage('System', `Teleporting to ${destination}...`);
    }
    teleportInput.value = '';
  } catch (err) {
    addChatMessage('System', 'Teleport failed');
  }
});

// --- Contacts & IM ---
const contactsHeader = document.getElementById('contacts-header')!;
const contactsList = document.getElementById('contacts-list')!;
const onlineCount = document.getElementById('online-count')!;
const imPanel = document.getElementById('im-panel')!;
const imHeader = document.getElementById('im-header')!;
const imMessages = document.getElementById('im-messages')!;
const imForm = document.getElementById('im-form') as HTMLFormElement;
const imInput = document.getElementById('im-input') as HTMLInputElement;

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

const friends = new Map<string, Friend>();
let imTarget: Friend | null = null;

// Toggle contacts list
contactsHeader.addEventListener('click', () => {
  contactsList.style.display = contactsList.style.display === 'none' ? 'block' : 'none';
});

// Render friends list
function renderFriends(): void {
  contactsList.innerHTML = '';
  let online = 0;
  for (const friend of friends.values()) {
    if (friend.online) online++;
    const div = document.createElement('div');
    div.style.cssText = `padding:3px 6px;cursor:pointer;font-size:11px;border-radius:3px;margin:1px 0;color:${friend.online ? '#8f8' : '#888'}`;
    div.textContent = `${friend.online ? '● ' : '○ '}${friend.name}`;
    if (friend.online) {
      div.addEventListener('click', () => openIM(friend));
    }
    contactsList.appendChild(div);
  }
  onlineCount.textContent = online.toString();
}

// Open IM panel with a friend
function openIM(friend: Friend): void {
  imTarget = friend;
  imHeader.textContent = `IM with ${friend.name}`;
  imMessages.innerHTML = '';
  imPanel.style.display = 'block';
}

// Send IM
imForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = imInput.value.trim();
  if (!msg || !imTarget || !gridClient) return;

  try {
    await gridClient.sendIM(imTarget.id, msg);
    const line = document.createElement('div');
    line.innerHTML = `<b style="color:#4fc3f7">You:</b> ${escapeHtml(msg)}`;
    imMessages.appendChild(line);
    imMessages.scrollTop = imMessages.scrollHeight;
    imInput.value = '';
  } catch (err) {
    console.error('IM send error:', err);
  }
});

// Receive IM
function addIMMessage(from: string, message: string, fromId?: string): void {
  // Check if this IM is for the open conversation
  if (imTarget && fromId === imTarget.id || from === imTarget?.name) {
    const line = document.createElement('div');
    line.innerHTML = `<b style="color:#8f8">${escapeHtml(from)}:</b> ${escapeHtml(message)}`;
    imMessages.appendChild(line);
    imMessages.scrollTop = imMessages.scrollHeight;
  }
  // Also show in local chat
  addChatMessage(`[IM] ${from}`, message);
}

// Close IM when clicking outside
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (!imPanel.contains(target) && !contactsList.contains(target) && !contactsHeader.contains(target)) {
    imPanel.style.display = 'none';
    imTarget = null;
  }
});

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

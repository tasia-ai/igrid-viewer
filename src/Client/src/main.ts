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
const switchAvatarBtn = document.getElementById('switch-avatar-btn') as HTMLButtonElement;
const topBar = document.getElementById('top-bar')!;
const regionInfo = document.getElementById('region-info')!;
const positionDisplay = document.getElementById('position-display')!;
const bottomBar = document.getElementById('bottom-bar')!;
const chatMessages = document.getElementById('chat-messages')!;
const chatForm = document.getElementById('chat-form') as HTMLFormElement;
const chatInput = document.getElementById('chat-input') as HTMLInputElement;
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

  if (isRegisterMode) {
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

    if (isRegisterMode) {
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
        betaKeyInput.style.display = 'none';
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
      avatarList.innerHTML = '<li style="color:#888;text-align:center">No avatars. Create one below.</li>';
      connectBtn.disabled = true;
      return;
    }

    avatarList.innerHTML = '';
    for (const avatar of avatars) {
      const li = document.createElement('li');
      li.innerHTML = `
        <div style="font-weight:600">${avatar.firstName} ${avatar.lastName}</div>
        <div style="font-size:0.75rem;color:#888">${avatar.homeUri || 'Default location'}</div>
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
const createAvatarBtn = document.getElementById('create-avatar-btn') as HTMLButtonElement;
const avatarFirstName = document.getElementById('avatar-first') as HTMLInputElement;
const avatarLastName = document.getElementById('avatar-last') as HTMLInputElement;
const avatarSlPass = document.getElementById('avatar-sl-pass') as HTMLInputElement;
const avatarCreateError = document.getElementById('avatar-create-error')!;

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
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ firstName, lastName, slPassword: slPass || undefined }),
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

// --- Switch Avatar ---
switchAvatarBtn.addEventListener('click', async () => {
  if (gridClient) { await gridClient.stop(); gridClient = null; }
  selectedAvatarId = null;
  hideWorldUI();
  avatarPanel.style.display = 'block';
  await loadAvatars();
  if (sceneManager) { sceneManager.renderer.dispose(); viewport.innerHTML = ''; sceneManager = null; }
  minimap = null;
});

// --- Connect to world ---
connectBtn.addEventListener('click', async () => {
  if (!selectedAvatarId) return;

  sceneManager = new SceneManager(viewport);
  minimap = new MinimapRenderer(minimapCanvas);
  const baseUrl = window.location.origin;

  gridClient = new GridClient(
    sceneManager, authToken, baseUrl,
    (from, message) => addChatMessage(from, message),
    (x, y, z) => {
      positionDisplay.textContent = `${x.toFixed(0)}, ${y.toFixed(0)}, ${z.toFixed(0)}`;
      minimap?.setPlayerPosition(x, y);
    },
    undefined,
    (id, name, online) => { friends.set(id, { id, name, online }); renderFriends(); },
    (from, message, fromId) => { addIMMessage(from, message, fromId); },
    (x, y, heights) => { minimap?.updatePatch(x, y, heights); }
  );

  try {
    await gridClient.start();
    await gridClient.connectAvatar(selectedAvatarId);
    showWorldUI();
    sceneManager.animate((delta) => { gridClient?.camera?.update(delta); });
  } catch (err) {
    console.error('Failed to connect:', err);
  }
});

function showWorldUI() {
  avatarPanel.style.display = 'none';
  topBar.style.display = 'flex';
  bottomBar.style.display = 'flex';
  document.getElementById('right-panel')!.style.display = 'block';
}

function hideWorldUI() {
  topBar.style.display = 'none';
  bottomBar.style.display = 'none';
  document.getElementById('right-panel')!.style.display = 'none';
  document.getElementById('im-panel')!.style.display = 'none';
}

// --- Logout ---
logoutBtn.addEventListener('click', async () => {
  if (gridClient) { await gridClient.stop(); gridClient = null; }
  authToken = '';
  selectedAvatarId = null;
  hideWorldUI();
  avatarPanel.style.display = 'none';
  loginPanel.style.display = 'block';
  loginForm.reset();
  if (sceneManager) { sceneManager.renderer.dispose(); viewport.innerHTML = ''; sceneManager = null; }
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
  if (!message || !message.trim()) return;
  const line = document.createElement('div');
  line.className = 'chat-line';
  line.innerHTML = `<span class="chat-name">${escapeHtml(from)}:</span> ${escapeHtml(message)}`;
  chatMessages.appendChild(line);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  while (chatMessages.children.length > 200) chatMessages.removeChild(chatMessages.firstChild!);
}

// --- Teleport ---
teleportForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const destination = teleportInput.value.trim();
  if (!destination || !gridClient) return;
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

// --- Friends & IM ---
const friendsHeader = document.getElementById('friends-header')!;
const friendsList = document.getElementById('friends-list')!;
const onlineCount = document.getElementById('online-count')!;
const imPanel = document.getElementById('im-panel')!;
const imHeader = document.getElementById('im-header')!;
const imTitle = document.getElementById('im-title')!;
const imMessages = document.getElementById('im-messages')!;
const imForm = document.getElementById('im-form') as HTMLFormElement;
const imInput = document.getElementById('im-input') as HTMLInputElement;

interface Friend { id: string; name: string; online: boolean; }
const friends = new Map<string, Friend>();
let imTarget: Friend | null = null;
const imHistories = new Map<string, { from: string; message: string; time: Date }[]>();
let imOpen = false;

friendsHeader.addEventListener('click', (e) => {
  e.stopPropagation();
  friendsList.style.display = friendsList.style.display === 'none' ? 'block' : 'none';
});

function renderFriends(): void {
  friendsList.innerHTML = '';
  let online = 0;
  for (const friend of friends.values()) {
    if (friend.online) online++;
    const div = document.createElement('div');
    const unread = imHistories.get(friend.id)?.filter(m => m.from !== 'You').length ?? 0;
    div.className = `friend-item ${friend.online ? 'friend-online' : 'friend-offline'}`;
    div.innerHTML = `${friend.online ? '● ' : '○ '}${escapeHtml(friend.name)}${unread > 0 ? `<span class="friend-unread">${unread}</span>` : ''}`;
    div.addEventListener('click', (e) => { e.stopPropagation(); openIM(friend); });
    friendsList.appendChild(div);
  }
  onlineCount.textContent = online.toString();
}

function openIM(friend: Friend): void {
  imTarget = friend;
  imOpen = true;
  imTitle.textContent = friend.name;
  imMessages.innerHTML = '';
  const history = imHistories.get(friend.id) || [];
  for (const msg of history) {
    const line = document.createElement('div');
    const color = msg.from === 'You' ? '#6ab0ff' : '#8f8';
    line.innerHTML = `<b style="color:${color}">${escapeHtml(msg.from)}:</b> ${escapeHtml(msg.message)}`;
    imMessages.appendChild(line);
  }
  imMessages.scrollTop = imMessages.scrollHeight;
  imPanel.style.display = 'block';
  friendsList.style.display = 'none';
  imInput.focus();
}

imForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = imInput.value.trim();
  if (!msg || !imTarget || !gridClient) return;
  try {
    await gridClient.sendIM(imTarget.id, msg);
    if (!imHistories.has(imTarget.id)) imHistories.set(imTarget.id, []);
    imHistories.get(imTarget.id)!.push({ from: 'You', message: msg, time: new Date() });
    const line = document.createElement('div');
    line.innerHTML = `<b style="color:#6ab0ff">You:</b> ${escapeHtml(msg)}`;
    imMessages.appendChild(line);
    imMessages.scrollTop = imMessages.scrollHeight;
    imInput.value = '';
  } catch (err) { console.error('IM send error:', err); }
});

imHeader.addEventListener('click', (e) => {
  e.stopPropagation();
  if (imOpen) { imPanel.style.display = 'none'; imOpen = false; imTarget = null; }
});

function addIMMessage(from: string, message: string, fromId?: string): void {
  const histId = fromId || from;
  if (!imHistories.has(histId)) imHistories.set(histId, []);
  imHistories.get(histId)!.push({ from, message, time: new Date() });
  if (imTarget && imOpen && (fromId === imTarget.id || from === imTarget?.name)) {
    const line = document.createElement('div');
    line.innerHTML = `<b style="color:#8f8">${escapeHtml(from)}:</b> ${escapeHtml(message)}`;
    imMessages.appendChild(line);
    imMessages.scrollTop = imMessages.scrollHeight;
  }
  addChatMessage(`[IM] ${from}`, message);
  renderFriends();
}

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

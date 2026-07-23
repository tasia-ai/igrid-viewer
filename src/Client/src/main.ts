import * as THREE from 'three';
import { SceneManager } from './engine/SceneManager';
import { GridClient } from './network/GridClient';
import { MinimapRenderer } from './engine/MinimapRenderer';

// === DOM ===
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
const reconnectBtn = document.getElementById('reconnect-btn') as HTMLButtonElement;
const siteLogoutBtn = document.getElementById('site-logout-btn') as HTMLButtonElement;
const topBar = document.getElementById('top-bar')!;
const regionName = document.getElementById('region-name')!;
const parcelName = document.getElementById('parcel-name')!;
const currencyDisplay = document.getElementById('currency-display')!;
const positionDisplay = document.getElementById('position-display')!;
const cameraPanel = document.getElementById('camera-panel')!;
const chatWindow = document.getElementById('chat-window')!;
const chatMessages = document.getElementById('chat-messages')!;
const chatInput = document.getElementById('chat-input') as HTMLInputElement;
const chatSend = document.getElementById('chat-send') as HTMLButtonElement;
const minimapCanvas = document.getElementById('minimap-canvas') as HTMLCanvasElement;
const teleportBar = document.getElementById('teleport-bar')!;
const teleportForm = document.getElementById('teleport-form') as HTMLFormElement;
const teleportInput = document.getElementById('teleport-input') as HTMLInputElement;
const zoomSlider = document.getElementById('zoom-slider') as HTMLInputElement;
const skyPresetSelect = document.getElementById('sky-preset') as HTMLSelectElement;

// === STATE ===
let authToken = '';
let gridClient: GridClient | null = null;
let sceneManager: SceneManager | null = null;
let minimap: MinimapRenderer | null = null;
let selectedAvatarId: number | null = null;
let isRegisterMode = false;
let currencySym = 'Currency';

// === PRELOADER ===
const preloader = document.getElementById('preloader')!;
// Hide preloader after page loads
window.addEventListener('load', () => {
  setTimeout(() => { preloader.classList.add('hidden'); }, 2800);
});

function showPreloader(text: string) {
  const preloaderText = preloader.querySelector('.preloader-text') as HTMLElement;
  if (preloaderText) preloaderText.textContent = text;
  const fill = preloader.querySelector('.preloader-fill') as HTMLElement;
  if (fill) { fill.style.animation = 'none'; fill.offsetHeight; fill.style.animation = 'load 3s ease-in-out forwards'; }
  preloader.classList.remove('hidden');
}

function hidePreloader() {
  preloader.classList.add('hidden');
}

// === AUTH ===
toggleAuth.addEventListener('click', (e) => {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;
  loginError.style.display = 'none';
  authBtn.textContent = isRegisterMode ? 'Register' : 'Login';
  document.getElementById('register-fields')!.style.display = isRegisterMode ? 'block' : 'none';
  confirmPasswordInput.required = isRegisterMode;
  betaKeyInput.required = isRegisterMode;
  toggleAuth.textContent = isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Register";
});

// Grid selector: show/hide custom grid URL
const gridSelect = document.getElementById('grid-select') as HTMLSelectElement;
const customGridField = document.getElementById('custom-grid-field')!;
gridSelect.addEventListener('change', () => {
  customGridField.style.display = gridSelect.value === 'custom' ? 'block' : 'none';
});

// Start location: show/hide region name field
const startLocation = document.getElementById('start-location') as HTMLSelectElement;
const regionField = document.getElementById('region-field')!;
startLocation.addEventListener('change', () => {
  regionField.style.display = startLocation.value === 'region' ? 'block' : 'none';
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.style.display = 'none';
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  if (isRegisterMode) {
    if (betaKeyInput.value.trim() !== 'tasia') { showError('Invalid beta key'); return; }
    if (password !== confirmPasswordInput.value) { showError('Passwords do not match'); return; }
    if (password.length < 4) { showError('Password must be at least 4 characters'); return; }
  }

  try {
    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    if (!res.ok) { showError((await res.json()).error || 'Failed'); return; }
    const data = await res.json();
    if (isRegisterMode) {
      const lr = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      if (!lr.ok) { showError('Account created! Now login.'); isRegisterMode = false; authBtn.textContent = 'Login'; document.getElementById('register-fields')!.style.display = 'none'; toggleAuth.textContent = "Don't have an account? Register"; return; }
      authToken = (await lr.json()).token;
    } else { authToken = data.token; }

    loginPanel.style.display = 'none';
    document.getElementById('account-username')!.textContent = username;
    await loadAvatars();
  } catch { showError('Connection error'); }
});

function showError(msg: string) { loginError.textContent = msg; loginError.style.display = 'block'; }

// === AVATARS ===
async function loadAvatars() {
  avatarPanel.style.display = 'block';
  avatarList.innerHTML = '<li style="color:#888;text-align:center">Loading...</li>';
  try {
    const res = await fetch('/api/avatars', { headers: { Authorization: `Bearer ${authToken}` } });
    if (!res.ok) throw new Error();
    const avatars = await res.json();
    if (!avatars.length) { avatarList.innerHTML = '<li style="color:#888;text-align:center">No avatars. Create one below.</li>'; connectBtn.disabled = true; return; }
    avatarList.innerHTML = '';
    for (const av of avatars) {
      const li = document.createElement('li');
      li.innerHTML = `<div style="font-weight:600">${av.firstName} ${av.lastName}</div>`;
      li.addEventListener('click', () => { avatarList.querySelectorAll('li').forEach(el => el.classList.remove('selected')); li.classList.add('selected'); selectedAvatarId = av.id; connectBtn.disabled = false; });
      avatarList.appendChild(li);
    }
  } catch { avatarList.innerHTML = '<li style="color:#ef5350;text-align:center">Error loading avatars</li>'; }
}

// === SITE LOGOUT (from avatar panel) ===
siteLogoutBtn.addEventListener('click', () => {
  authToken = '';
  selectedAvatarId = null;
  avatarPanel.style.display = 'none';
  loginPanel.style.display = 'block';
  loginForm.reset();
});

// Create avatar
const createAvatarBtn = document.getElementById('create-avatar-btn') as HTMLButtonElement;
createAvatarBtn.addEventListener('click', async () => {
  const errEl = document.getElementById('avatar-create-error')!;
  errEl.style.display = 'none';
  const fn = (document.getElementById('avatar-first') as HTMLInputElement).value.trim();
  const ln = (document.getElementById('avatar-last') as HTMLInputElement).value.trim();
  const pw = (document.getElementById('avatar-sl-pass') as HTMLInputElement).value.trim();
  if (!fn || !ln) { errEl.textContent = 'First and last name required'; errEl.style.display = 'block'; return; }
  createAvatarBtn.textContent = 'Creating...'; createAvatarBtn.disabled = true;
  try {
    const res = await fetch('/api/avatars', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` }, body: JSON.stringify({ firstName: fn, lastName: ln, slPassword: pw || undefined }) });
    if (!res.ok) { errEl.textContent = (await res.json()).error || 'Failed'; errEl.style.display = 'block'; return; }
    (document.getElementById('avatar-first') as HTMLInputElement).value = '';
    (document.getElementById('avatar-last') as HTMLInputElement).value = '';
    (document.getElementById('avatar-sl-pass') as HTMLInputElement).value = '';
    await loadAvatars();
  } catch { errEl.textContent = 'Error'; errEl.style.display = 'block'; }
  finally { createAvatarBtn.textContent = 'Create Avatar'; createAvatarBtn.disabled = false; }
});

// === D-PAD CAMERA CONTROLS ===
document.querySelectorAll('.cam-dpad .cam-btn[data-move]').forEach((btn) => {
  const [dx, dy, dz] = (btn as HTMLElement).dataset.move!.split(',').map(Number);
  btn.addEventListener('mousedown', () => gridClient?.camera?.startMove(dx, dy, dz));
  btn.addEventListener('mouseup', () => gridClient?.camera?.stopMove());
  btn.addEventListener('mouseleave', () => gridClient?.camera?.stopMove());
  btn.addEventListener('touchstart', (e) => { e.preventDefault(); gridClient?.camera?.startMove(dx, dy, dz); });
  btn.addEventListener('touchend', () => gridClient?.camera?.stopMove());
});

document.getElementById('zoom-in')!.addEventListener('click', () => { gridClient?.camera?.setZoom((gridClient?.camera?.getZoom() ?? 30) - 5); zoomSlider.value = String(gridClient?.camera?.getZoom()); });
document.getElementById('zoom-out')!.addEventListener('click', () => { gridClient?.camera?.setZoom((gridClient?.camera?.getZoom() ?? 30) + 5); zoomSlider.value = String(gridClient?.camera?.getZoom()); });
document.getElementById('cam-reset')!.addEventListener('click', () => { gridClient?.camera?.resetView(); zoomSlider.value = '30'; });

// Draw distance
const drawDistSlider = document.getElementById('draw-dist') as HTMLInputElement;
const drawDistLabel = document.getElementById('draw-dist-label')!;
drawDistSlider?.addEventListener('input', () => {
  const dist = Number(drawDistSlider.value);
  drawDistLabel.textContent = String(dist);
  if (sceneManager) {
    sceneManager.camera.far = dist * 2;
    sceneManager.camera.updateProjectionMatrix();
    sceneManager.environment.setDrawDistance(dist);
  }
});
zoomSlider.addEventListener('input', () => { gridClient?.camera?.setZoom(Number(zoomSlider.value)); });

// Sky preset selector
skyPresetSelect.addEventListener('change', () => {
  if (sceneManager) {
    sceneManager.environment.setPreset(skyPresetSelect.value);
  }
});

// === SHOW/HIDE WORLD UI ===
function showWorldUI() {
  avatarPanel.style.display = 'none';
  topBar.style.display = 'flex';
  cameraPanel.style.display = 'flex';
  chatWindow.style.display = 'flex';
  teleportBar.style.display = 'block';
  document.getElementById('right-panel')!.style.display = 'block';
  document.getElementById('toolbar')!.style.display = 'flex';
}
function hideWorldUI() {
  [topBar, cameraPanel, chatWindow, teleportBar].forEach(el => el.style.display = 'none');
  document.getElementById('right-panel')!.style.display = 'none';
  document.getElementById('im-panel')!.style.display = 'none';
  document.getElementById('toolbar')!.style.display = 'none';
}

// === CONNECT ===
connectBtn.addEventListener('click', async () => {
  if (!selectedAvatarId) return;

  showPreloader('Preparing world...');
  connectBtn.disabled = true;
  connectBtn.textContent = 'Connecting...';

  // Yield to render preloader
  await new Promise(r => setTimeout(r, 50));

  try {
    // Step 1: Create scene (lightweight)
    sceneManager = new SceneManager(viewport);
    minimap = new MinimapRenderer(minimapCanvas);

    // Show world UI and start render loop IMMEDIATELY
    hidePreloader();
    showWorldUI();
    addChatMessage('System', 'Initializing viewer...');
    sceneManager.animate((delta) => {
      gridClient?.camera?.update(delta);
      gridClient?.particleManager?.update(delta);
      gridClient?.flexibleRenderer?.update(delta);
      gridClient?.animationSystem?.update(delta);
      gridClient?.attachmentRenderer?.update();
    });

    // Step 2: Yield to browser, then create GridClient
    addChatMessage('System', 'Loading modules...');
    await new Promise(r => setTimeout(r, 200));
    // Split heavy GridClient init into chunks — yield every 3 objects
    await new Promise(r => requestAnimationFrame(r));
    gridClient = new GridClient(sceneManager, authToken, window.location.origin,
      (from, msg) => addChatMessage(from, msg),
      (x, y, z) => { positionDisplay.textContent = `${x.toFixed(0)}, ${y.toFixed(0)}, ${z.toFixed(0)}`; minimap?.setPlayerPosition(x, y); },
      undefined,
      (id, name, online) => { friends.set(id, { id, name, online }); renderFriends(); },
      (from, msg, fid) => { addIMMessage(from, msg, fid); },
      (x, y, h) => { minimap?.updatePatch(x, y, h); },
      (rname, rx, ry) => { regionName.textContent = `☀ ${rname}`; parcelName.textContent = `(${rx}, ${ry})`; },
      (pname, area) => { parcelName.textContent = pname; },
      (balance) => { currencyDisplay.textContent = `${currencySym} ${balance.toLocaleString()}`; },
      (sym) => { currencySym = sym; currencyDisplay.textContent = `${sym} ${currencyDisplay.textContent?.replace(/^[^\d]*\s*/, '') || '0'}`; },
      (otherId, otherName, messages) => {
        if (!convos.has(otherId)) convos.set(otherId, { friendId: otherId, friendName: otherName, messages: [], unread: 0 });
        const conv = convos.get(otherId)!;
        for (const m of messages) {
          conv.messages.push({ from: m.from, text: m.text, time: new Date(m.time) });
        }
        renderFriends();
      },
    );
    // Heavy init with yields — never blocks browser
    await gridClient.init();

    // Step 3: Start SignalR, then grid login
    addChatMessage('System', 'Connecting to server...');
    await gridClient.start();
    addChatMessage('System', 'Logging into grid...');
    try {
      // Read grid & location selections
      const gridVal = (document.getElementById('grid-select') as HTMLSelectElement)?.value;
      const gridUrl = gridVal === 'custom'
        ? (document.getElementById('custom-grid-url') as HTMLInputElement)?.value || undefined
        : gridVal ? `https://${gridVal}:8002/` : undefined;
      const locVal = (document.getElementById('start-location') as HTMLSelectElement)?.value;
      const regionVal = locVal === 'region' ? (document.getElementById('start-region') as HTMLInputElement)?.value : undefined;
      const startLoc = locVal === 'region' && regionVal ? `uri:${regionVal}` : locVal === 'last' ? 'last' : undefined;

      await gridClient.connectAvatar(selectedAvatarId!, gridUrl, startLoc, regionVal);
      addChatMessage('System', '✅ Logged into grid!');
    } catch (err) {
      console.error('[Grid] Avatar connect failed:', err);
      addChatMessage('System', `❌ Grid connection failed: ${(err as Error).message || 'Unknown error'}`);
    }

  } catch (err) {
    console.error('Connect failed:', err);
    hidePreloader();
    connectBtn.disabled = false;
    connectBtn.textContent = 'Enter World';
    addChatMessage('System', `Initialization failed: ${(err as Error).message || 'Unknown error'}`);
    showError(`Failed: ${(err as Error).message || 'Unknown error'}`);
    showWorldUI();
  }
});

// === RECONNECT (from top bar) ===
reconnectBtn.addEventListener('click', async () => {
  if (!selectedAvatarId) return;
  // Disconnect current
  if (gridClient) { await gridClient.stop(); gridClient = null; }
  if (sceneManager) { sceneManager.renderer.dispose(); viewport.innerHTML = ''; sceneManager = null; }
  minimap = null;
  hideWorldUI();
  // Reconnect
  showPreloader('Reconnecting...');
  sceneManager = new SceneManager(viewport);
  minimap = new MinimapRenderer(minimapCanvas);
  gridClient = new GridClient(sceneManager, authToken, window.location.origin,
    (from, msg) => addChatMessage(from, msg),
    (x, y, z) => { positionDisplay.textContent = `${x.toFixed(0)}, ${y.toFixed(0)}, ${z.toFixed(0)}`; minimap?.setPlayerPosition(x, y); },
    undefined,
    (id, name, online) => { friends.set(id, { id, name, online }); renderFriends(); },
    (from, msg, fid) => { addIMMessage(from, msg, fid); },
    (x, y, h) => { minimap?.updatePatch(x, y, h); },
    (rname, rx, ry) => { regionName.textContent = `☀ ${rname}`; parcelName.textContent = `(${rx}, ${ry})`; },
    (pname) => { parcelName.textContent = pname; },
    (balance) => { currencyDisplay.textContent = `${currencySym} ${balance.toLocaleString()}`; },
    (sym) => { currencySym = sym; },
    (otherId, otherName, messages) => { if (!convos.has(otherId)) convos.set(otherId, { friendId: otherId, friendName: otherName, messages: [], unread: 0 }); const conv = convos.get(otherId)!; for (const m of messages) conv.messages.push({ from: m.from, text: m.text, time: new Date(m.time) }); renderFriends(); },
  );
  try {
    showPreloader('Reconnecting...');
    const connectTimeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out')), 15000)
    );
    await Promise.race([gridClient.start(), connectTimeout]);
    const avatarTimeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Avatar connection timed out')), 15000)
    );
    await Promise.race([gridClient.connectAvatar(selectedAvatarId), avatarTimeout]);
    hidePreloader();
    showWorldUI();
    sceneManager.animate((delta) => {
      gridClient?.camera?.update(delta);
      gridClient?.particleManager?.update(delta);
      gridClient?.flexibleRenderer?.update(delta);
      gridClient?.animationSystem?.update(delta);
      gridClient?.attachmentRenderer?.update();
    });
  } catch (err) {
    hidePreloader();
    console.error('Reconnect failed:', err);
    addChatMessage('System', 'Reconnect failed. Try again.');
  }
});

// === SWITCH AVATAR (from top bar) ===
switchAvatarBtn.addEventListener('click', async () => {
  if (gridClient) { await gridClient.stop(); gridClient = null; }
  selectedAvatarId = null;
  hideWorldUI();
  avatarPanel.style.display = 'block';
  await loadAvatars();
  if (sceneManager) { sceneManager.renderer.dispose(); viewport.innerHTML = ''; sceneManager = null; }
  minimap = null;
});

// === LOGOUT (from top bar) ===
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

// === CHAT ===
chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } });

async function sendChat() {
  const msg = chatInput.value.trim();
  if (!msg || !gridClient) return;

  // Handle /im command: /im Username message here
  if (msg.startsWith('/im ') || msg.startsWith('/IM ')) {
    const parts = msg.slice(4).trim().split(/\s+/);
    if (parts.length < 2) {
      addChatMessage('System', 'Usage: /im Username message');
      chatInput.value = '';
      return;
    }
    // Take first word as target, rest as message (supports multi-word names)
    const target = parts[0];
    const imMsg = parts.slice(1).join(' ');
    try {
      await gridClient.sendIM(target, imMsg);
      addChatMessage('System', `IM sent to ${target}: ${imMsg}`);
    } catch (err) {
      addChatMessage('System', `IM failed: ${(err as Error).message}`);
    }
    chatInput.value = '';
    return;
  }

  await gridClient.sendChat(msg);
  addChatMessage('You', msg);
  chatInput.value = '';
}

function addChatMessage(from: string, message: string) {
  if (!message?.trim()) return;
  const div = document.createElement('div');
  div.className = 'chat-msg';
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = `<span class="chat-time">${time}</span><span class="chat-name">${esc(from)}:</span><div class="chat-text">${esc(message)}</div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  while (chatMessages.children.length > 200) chatMessages.removeChild(chatMessages.firstChild!);
}

// === TELEPORT ===
teleportForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dest = teleportInput.value.trim();
  if (!dest || !gridClient) return;
  try {
    if (dest.includes('://') || dest.includes('@')) { await gridClient.hypergridTeleport(dest); addChatMessage('System', `Teleporting to ${dest}...`); }
    else { await gridClient.teleport(dest); addChatMessage('System', `Teleporting to ${dest}...`); }
    teleportInput.value = '';
  } catch { addChatMessage('System', 'Teleport failed'); }
});

// === FRIENDS & IM (multi-conversation) ===
const friendsHeader = document.getElementById('friends-header')!;
const friendsList = document.getElementById('friends-list')!;
const onlineCount = document.getElementById('online-count')!;

// New Firestorm-style IM panel references
const imPanel = document.getElementById('im-panel')!;
const imPanelClose = document.getElementById('im-panel-close')!;
const imSearchInput = document.getElementById('im-search-input') as HTMLInputElement;
const imConvoList = document.getElementById('im-convo-list')!;
const imChatTitle = document.getElementById('im-chat-title')!;
const imChatMessages = document.getElementById('im-chat-messages')!;
const imChatInput = document.getElementById('im-chat-input') as HTMLInputElement;
const imChatSend = document.getElementById('im-chat-send') as HTMLButtonElement;
const imChatClear = document.getElementById('im-chat-clear')!;

interface Friend { id: string; name: string; online: boolean; }
interface IMConvo { friendId: string; friendName: string; messages: { from: string; text: string; time: Date }[]; unread: number; }

const friends = new Map<string, Friend>();
const convos = new Map<string, IMConvo>();
let activeConvoId: string | null = null;

friendsHeader.addEventListener('click', (e) => { e.stopPropagation(); friendsList.style.display = friendsList.style.display === 'none' ? 'block' : 'none'; });

function renderFriends() {
  const filter = imSearchInput.value.trim().toLowerCase();
  friendsList.innerHTML = '';
  imConvoList.innerHTML = '';
  let online = 0;
  for (const f of friends.values()) {
    if (f.online) online++;
    const conv = convos.get(f.id);
    const unread = conv?.unread ?? 0;
    const div = document.createElement('div');
    div.className = `friend-item ${f.online ? 'friend-online' : 'friend-offline'}`;
    div.innerHTML = `${f.online ? '● ' : '○ '}${esc(f.name)}${unread > 0 ? `<span style="color:#ef5350;font-weight:bold;margin-left:4px">${unread}</span>` : ''}`;
    div.addEventListener('click', (e) => { e.stopPropagation(); switchIM(f.id, f.name); });
    friendsList.appendChild(div);

    // IM panel sidebar
    if (filter && !f.name.toLowerCase().includes(filter)) continue;
    const item = document.createElement('div');
    item.className = `im-convo-item${activeConvoId === f.id ? ' active' : ''}`;
    item.innerHTML = `
      <span class="im-status-dot ${f.online ? 'online' : 'offline'}"></span>
      <span class="im-convo-name">${esc(f.name)}</span>
      ${unread > 0 ? `<span class="im-unread-badge">${unread}</span>` : ''}
    `;
    item.addEventListener('click', () => switchIM(f.id, f.name));
    imConvoList.appendChild(item);
  }
  onlineCount.textContent = String(online);
}

function switchIM(friendId: string, friendName: string) {
  activeConvoId = friendId;
  if (!convos.has(friendId)) convos.set(friendId, { friendId, friendName, messages: [], unread: 0 });
  const conv = convos.get(friendId)!;
  conv.unread = 0;
  imChatTitle.textContent = friendName;
  imPanel.style.display = 'flex';
  renderIMMessages(conv);
  imChatInput.focus();
  renderFriends();
}

function renderIMMessages(conv: IMConvo) {
  imChatMessages.innerHTML = '';
  for (const msg of conv.messages) {
    const time = msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSent = msg.from === 'You';
    const line = document.createElement('div');
    line.className = `im-msg ${isSent ? 'sent' : 'received'}`;
    line.innerHTML = `<span class="im-msg-time">${time}</span> <span class="im-msg-name">${esc(msg.from)}:</span> <span class="im-msg-text">${esc(msg.text)}</span>`;
    imChatMessages.appendChild(line);
  }
  imChatMessages.scrollTop = imChatMessages.scrollHeight;
}

imChatSend.addEventListener('click', async () => {
  const msg = imChatInput.value.trim();
  if (!msg || !activeConvoId || !gridClient) return;
  const conv = convos.get(activeConvoId);
  if (!conv) return;
  try {
    await gridClient.sendIM(activeConvoId, msg);
    conv.messages.push({ from: 'You', text: msg, time: new Date() });
    renderIMMessages(conv);
    imChatInput.value = '';
  } catch (err) { console.error('IM error:', err); }
});

imChatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); imChatSend.click(); } });

// Close IM panel
imPanelClose.addEventListener('click', () => { imPanel.style.display = 'none'; activeConvoId = null; });

// Clear IM conversation
imChatClear.addEventListener('click', async () => {
  if (!activeConvoId || !gridClient) return;
  if (!confirm('Clear this conversation?')) return;
  await gridClient.clearIMHistory(activeConvoId);
  const conv = convos.get(activeConvoId);
  if (conv) { conv.messages = []; renderIMMessages(conv); }
});

function addIMMessage(from: string, message: string, fromId?: string) {
  const senderId = fromId || from;
  if (!convos.has(senderId)) {
    convos.set(senderId, { friendId: senderId, friendName: from, messages: [], unread: 0 });
    if (!friends.has(senderId)) friends.set(senderId, { id: senderId, name: from, online: true });
  }
  const conv = convos.get(senderId)!;
  conv.messages.push({ from, text: message, time: new Date() });
  if (activeConvoId === senderId) {
    conv.unread = 0;
    renderIMMessages(conv);
  } else { conv.unread++; }
  addChatMessage(`[IM] ${from}`, message);
  renderFriends();
}

function esc(s: string): string { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// === TOOLBAR ===
const toolbar = document.getElementById('toolbar')!;
toolbar.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!gridClient) return;
    const tool = (btn as HTMLElement).dataset.tool;
    switch (tool) {
      case 'search': gridClient.ensureSearchPanel().toggle(); break;
      case 'inventory': gridClient.ensureInventoryPanel().toggle(); break;
      case 'build': gridClient.ensureBuildTools().toggle(); break;
      case 'land': gridClient.ensureLandTools().toggle(); break;
      case 'map': gridClient.ensureWorldMap().toggle(); break;
      case 'profile': gridClient.profilePanel.toggle(); break;
      case 'groups': gridClient.groupPanel.toggle(); break;
      case 'appearance': gridClient.ensureAppearanceEditor().toggle(); break;
      case 'script': gridClient.ensureScriptEditor().toggle(); break;
      case 'notecard': gridClient.ensureNotecardEditor().toggle(); break;
      case 'upload': gridClient.ensureUploadTools().toggle(); break;
      case 'snapshot': gridClient.ensureSnapshotTools().toggle(); break;
      case 'voice': gridClient.ensureVoiceChat().toggleSettings(); break;
    }
  });
});

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
  if (!gridClient) return;
  // Don't capture when typing in inputs
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
  switch (e.key) {
    case 'Escape':
      gridClient.ensureSearchPanel().hide?.();
      gridClient.ensureInventoryPanel().hide?.();
      gridClient.ensureBuildTools().toggle?.();
      gridClient.ensureLandTools().hide?.();
      gridClient.ensureWorldMap().hide?.();
      gridClient.profilePanel.hide?.();
      gridClient.groupPanel.hide?.();
      gridClient.ensureAppearanceEditor().hide?.();
      gridClient.ensureScriptEditor().hide?.();
      gridClient.ensureNotecardEditor().hide?.();
      gridClient.ensureUploadTools().hide?.();
      gridClient.ensureSnapshotTools().hide?.();
      gridClient.ensureVoiceChat().toggleSettings?.(); gridClient.ensureVoiceChat().toggleSettings?.();
      break;
  }
});

// Escape also closes the IM panel
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imPanel.style.display === 'flex') {
    imPanel.style.display = 'none';
    activeConvoId = null;
  }
});

// === VOICE CHAT STATUS INDICATOR ===
// Show voice status dot once connected
// (initialized after avatar connects)
const voiceObserver = new MutationObserver(() => {
  if (gridClient && !document.getElementById('voice-status')) {
    const vc = gridClient.voiceChat;
    if (vc) vc.createStatusIndicator(document.body);
  }
});
voiceObserver.observe(document.body, { childList: true, subtree: true });

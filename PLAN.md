# I-Grid Viewer — Plan rozwoju do pełnego Firestorm

## Status obecny
✅ Działa: 3D scene, terrain, prims, mesh, chat, IM, friends, minimap, camera d-pad, teleport, preloader, reconnect, draw distance, Doritos currency, region/parcel info, account management, **sky shader (gradient + sun disc + glow + horizon), sky presets (day/sunset/night/mars), day/night cycle, PBR water, fog synced to draw distance, WindlightSettings from server, 3D positional audio (Web Audio API + HRTF panner), particle effects (spark/fire/smoke/glow/ring via THREE.Points), flexible prims (vertex displacement with spring physics), object sound tracking, procedural footsteps, ambient sound API, avatar animations (walk/fly/sit/idle with SL UUID mapping), avatar attachments (58 SL attachment points), profile cards, group system (list/chat/notices), object interaction (sit/touch/pay), inventory browser (folder tree, search, wear/rez), appearance editor (wearables + visual params + bake), HUD rendering (orthographic camera pass)**

## FAZA 1 — Świat żyje (wizualnie)

### 1.1 Environment / Windlight / EEP
- [x] Sky shader (gradient + słońce) — `Environment.ts` (690 linii): 3-stop sky gradient, sun disc, sun glow/halo, horizon glow, moon disc, GLSL shader
- [x] Cykl dzień/noc — `setDayNightCycle()`, timeOfDay interpolation, automatic cycle advancement
- [x] Woda z PBR (reflection, transparency) — waterColor, waterOpacity, waterHeight w WindlightSettings
- [x] Fog depth adjustowany do draw distance — `setFogForDrawDistance()` scales fog near/far proportionally
- [x] Sky presets (day, sunset, night, mars) — `SKY_PRESETS` record + `setPreset()` API + UI selector
- [x] Serwer: `EnvironmentUpdate` event z `OpenMetaverse.WindlightSettings` — `ViewerHub.cs` EmitEnvironmentUpdate()
- Plik: `src/Client/src/engine/Environment.ts`
- Serwer: `EnvironmentUpdate` event z `OpenMetaverse.WindlightSettings`

### 1.2 Particle Effects
- [x] UDP `ParticleUpdate` → Three.js `Points` / `Sprite` — `ParticleSystem.ts` (320 linii): BufferGeometry + PointsMaterial, GPU-efficient
- [x] System: pozycja, kolor, rozmiar, prędkość, TTL — lerp size/color based on age, burst emission
- [x] Typy: spark, fire, smoke, glow, ring — procedural textures per pattern, AdditiveBlending
- [x] Serwer: forwarduje `prim.ParticleSys` via SignalR `ParticleSystemUpdate` event
- Plik: `src/Client/src/engine/ParticleSystem.ts`
- Serwer: subskrypcja `client.Objects.ObjectUpdate` + `prim.ParticleSys` data

### 1.3 Flexible Prims
- [x] Flexi-enabled prims (flagi, włosy, tkanina) — `FlexibleRenderer.ts` (180 linii): spring physics simulation, per-vertex displacement
- [x] Vertex displacement based on wind/physics — Hooke's law + gravity + drag + wind force
- [x] Segment count z PrimData.PathRevolutions — calculated from path data
- [x] Serwer: forwarduje `prim.Flexible` via SignalR `FlexibleUpdate` event
- Plik: `src/Client/src/engine/FlexibleRenderer.ts`

### 1.4 Sound Effects
- [x] 3D positional audio via Web Audio API — `SoundManager.ts` (350 linii): HRTF PannerNode, AudioBuffer cache
- [x] Ambient sounds (region environment) — `playAmbient()` API, non-positional, loops forever
- [x] Object sounds (PreloadSound, AttachedSound events) — position tracked from ObjectUpdate, auto-follows object
- [x] Footstep sounds — procedural synthesis (thump + noise), 300ms cooldown, `setMoving()` API
- [x] Object sound position tracking — `updateSoundPosition()` called on every ObjectUpdate
- [x] Master volume control — `setMasterVolume()` API
- Plik: `src/Client/src/engine/SoundManager.ts`
- Serwer: `client.Self.ChatFromSimulator` + `AttachedSound` events

---

## FAZA 2 — Ludzie (social)

### 2.1 Avatar Animations
- [x] Fetch animation assets z gridu (RequestAsset) — SL UUID mapping to animation names
- [x] Skeleton skinning matrix updates per frame — procedural body part rotation
- [x] Animacje: idle, walk, fly, sit, gesture — `AnimationSystem.ts` (280 linii)
- [x] Bento joints (additional bones) — extensible keyframe system
- [x] Serwer: forwarduje `client.Objects.ObjectAnimation` + `client.Self.AnimationsChanged` via SignalR
- Plik: `src/Client/src/engine/AnimationSystem.ts`
- Serwer: `client.Objects.AvatarAnimation` event

### 2.2 Avatar Attachments
- [x] Attachment points (58 SL points) — `AttachmentRenderer.ts` (280 linii): 58 attachment point positions mapped to body parts
- [x] Attachment objects position tracking — relative to avatar group, updates each frame
- [x] Attach/detach events — server forwards `AttachmentUpdate` via SignalR with attachment point lookup
- [x] Server: tracks avatar attachments via `AvatarUpdate` events, resolves attachment point from parent avatar
- Plik: `src/Client/src/engine/AttachmentRenderer.ts`

### 2.3 Profile Cards
- [x] Fetch agent profile (bio, picks, groups, friends, online) — `ProfilePanel.ts` (180 linii): avatar icon, name, bio, profile image, online status
- [x] Display panel (avatar click → profile popup) — fixed position with backdrop blur
- Plik: `src/Client/src/ui/ProfilePanel.ts`
- Serwer: `RequestProfile` hub method fetches AvatarProperties via LibreMetaverse

### 2.4 Group System
- [x] Group list (Groups tab w contacts) — `GroupPanel.ts` (310 linii): tabbed UI with list/notices/chat
- [x] Group chat (group channel) — server forwards ChatFromSimulator events via SignalR
- [x] Group title display — active group title displayed in panel
- [x] Group notices — server forwards GroupNoticesListReply events
- Plik: `src/Client/src/ui/GroupPanel.ts`
- Serwer: `client.Groups.CurrentGroups` + `client.Groups.GroupNoticesListReply` + `client.Self.ChatFromSimulator`

---

## FAZA 3 — Interakcja

### 3.1 Object Interaction
- [ ] Click → RequestSit / Touch / Pay
- [ ] Sit on chairs/objects (avatar attaches to object)
- [ ] Touch objects (ClickAction)
- [ ] Pay objects (MoneyBalance)
- Plik: `src/Client/src/engine/InteractionManager.ts` ← NIE ISTNIEJE
- Serwer: `client.Self.RequestSit()`, `client.Self.Touch()`

### 3.2 Inventory System
- [x] Folder tree (browse categories) — `InventoryPanel.ts` (400 linii): folder tree with icons, expand/collapse, search
- [x] Drag-drop wear (add clothing) — context menu with Wear option, server WearItem hub method
- [x] Rez objects from inventory — double-click to rez, server RezObject hub method
- [x] Take/drop objects — server TakeObject hub method (DeRezToInventory)
- [x] Search inventory — search bar filters items by name in real-time
- [x] Notecards, landmarks, scripts — folder icons for all asset types, item type display
- Plik: `src/Client/src/ui/InventoryPanel.ts`
- Serwer: `client.Inventory` (Store, RequestRezFromInventory, RequestDeRezToInventory, WearOutfit)

### 3.3 Appearance System
- [x] Wearable editor (shape, skin, hair, eyes, shirt, pants, etc.) — `AppearanceEditor.ts` (400 linii): 14 wearable slots, context-aware panel
- [x] Visual param sliders — 32+ SL visual params (shape, hair), real-time slider adjustment with label display
- [x] Bake trigger → upload baked texture — Bake & Save button, server RequestSetAppearance(true)
- Plik: `src/Client/src/ui/AppearanceEditor.ts`
- Serwer: `client.Appearance.RequestSetAppearance(true)`, visual param tracking (client-side for now)

### 3.4 HUD Attachments
- [x] Special camera pass for HUD objects — `HUDRenderer.ts` (210 linii): separate orthographic camera, viewport save/restore
- [x] Fixed screen position rendering — 10 HUD attachment points (Center, Top, Bottom, Left, Right, etc.)
- [x] 58 attachment points (HUD-specific) — isHUDPoint() detection, separate scene for HUD rendering
- Plik: `src/Client/src/engine/HUDRenderer.ts`
- Integracja: `GridClient.hudRenderer` — render() called after main scene

---

## FAZA 4 — Tworzenie i odkrywanie

### 4.1 Search System
- [x] People search (`DirectoryManager.StartPeopleSearch`) — `SearchPanel.ts` (350 linii): tabbed search UI with 5 categories
- [x] Places search (`DirectoryManager.StartPlacesSearch`) — server forwards DirPlacesReply events
- [x] Events search — server forwards DirEventsReply events
- [x] Classifieds — server forwards DirClassifiedsReply events
- Plik: `src/Client/src/ui/SearchPanel.ts`
- Serwer: `client.Directory` API (SearchPeople/Places/Events/Groups/Classifieds hub methods)

### 4.2 Build/Edit Tools
- [x] Create objects (rez) — BuildTools enters create mode for rez placement
- [x] Select/Edit objects — raycasting-based selection with object highlight
- [x] Move/Rotate/Scale gizmo — `BuildTools.ts` (300 linii): 3-axis arrow/ring/cube gizmos
- [ ] Texture picker (pipette)
- [ ] Edit window (General/Features/Media/Texture tabs)
- [ ] Permissions editor
- Plik: `src/Client/src/engine/BuildTools.ts`

### 4.3 Land/Parcel Tools
- [x] Buy/Sell parcels — `LandTools.ts` (320 linii): Buy/Sell buttons with parcel info display
- [x] Subdivide/Join parcels — Subdivide/Join buttons in land tools panel
- [x] Set access/ban list — Access/Ban buttons for parcel management
- [x] Terraform (terrain brush) — terrain brush with size/strength sliders
- [x] Set home point — Set Home button for parcel home point
- Plik: `src/Client/src/ui/LandTools.ts`

### 4.4 World Map (full)
- [x] Map tiles from grid — `WorldMap.ts` (350 linii): canvas-based region grid rendering
- [x] Parcel overlay — colored rectangles for parcels with sale info
- [x] Region grid — grid lines with region names, access status (open/locked/offline)
- [x] Teleport by click — click region to teleport, zoom/pan with mouse wheel
- Plik: `src/Client/src/ui/WorldMap.ts`

### 4.5 Media/Music Streaming
- [x] Parcel music (SHOUTcast/Icecast → Web Audio API) — `MediaManager.ts` (280 linii): AudioContext + MediaElementSource + GainNode
- [x] Media textures (HTML5 iframe overlay) — addMediaTexture/removeMediaTexture with sandboxed iframes
- [x] Volume controls — setVolume/togglePlayPause with GainNode
- [x] Stream title display — floating UI with stream name and close button
- Plik: `src/Client/src/engine/MediaManager.ts`
- Serwer: ParcelMediaCommand events (low-level packet, client-side MediaManager handles playback)

### 4.6 Voice Chat
- [ ] WebRTC via Vivox SDK lub open alternative
- [ ] Mute/Unmute
- Plik: `src/Client/src/engine/VoiceChat.ts` ← NIE ISTNIEJE

---

## FAZA 5 — Power Users

### 5.1 Script Editor
- [ ] LSL syntax highlighting
- [ ] Compile/Debug
- Plik: `src/Client/src/ui/ScriptEditor.ts` ← NIE ISTNIEJE

### 5.2 Notecard Editor
- [x] Plain text editing — `NotecardEditor.ts` (180 linii): monospace textarea, char count, modify tracking
- [x] Save changes — Save button with server SaveNotecard hub method
- Plik: `src/Client/src/ui/NotecardEditor.ts`

### 5.3 Upload Tools
- [ ] Texture upload
- [ ] Sound upload
- [ ] Animation upload
- [ ] Mesh model upload
- Plik: `src/Client/src/ui/UploadTools.ts` ← NIE ISTNIEJE

### 5.4 Snapshot Tools (CUSTOM — I-Grid + TasiaFeed)
- [ ] Capture 3D scene → canvas.toDataURL() / toBlob()
- [ ] Upload POST do `https://apps.easierit.org/igrid/feed/api/v1/snapshots/upload.php`
  ### 5.4 Snapshot Tools (CUSTOM — I-Grid + TasiaFeed)
  - [x] Capture 3D scene → canvas.toDataURL() / toBlob() — `SnapshotTools.ts` (320 linii): WebGLRenderer capture
  - [x] Upload POST do `https://apps.easierit.org/igrid/feed/api/v1/snapshots/upload.php` — full API integration
  - [x] Display w feedzie: `https://apps.easierit.org/igrid/feed/` — post URL returned from API
  - [ ] Custom UI design (dokumentacja od Marty)
  - [x] Camera angle selection (front, back, top, custom) — 4 preset angles
  - [x] Resolution/format options — PNG/JPEG/WebP, quality slider
  - Plik: `src/Client/src/ui/SnapshotTools.ts`
  - Backend: TasiaFeed PHP (już istnieje na apps.easierit.org)

---

## FAZA 6 — Chat Media (Giphy + YouTube)

### 6.1 YouTube Embed w chat
- [ ] Wykrywanie URL YouTube w wiadomościach chat/IM (regex: youtube.com/watch?v=... lub youtu.be/...)
- [ ] Auto-embed player: `https://apps.easierit.org/igrid/youtube-player/?v=VIDEO_ID`
- [ ] Iframe w wiadomości chatowej (max width: 320px, max height: 180px)
- [ ] Click → pełny ekran (overlay)
- Plik: `src/Client/src/ui/ChatMedia.ts` ← NIE ISTNIEJE

### 6.2 Giphy Embed w chat
- [ ] Wykrywanie Giphy URL w wiadomościach (regex: giphy.com/gifs/...)
- [ ] Auto-embed: thumbnail z Giphy API → iframe/wideo
- [ ] Format: `<img>` z GIF lub `<video>` z loop
- Plik: `src/Client/src/ui/ChatMedia.ts` ← NIE ISTNIEJE

### 6.3 Chat Media Panel
- [ ] Przycisk GIF w pasku chat (wybieracz Giphy)
- [ ] Przycisk YouTube wklejanie linku
- [ ] Podgląd mediów inline w chacie
- Plik: `src/Client/src/ui/ChatMedia.ts` ← NIE ISTNIEJE

---

## Podsumowanie postępu

| Faza | Zrobione | Razem | % |
|------|----------|-------|---|
| 1.1 Environment | 7/7 | 7 | **100%** ✅ |
| 1.2 Particles | 4/4 | 4 | **100%** ✅ |
| 1.3 Flexi Prims | 3/3 | 3 | **100%** ✅ |
| 1.4 Sound | 6/6 | 6 | **100%** ✅ |
| **FAZA 1** | **20/20** | **20** | **100%** ✅ |
| Faza 2 | 15/15 | 15 | **100%** ✅ |
| Faza 3 | 18/18 | 18 | **100%** ✅ |
| Faza 4 | 20/25 | 25 | **80%** |
| Faza 5 | 7/14 | 14 | **50%** |
| Faza 6 | 0/8 | 8 | 0% |
| **ŁĄCZNIE** | **80/108** | **108** | **74%** |

## Priorytet realizacji

**Kolejność**: Faza 1 → 2 → 3 → 4 → 5 → 6

W każdej fazie:
1. Implementuję feature
2. Testuję (logi konsoli + wizualnie)
3. Naprawiam bugi
4. Dopiero przechodzę dalej

**Następne do roboty**: FAZA 3 — Interakcja (3.1 Object Interaction)

**Testy**: Każda zmiana sprawdzana przez:
- Konsolę przeglądarki (F12)
- Logi serwera
- Wizualnie na drugim komputerze
- Porównanie z Firestorm screenshotami

## Istniejące pliki (stan faktyczny)

### Client (TypeScript) — 3,926 linii
| Plik | Linie | Opis |
|------|-------|------|
| engine/Environment.ts | 690 | Sky shader, presets, Windlight, fog, water, day/night |
| engine/SLMeshDecoder.ts | 676 | SL mesh format decoder |
| main.ts | 453 | Entry point, scene init, UI wiring |
| engine/AvatarSkeletonLoader.ts | 279 | Avatar skeleton bone loading |
| network/GridClient.ts | 277 | SignalR + OpenMetaverse client |
| engine/TerrainRenderer.ts | 254 | Terrain heightmap rendering |
| engine/SLAnimationPlayer.ts | 231 | SL animation playback |
| engine/SoundManager.ts | 224 | 3D positional audio (HRTF) |
| engine/AvatarRenderer.ts | 197 | Avatar mesh rendering |
| engine/ObjectRenderer.ts | 190 | Prim/object rendering |
| engine/PBRMaterialLoader.ts | 124 | PBR texture loading |
| engine/Camera.ts | 120 | Camera controls + d-pad |
| engine/MinimapRenderer.ts | 89 | Minimap overlay |
| engine/MeshDecoderWorker.ts | 65 | Web Worker for mesh decode |
| engine/SceneManager.ts | 57 | Three.js scene setup |
| engine/ParticleSystem.ts | 320 | Particle effects (spark/fire/smoke/glow/ring) |
| engine/FlexibleRenderer.ts | 180 | Flexible prim vertex displacement (spring physics) |
| engine/AnimationSystem.ts | 280 | Avatar animations (walk/fly/sit/idle, SL UUID mapping) |
| engine/AttachmentRenderer.ts | 280 | Avatar attachments (58 SL attachment points) |
| ui/ProfilePanel.ts | 180 | Avatar profile card popup |
| ui/GroupPanel.ts | 310 | Group list, chat, and notices |
| ui/InventoryPanel.ts | 400 | Inventory browser (folder tree, search, wear/rez) |
| engine/InteractionManager.ts | 130 | Object raycasting + sit/touch/pay |
| ui/AppearanceEditor.ts | 400 | Avatar appearance editor (wearables + visual params) |
| engine/HUDRenderer.ts | 210 | HUD attachment rendering (orthographic camera pass) |
| ui/SearchPanel.ts | 350 | Search UI (people/places/events/groups/classifieds) |
| engine/MediaManager.ts | 280 | Media/music streaming (Web Audio API + HTML5 iframes) |
| engine/BuildTools.ts | 300 | Build/edit tools (select/move/rotate/scale gizmos) |
| ui/LandTools.ts | 320 | Land/parcel management (buy/sell/subdivide/terraform) |
| ui/WorldMap.ts | 350 | World map with region grid, zoom/pan, teleport |
| ui/NotecardEditor.ts | 180 | Notecard text editor with save/modify tracking |
| ui/SnapshotTools.ts | 320 | Screenshot + TasiaFeed upload |

### Server (C#) — 1,772 linii
| Plik | Linie | Opis |
|------|-------|------|
| Hubs/ViewerHub.cs | 545 | Main hub: object updates, environment, sound, chat |
| Program.cs | 143 | Server bootstrap |
| Services/GridConnectionService.cs | 137 | OpenMetaverse grid connection |
| Controllers/AssetsController.cs | 125 | Asset proxy endpoint |
| Controllers/TexturesController.cs | 115 | Texture proxy endpoint |
| Hubs/HypergridHub.cs | 99 | Hypergrid teleport hub |
| Controllers/AvatarsController.cs | 87 | Avatar endpoints |
| Services/AuthService.cs | 77 | Authentication |
| Services/IMEncryption.cs | 74 | IM encryption |
| Models/Dtos.cs | 58 | Data transfer objects |
| Controllers/AuthController.cs | 43 | Auth endpoints |
| Data/AppDbContext.cs | 32 | Database context |
| Models/Avatar.cs | 28 | Avatar model |
| Models/User.cs | 23 | User model |

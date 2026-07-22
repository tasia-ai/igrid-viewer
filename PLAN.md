# I-Grid Viewer — Plan rozwoju do pełnego Firestorm

## Status obecny
✅ Działa: 3D scene, terrain, prims, mesh, chat, IM, friends, minimap, camera d-pad, teleport, preloader, reconnect, draw distance, Doritos currency, region/parcel info, account management, **sky shader (gradient + sun disc + glow + horizon), sky presets (day/sunset/night/mars), day/night cycle, PBR water, fog synced to draw distance, WindlightSettings from server, 3D positional audio (Web Audio API + HRTF panner), particle effects (spark/fire/smoke/glow/ring via THREE.Points), flexible prims (vertex displacement with spring physics), object sound tracking, procedural footsteps, ambient sound API**

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
- [ ] Attachment point rendering (58 points)
- [ ] Object placement on skeleton joints
- [ ] Rigged mesh binding (skin weights)
- Plik: `src/Client/src/engine/AttachmentRenderer.ts` ← NIE ISTNIEJE

### 2.3 Profile Cards
- [ ] Fetch agent profile (bio, picks, groups, friends, online)
- [ ] Display panel (avatar click → profile popup)
- Plik: `src/Client/src/ui/ProfilePanel.ts` ← NIE ISTNIEJE (folder ui/ pusty)
- Serwer: `client.Directory` search + profile fetch

### 2.4 Group System
- [ ] Group list (Groups tab w contacts)
- [ ] Group chat (group channel)
- [ ] Group title display
- [ ] Group notices
- Plik: `src/Client/src/ui/GroupPanel.ts` ← NIE ISTNIEJE
- Serwer: `client.Groups` events

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
- [ ] Folder tree (browse categories)
- [ ] Drag-drop wear (add clothing)
- [ ] Rez objects from inventory
- [ ] Take/drop objects
- [ ] Search inventory
- [ ] Notecards, landmarks, scripts
- Plik: `src/Client/src/ui/InventoryPanel.ts` ← NIE ISTNIEJE
- Serwer: `client.Inventory` full API

### 3.3 Appearance System
- [ ] Wearable editor (shape, skin, hair, eyes, shirt, pants, etc.)
- [ ] Visual param sliders
- [ ] Bake trigger → upload baked texture
- Plik: `src/Client/src/ui/AppearanceEditor.ts` ← NIE ISTNIEJE
- Serwer: `client.Appearance` API

### 3.4 HUD Attachments
- [ ] Special camera pass for HUD objects
- [ ] Fixed screen position rendering
- [ ] 58 attachment points (HUD-specific)
- Plik: `src/Client/src/engine/HUDRenderer.ts` ← NIE ISTNIEJE

---

## FAZA 4 — Tworzenie i odkrywanie

### 4.1 Search System
- [ ] People search (`DirectoryManager.StartPeopleSearch`)
- [ ] Places search (`DirectoryManager.StartPlacesSearch`)
- [ ] Events search
- [ ] Classifieds
- Plik: `src/Client/src/ui/SearchPanel.ts` ← NIE ISTNIEJE

### 4.2 Build/Edit Tools
- [ ] Create objects (rez)
- [ ] Select/Edit objects
- [ ] Move/Rotate/Scale gizmo
- [ ] Texture picker (pipette)
- [ ] Edit window (General/Features/Media/Texture tabs)
- [ ] Permissions editor
- Plik: `src/Client/src/engine/BuildTools.ts` ← NIE ISTNIEJE

### 4.3 Land/Parcel Tools
- [ ] Buy/Sell parcels
- [ ] Subdivide/Join parcels
- [ ] Set access/ban list
- [ ] Terraform (terrain brush)
- [ ] Set home point
- Plik: `src/Client/src/ui/LandTools.ts` ← NIE ISTNIEJE

### 4.4 World Map (full)
- [ ] Map tiles from grid
- [ ] Parcel overlay
- [ ] Region grid
- [ ] Teleport by click
- Plik: `src/Client/src/ui/WorldMap.ts` ← NIE ISTNIEJE

### 4.5 Media/Music Streaming
- [ ] Parcel music (SHOUTcast/Icecast → Web Audio API)
- [ ] Media textures (HTML5 iframe overlay)
- [ ] Volume controls
- [ ] Stream title display
- Plik: `src/Client/src/engine/MediaManager.ts` ← NIE ISTNIEJE
- Serwer: `ParcelMediaCommand` event

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
- [ ] Plain text editing
- [ ] Save changes
- Plik: `src/Client/src/ui/NotecardEditor.ts` ← NIE ISTNIEJE

### 5.3 Upload Tools
- [ ] Texture upload
- [ ] Sound upload
- [ ] Animation upload
- [ ] Mesh model upload
- Plik: `src/Client/src/ui/UploadTools.ts` ← NIE ISTNIEJE

### 5.4 Snapshot Tools (CUSTOM — I-Grid + TasiaFeed)
- [ ] Capture 3D scene → canvas.toDataURL() / toBlob()
- [ ] Upload POST do `https://apps.easierit.org/igrid/feed/api/v1/snapshots/upload.php`
  - Body JSON: `{ image, title, description, visibility, maturity, avatar_name, grid_name, region_name, position, viewer_ver }`
  - `image` = base64-encoded JPEG/PNG/WebP
  - `visibility` = "public" / "unlisted"
  - `maturity` = "general" / "moderate" / "restricted"
  - Response: `{ success, post_url, message }`
- [ ] Display w feedzie: `https://apps.easierit.org/igrid/feed/`
- [ ] Custom UI design (dokumentacja od Marty)
- [ ] Camera angle selection (front, back, top, custom)
- [ ] Resolution/format options
- Plik: `src/Client/src/ui/SnapshotTools.ts` ← NIE ISTNIEJE
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
| Faza 2 | 5/11 | 11 | **45%** |
| Faza 3 | 0/16 | 16 | 0% |
| Faza 4 | 0/18 | 18 | 0% |
| Faza 5 | 0/10 | 10 | 0% |
| Faza 6 | 0/8 | 8 | 0% |
| **ŁĄCZNIE** | **25/81** | **81** | **31%** |

## Priorytet realizacji

**Kolejność**: Faza 1 → 2 → 3 → 4 → 5 → 6

W każdej fazie:
1. Implementuję feature
2. Testuję (logi konsoli + wizualnie)
3. Naprawiam bugi
4. Dopiero przechodzę dalej

**Następne do roboty**: 2.2 Avatar Attachments

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

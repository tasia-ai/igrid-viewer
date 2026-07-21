# I-Grid Viewer — Plan rozwoju do pełnego Firestorm

## Status obecny
✅ Działa: 3D scene, terrain, prims, mesh, chat, IM, friends, minimap, camera d-pad, teleport, preloader, reconnect, draw distance, Doritos currency, region/parcel info, account management

## FAZA 1 — Świat żyje (wizualnie)

### 1.1 Environment / Windlight / EEP
- [ ] Sky shader (gradient + słońce)
- [ ] Cykl dzień/noc
- [ ] Woda z PBR (reflection, transparency)
- [ ] Fog depth adjustowany do draw distance
- [ ] Sky presets (day, sunset, night, custom)
- Plik: `src/Client/src/engine/Environment.ts`
- Serwer: `EnvironmentUpdate` event z `OpenMetaverse.WindlightSettings`

### 1.2 Particle Effects
- [ ] UDP `ParticleUpdate` → Three.js `Points` / `Sprite`
- [ ] System: pozycja, kolor, rozmiar, prędkość, TTL
- [ ] Typy: spark, fire, smoke, smoke plume, glow, ring
- Plik: `src/Client/src/engine/ParticleSystem.ts`
- Serwer: subskrypcja `client.Objects.ObjectUpdate` + particle data

### 1.3 Flexible Prims
- [ ] Flexi-enabled prims (flagi, włosy, tkanina)
- [ ] Vertex displacement based on wind/physics
- [ ] Segment count z PrimData.PathSegments
- Plik: `src/Client/src/engine/FlexibleRenderer.ts`

### 1.4 Sound Effects
- [ ] 3D positional audio via Web Audio API
- [ ] Ambient sounds (region environment)
- [ ] Object sounds (PreloadSound, AttachedSound events)
- [ ] Footstep sounds
- Plik: `src/Client/src/engine/SoundManager.ts`
- Serwer: `client.Self.ChatFromSimulator` + `AttachedSound` events

---

## FAZA 2 — Ludzie (social)

### 2.1 Avatar Animations
- [ ] Fetch animation assets z gridu (RequestAsset)
- [ ] Skeleton skinning matrix updates per frame
- [ ] Animacje: idle, walk, fly, sit, gesture
- [ ] Bento joints (additional bones)
- Plik: `src/Client/src/engine/AnimationSystem.ts`
- Serwer: `client.Objects.AvatarAnimation` event

### 2.2 Avatar Attachments
- [ ] Attachment point rendering (58 points)
- [ ] Object placement on skeleton joints
- [ ] Rigged mesh binding (skin weights)
- Plik: `src/Client/src/engine/AttachmentRenderer.ts`

### 2.3 Profile Cards
- [ ] Fetch agent profile (bio, picks, groups, friends, online)
- [ ] Display panel (avatar click → profile popup)
- Plik: `src/Client/src/ui/ProfilePanel.ts`
- Serwer: `client.Directory` search + profile fetch

### 2.4 Group System
- [ ] Group list (Groups tab w contacts)
- [ ] Group chat (group channel)
- [ ] Group title display
- [ ] Group notices
- Plik: `src/Client/src/ui/GroupPanel.ts`
- Serwer: `client.Groups` events

---

## FAZA 3 — Interakcja

### 3.1 Object Interaction
- [ ] Click → RequestSit / Touch / Pay
- [ ] Sit on chairs/objects (avatar attaches to object)
- [ ] Touch objects (ClickAction)
- [ ] Pay objects (MoneyBalance)
- Plik: `src/Client/src/engine/InteractionManager.ts`
- Serwer: `client.Self.RequestSit()`, `client.Self.Touch()`

### 3.2 Inventory System
- [ ] Folder tree (browse categories)
- [ ] Drag-drop wear (add clothing)
- [ ] Rez objects from inventory
- [ ] Take/drop objects
- [ ] Search inventory
- [ ] Notecards, landmarks, scripts
- Plik: `src/Client/src/ui/InventoryPanel.ts`
- Serwer: `client.Inventory` full API

### 3.3 Appearance System
- [ ] Wearable editor (shape, skin, hair, eyes, shirt, pants, etc.)
- [ ] Visual param sliders
- [ ] Bake trigger → upload baked texture
- Plik: `src/Client/src/ui/AppearanceEditor.ts`
- Serwer: `client.Appearance` API

### 3.4 HUD Attachments
- [ ] Special camera pass for HUD objects
- [ ] Fixed screen position rendering
- [ ] 58 attachment points (HUD-specific)
- Plik: `src/Client/src/engine/HUDRenderer.ts`

---

## FAZA 4 — Tworzenie i odkrywanie

### 4.1 Search System
- [ ] People search (`DirectoryManager.StartPeopleSearch`)
- [ ] Places search (`DirectoryManager.StartPlacesSearch`)
- [ ] Events search
- [ ] Classifieds
- Plik: `src/Client/src/ui/SearchPanel.ts`

### 4.2 Build/Edit Tools
- [ ] Create objects (rez)
- [ ] Select/Edit objects
- [ ] Move/Rotate/Scale gizmo
- [ ] Texture picker (pipette)
- [ ] Edit window (General/Features/Media/Texture tabs)
- [ ] Permissions editor
- Plik: `src/Client/src/engine/BuildTools.ts`

### 4.3 Land/Parcel Tools
- [ ] Buy/Sell parcels
- [ ] Subdivide/Join parcels
- [ ] Set access/ban list
- [ ] Terraform (terrain brush)
- [ ] Set home point
- Plik: `src/Client/src/ui/LandTools.ts`

### 4.4 World Map (full)
- [ ] Map tiles from grid
- [ ] Parcel overlay
- [ ] Region grid
- [ ] Teleport by click
- Plik: `src/Client/src/ui/WorldMap.ts`

### 4.5 Media/Music Streaming
- [ ] Parcel music (SHOUTcast/Icecast → Web Audio API)
- [ ] Media textures (HTML5 iframe overlay)
- [ ] Volume controls
- [ ] Stream title display
- Plik: `src/Client/src/engine/MediaManager.ts`
- Serwer: `ParcelMediaCommand` event

### 4.6 Voice Chat
- [ ] WebRTC via Vivox SDK lub open alternative
- [ ] Mute/Unmute
- Plik: `src/Client/src/engine/VoiceChat.ts`

---

## FAZA 5 — Power Users

### 5.1 Script Editor
- [ ] LSL syntax highlighting
- [ ] Compile/Debug
- Plik: `src/Client/src/ui/ScriptEditor.ts`

### 5.2 Notecard Editor
- [ ] Plain text editing
- [ ] Save changes
- Plik: `src/Client/src/ui/NotecardEditor.ts`

### 5.3 Upload Tools
- [ ] Texture upload
- [ ] Sound upload
- [ ] Animation upload
- [ ] Mesh model upload
- Plik: `src/Client/src/ui/UploadTools.ts`

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
- Plik: `src/Client/src/ui/SnapshotTools.ts`
- Backend: TasiaFeed PHP (już istnieje na apps.easierit.org)

---

## FAZA 6 — Chat Media (Giphy + YouTube)

### 6.1 YouTube Embed w chat
- [ ] Wykrywanie URL YouTube w wiadomościach chat/IM (regex: youtube.com/watch?v=... lub youtu.be/...)
- [ ] Auto-embed player: `https://apps.easierit.org/igrid/youtube-player/?v=VIDEO_ID`
- [ ] Iframe w wiadomości chatowej (max width: 320px, max height: 180px)
- [ ] Click → pełny ekran (overlay)
- Plik: `src/Client/src/ui/ChatMedia.ts`

### 6.2 Giphy Embed w chat
- [ ] Wykrywanie Giphy URL w wiadomościach (regex: giphy.com/gifs/...)
- [ ] Auto-embed: thumbnail z Giphy API → iframe/wideo
- [ ] Format: `<img>` z GIF lub `<video>` z loop
- Plik: `src/Client/src/ui/ChatMedia.ts`

### 6.3 Chat Media Panel
- [ ] Przycisk GIF w pasku chat (wybieracz Giphy)
- [ ] Przycisk YouTube wklejanie linku
- [ ] Podgląd mediów inline w chacie
- Plik: `src/Client/src/ui/ChatMedia.ts`

---

## Priorytet realizacji

**Kolejność**: Faza 1 → 2 → 3 → 4 → 5 → 6

W każdej fazie:
1. Implementuję feature
2. Testuję (logi konsoli + wizualnie)
3. Naprawiam bugi
4. Dopiero przechodzę dalej

**Testy**: Każda zmiana sprawdzana przez:
- Konsolę przeglądarki (F12)
- Logi serwera
- Wizualnie na drugim komputerze
- Porównanie z Firestorm screenshotami

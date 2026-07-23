import * as signalR from '@microsoft/signalr';
import * as THREE from 'three';
import { SceneManager } from '../engine/SceneManager';
import { CameraController } from '../engine/Camera';
import { TerrainRenderer } from '../engine/TerrainRenderer';
import { ObjectRenderer } from '../engine/ObjectRenderer';
import { AvatarRenderer } from '../engine/AvatarRenderer';
import { PBRMaterialLoader } from '../engine/PBRMaterialLoader';
import { type WindlightSettings } from '../engine/Environment';
import { SoundManager } from '../engine/SoundManager';
import { ParticleSystemManager, type ParticleSystemData } from '../engine/ParticleSystem';
import { FlexibleRenderer, type FlexibleData } from '../engine/FlexibleRenderer';
import { AnimationSystem } from '../engine/AnimationSystem';
import { AttachmentRenderer, type AttachmentData } from '../engine/AttachmentRenderer';
import { ProfilePanel, type ProfileData } from '../ui/ProfilePanel';
import { GroupPanel, type GroupData } from '../ui/GroupPanel';
import { InteractionManager, type InteractionResult, type InteractionType } from '../engine/InteractionManager';
import { InventoryPanel, type InventoryFolder, type InventoryItem, type InventoryAction } from '../ui/InventoryPanel';
import { AppearanceEditor } from '../ui/AppearanceEditor';
import { HUDRenderer } from '../engine/HUDRenderer';
import { SearchPanel, type SearchCategory, type SearchResult } from '../ui/SearchPanel';
import { MediaManager } from '../engine/MediaManager';
import { BuildTools, type BuildTool, type SelectedObject } from '../engine/BuildTools';
import { LandTools, type ParcelInfo } from '../ui/LandTools';
import { WorldMap } from '../ui/WorldMap';
import { NotecardEditor } from '../ui/NotecardEditor';
import { SnapshotTools, type SnapshotOptions } from '../ui/SnapshotTools';
import { ChatMedia } from '../ui/ChatMedia';
import { ScriptEditor, type CompileResult } from '../ui/ScriptEditor';
import { UploadTools } from '../ui/UploadTools';
import { VoiceChat } from '../engine/VoiceChat';
import { EditWindow, type ObjectEditData } from '../engine/BuildTools';

/**
 * Bridges the browser to the ViewerHub + HypergridHub via SignalR.
 * Receives world events and dispatches them to the 3D renderers.
 */
export class GridClient {
  private connection: signalR.HubConnection;
  private hypergridConnection: signalR.HubConnection | null = null;
  private terrain: TerrainRenderer;
  private objects: ObjectRenderer;
  private avatars: AvatarRenderer;
  public camera: CameraController;
  public materialLoader: PBRMaterialLoader;
  public soundManager: SoundManager;
  public particleManager: ParticleSystemManager;
  public flexibleRenderer: FlexibleRenderer;
  public animationSystem: AnimationSystem;
  public attachmentRenderer: AttachmentRenderer;
  public profilePanel: ProfilePanel;
  public groupPanel: GroupPanel;
  public interactionManager: InteractionManager;
  public inventoryPanel: InventoryPanel;
  public appearanceEditor: AppearanceEditor;
  public hudRenderer: HUDRenderer;
  public searchPanel: SearchPanel;
  public mediaManager: MediaManager;
  public buildTools: BuildTools;
  public landTools: LandTools;
  public worldMap: WorldMap;
  public notecardEditor: NotecardEditor;
  public snapshotTools: SnapshotTools;
  public chatMedia: ChatMedia;
  public scriptEditor: ScriptEditor;
  public uploadTools: UploadTools;
  public voiceChat: VoiceChat;
  public editWindow: EditWindow;
  private _connected = false;

  public get connected(): boolean {
    return this._connected;
  }

  constructor(
    private sceneManager: SceneManager,
    private authToken: string,
    private baseUrl: string,
    private onChatMessage?: (from: string, message: string) => void,
    private onPositionUpdate?: (x: number, y: number, z: number) => void,
    private onTeleportStarted?: (destination: string, gridUri?: string, region?: string) => void,
    private onFriendUpdate?: (id: string, name: string, online: boolean) => void,
    private onIM?: (from: string, message: string, fromId?: string) => void,
    private onTerrainPatch?: (x: number, y: number, heights: Float32Array) => void,
    private onRegionConnected?: (regionName: string, regionX: number, regionY: number) => void,
    private onParcelInfo?: (name: string, area: number) => void,
    private onBalanceUpdate?: (balance: number) => void,
    private onCurrencySymbol?: (symbol: string) => void,
    private onIMHistory?: (otherId: string, otherName: string, messages: { from: string; text: string; time: string }[]) => void,
  ) {
    this.materialLoader = new PBRMaterialLoader(baseUrl, authToken);
    this.terrain = new TerrainRenderer(sceneManager.scene, baseUrl, authToken);
    this.objects = new ObjectRenderer(sceneManager.scene, this.materialLoader);
    this.animationSystem = new AnimationSystem(sceneManager.scene);
    this.attachmentRenderer = new AttachmentRenderer(sceneManager.scene);
    this.profilePanel = new ProfilePanel();
    this.groupPanel = new GroupPanel();
    this.interactionManager = new InteractionManager(sceneManager.scene, sceneManager.camera);
    this.inventoryPanel = new InventoryPanel({
      onAction: (action, target) => this.handleInventoryAction(action, target),
    });
    this.appearanceEditor = new AppearanceEditor({
      onParamChange: (paramId, value) => this.connection?.invoke('SetVisualParam', paramId, value),
      onBake: () => this.connection?.invoke('BakeAppearance'),
    });
    this.hudRenderer = new HUDRenderer(sceneManager.scene, sceneManager.renderer);
    this.searchPanel = new SearchPanel({
      onSearch: (category, query) => this.handleSearch(category, query),
      onResultClick: (result) => this.handleSearchResultClick(result),
    });
    this.mediaManager = new MediaManager();
    this.buildTools = new BuildTools(sceneManager.scene, sceneManager.camera, sceneManager.renderer);
    this.buildTools.setCallbacks({
      onEditProperty: (objectId, property, value) => this.connection?.invoke('SetObjectProperty', objectId, property, value),
    });
    this.landTools = new LandTools({
      onAction: (action, data) => this.connection?.invoke('LandAction', action, data),
    });
    this.worldMap = new WorldMap({
      onTeleport: (regionId, _x, _y) => this.teleport(regionId),
    });
    this.notecardEditor = new NotecardEditor({
      onSave: (id, content) => this.connection?.invoke('SaveNotecard', id, content),
    });
    this.snapshotTools = new SnapshotTools({
      onCapture: (imageData, options) => this.handleSnapshot(imageData, options),
    });
    this.chatMedia = new ChatMedia();
    this.scriptEditor = new ScriptEditor({
      onSave: (id, content, mono) => this.connection?.invoke('UpdateScript', id, content, mono),
      onCompile: (id, content) => this.connection?.invoke('UpdateScript', id, content, true),
    });
    this.uploadTools = new UploadTools({
      onUpload: (data) => this.connection?.invoke('UploadAsset', data.type, data.name, data.description || ''),
    });
    this.voiceChat = new VoiceChat({
      onToggle: (enabled) => console.log('[Voice]', enabled ? 'enabled' : 'disabled'),
    });
    this.editWindow = new EditWindow({
      onChange: (objectId, prop, value) => this.connection?.invoke('SetObjectProperty', objectId, prop, value),
    });
    // Set up interaction callback
    this.interactionManager.setCallback((result, type) => {
      this.handleInteraction(result, type);
    });

    this.avatars = new AvatarRenderer(sceneManager.scene, this.animationSystem, this.attachmentRenderer);
    this.camera = new CameraController(sceneManager.camera, sceneManager.renderer.domElement);
    this.soundManager = new SoundManager(baseUrl, authToken);
    this.particleManager = new ParticleSystemManager(sceneManager.scene);
    this.flexibleRenderer = new FlexibleRenderer(sceneManager.scene);

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/hubs/viewer', {
        accessTokenFactory: () => this.authToken,
      })
      .withAutomaticReconnect()
      .build();

    this.setupEventHandlers(this.connection);
  }

  private setupEventHandlers(hub: signalR.HubConnection): void {
    hub.on('AvatarConnected', (data: any) => {
      console.log('[Grid] Connected as:', data.firstName, 'in', data.regionName);
      this._connected = true;
      this.camera.setTarget(
        new THREE.Vector3(data.position.x, data.position.z, data.position.y)
      );
      this.onRegionConnected?.(data.regionName, data.regionX, data.regionY);
      this.onBalanceUpdate?.(data.balance);
      this.onCurrencySymbol?.(data.currencySymbol);
    });

    hub.on('ObjectUpdate', (data: any) => {
      const camPos = this.sceneManager?.camera?.position;
      this.objects.updatePrim({
        id: data.id,
        name: data.name,
        position: data.position,
        rotation: data.rotation,
        scale: data.scale,
        primType: data.primType,
        textureId: data.textureId,
        faces: data.faces,
      }, camPos).catch(err => console.warn('[Grid] updatePrim error:', err));
      // Update tracked sound positions
      this.soundManager.updateSoundPosition(data.id, {
        x: data.position.x, y: data.position.z, z: data.position.y
      });
    });

    hub.on('MeshData', async (data: any) => {
      try {
        const meshBytes = Uint8Array.from(atob(data.data), c => c.charCodeAt(0));
        // Non-blocking mesh decode + geometry swap
        this.objects.replaceMeshGeometry(data.id, meshBytes.buffer);
      } catch (err) {
        console.warn('[Grid] Failed to decode mesh:', err);
      }
    });

    hub.on('AvatarUpdate', async (data: any) => {
      await this.avatars.updateAvatar({
        id: data.id,
        name: data.name,
        position: data.position,
        rotation: data.rotation,
        bakedTextures: data.bakedTextures,
      });
    });

    hub.on('TerrainPatch', (data: any) => {
      if (data.heights) {
        const heights = new Float32Array(data.heights);
        this.terrain.updatePatch(data.x, data.y, heights);
        this.onTerrainPatch?.(data.x, data.y, heights);
      }
    });

    hub.on('ChatMessage', (data: any) => {
      this.onChatMessage?.(data.from, data.message);
    });

    hub.on('MyPosition', (data: any) => {
      this.camera.setTarget(new THREE.Vector3(data.x, data.z, data.y));
      this.onPositionUpdate?.(data.x, data.y, data.z);
    });

    hub.on('TeleportStarted', (data: any) => {
      console.log('[Grid] Teleport started:', data.destination);
      this.onTeleportStarted?.(data.destination, data.gridUri, data.region);
    });

    hub.on('FriendUpdate', (data: any) => {
      this.onFriendUpdate?.(data.id, data.name, data.online);
    });

    hub.on('FriendOnline', (data: any) => {
      this.onFriendUpdate?.(data.id, data.name, true);
    });

    hub.on('FriendOffline', (data: any) => {
      this.onFriendUpdate?.(data.id, data.name, false);
    });

    hub.on('InstantMessage', (data: any) => {
      this.onIM?.(data.from, data.message, data.fromId);
    });

    hub.on('IMHistory', (data: any) => {
      this.onIMHistory?.(data.otherId, data.otherName, data.messages);
    });

    hub.on('ParcelInfo', (data: any) => {
      this.onParcelInfo?.(data.name, data.area);
    });

    hub.on('BalanceUpdate', (data: any) => {
      this.onBalanceUpdate?.(data.balance);
    });

    hub.on('EnvironmentUpdate', (data: WindlightSettings) => {
      console.log('[Grid] Environment update received, timeOfDay:', data.timeOfDay?.toFixed(2));
      this.sceneManager.environment.applyWindlightSettings(data);
    });

    hub.on('AttachedSound', (data: any) => {
      // Play at the object's position if we know it
      const obj = this.objects.getPrim(data.objectId);
      const pos = obj?.position || { x: 0, y: 0, z: 0 };
      this.soundManager.playSound(data.soundId, { x: pos.x, y: pos.z, z: pos.y }, data.gain, false, data.objectId);
    });

    hub.on('PreloadSound', (data: any) => {
      // Preload the asset into the cache so it's ready when playback starts
      this.soundManager.playSound(data.soundId, { x: 0, y: 0, z: 0 }, 0, false).catch(() => {});
    });

    hub.on('PrimSoundUpdate', (data: any) => {
      const obj = this.objects.getPrim(data.objectId);
      const pos = obj?.position || { x: 0, y: 0, z: 0 };
      this.soundManager.playSound(data.soundId, { x: pos.x, y: pos.z, z: pos.y }, data.gain, true, data.objectId);
    });

    hub.on('AmbientSound', (data: any) => {
      this.soundManager.playAmbient(data.soundId, data.gain ?? 0.3);
    });

    hub.on('ObjectAnimation', (data: any) => {
      this.animationSystem.updateAnimations(data.objectId, data.animations);
    });

    hub.on('SelfAnimation', (data: any) => {
      // Self animations — apply to our own avatar
      // The avatar ID comes from AvatarConnected
      this.animationSystem.updateAnimations('self', data.animations);
    });

    hub.on('AttachmentUpdate', (data: any) => {
      const attData: AttachmentData = {
        avatarId: data.avatarId,
        attachmentPoint: data.attachmentPoint,
        objectId: data.objectId,
        objectName: data.objectName,
        position: data.position,
        rotation: data.rotation,
        scale: data.scale,
      };
      this.attachmentRenderer.updateAttachment(attData);
    });

    hub.on('ProfileData', (data: any) => {
      const profile: ProfileData = {
        id: data.avatarId,
        name: data.avatarId, // Will be overridden by caller
        title: data.title,
        profileImage: data.profileImage !== '00000000-0000-0000-0000-000000000000'
          ? `${this.baseUrl}/api/assets/${data.profileImage}` : undefined,
        bio: data.about,
        homeLocation: data.homeLocation,
        online: data.online,
        lastLogin: data.memberSince,
      };
      this.profilePanel.show(profile);
    });

    hub.on('GroupList', (data: any) => {
      const groups: GroupData[] = data.groups.map((g: any) => ({
        id: g.id,
        name: g.name,
        title: g.title,
        memberCount: g.memberCount,
        motto: g.motto,
        insignia: g.insignia ? `${this.baseUrl}/api/assets/${g.insignia}` : undefined,
      }));
      this.groupPanel.updateGroups(groups);
    });

    hub.on('GroupChat', (data: any) => {
      this.groupPanel.addChatMessage(data.senderName, data.message);
    });

    hub.on('GroupNotices', (data: any) => {
      // Notices are stored but not yet rendered in the panel
      console.log(`[Groups] Received ${data.notices.length} notices for group ${data.groupId}`);
    });

    hub.on('InventoryRoot', (data: any) => {
      this.inventoryPanel.setInventory(data);
    });

    hub.on('FolderExpanded', (data: any) => {
      this.inventoryPanel.expandFolder(data.folderId, data.folders, data.items);
    });

    hub.on('SearchResults', (data: any) => {
      const results: SearchResult[] = data.results.map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        category: data.category,
        online: r.online,
        distance: r.distance,
        price: r.price,
        date: r.date,
        maturity: r.maturity,
      }));
      this.searchPanel.setResults(results);
    });

    hub.on('FlexibleUpdate', (data: any) => {
      const flexData: FlexibleData = {
        objectId: data.objectId,
        softness: data.softness,
        gravity: data.gravity,
        drag: data.drag,
        wind: data.wind,
        tension: data.tension,
        forceX: data.forceX,
        forceY: data.forceY,
        forceZ: data.forceZ,
        segmentCount: data.segmentCount,
        position: data.position,
        rotation: data.rotation,
        scale: data.scale,
      };
      // Get the object's group and mesh from ObjectRenderer
      const obj = this.objects.getPrim(data.objectId);
      if (obj) {
        let mesh: THREE.Mesh | null = null;
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh && !mesh) mesh = child;
        });
        if (mesh) {
          this.flexibleRenderer.addFlexible(flexData, obj as THREE.Group, mesh);
        }
      }
    });

    hub.on('ParticleSystemUpdate', (data: any) => {
      const particleData: ParticleSystemData = {
        objectId: data.objectId,
        textureId: data.textureId,
        burstSphereRate: data.burstSphereRate,
        burstSphereRadius: data.burstSphereRadius,
        maxAge: data.maxAge,
        lifetime: data.lifetime,
        lifetimeVariance: data.lifetimeVariance,
        initialSpeed: data.initialSpeed,
        finalSpeed: data.finalSpeed,
        initialAcceleration: data.initialAcceleration,
        finalAcceleration: data.finalAcceleration,
        initialSize: data.initialSize,
        finalSize: data.finalSize,
        startColor: { r: data.startColor.r, g: data.startColor.g, b: data.startColor.b, a: data.startColor.a },
        endColor: { r: data.endColor.r, g: data.endColor.g, b: data.endColor.b, a: data.endColor.a },
        pattern: data.pattern,
        flags: data.flags,
      };
      // Get the object's position from the ObjectRenderer if available
      const obj = this.objects.getPrim(data.objectId);
      const pos = obj?.position;
      this.particleManager.updateSystem(particleData, pos);
    });

    hub.on('Error', (message: string) => {
      console.error('[Grid] Error:', message);
    });

    hub.onreconnected(() => {
      console.log('[Grid] Reconnected');
    });

    hub.onclose((err) => {
      console.warn('[Grid] Connection closed:', err);
      this._connected = false;
    });
  }

  /**
   * Start the SignalR connection.
   */
  async start(): Promise<void> {
    await this.connection.start();
    console.log('[Grid] SignalR connected');
  }

  /**
   * Connect Hypergrid hub for cross-grid teleports.
   */
  private async ensureHypergridHub(): Promise<signalR.HubConnection> {
    if (this.hypergridConnection) return this.hypergridConnection;

    this.hypergridConnection = new signalR.HubConnectionBuilder()
      .withUrl('/hubs/hypergrid', {
        accessTokenFactory: () => this.authToken,
      })
      .withAutomaticReconnect()
      .build();

    this.setupEventHandlers(this.hypergridConnection);
    await this.hypergridConnection.start();
    console.log('[Grid] Hypergrid hub connected');
    return this.hypergridConnection;
  }

  /**
   * Request to connect an avatar to the grid.
   */
  async connectAvatar(avatarId: number, gridUrl?: string, startLocation?: string, regionName?: string): Promise<void> {
    await this.connection.invoke('ConnectAvatar', avatarId, gridUrl || null, startLocation || null, regionName || null);
  }

  /**
   * Send an instant message to another avatar.
   */
  async sendIM(targetId: string, message: string): Promise<void> {
    await this.connection.invoke('SendIM', targetId, message);
  }

  async clearIMHistory(otherId?: string): Promise<void> {
    await this.connection.invoke('ClearIMHistory', otherId || null);
  }

  /**
   * Send a chat message to the current region.
   */
  async sendChat(message: string, channel: number = 0): Promise<void> {
    await this.connection.invoke('SendChat', message, channel);
  }

  /**
   * Teleport to a named region on the current grid.
   */
  async teleport(regionName: string): Promise<void> {
    await this.connection.invoke('Teleport', regionName);
  }

  /**
   * Hypergrid teleport to a foreign grid.
   * Supports formats:
   *   - "Region Name" (same grid)
   *   - "https://grid.com:8002/Region Name"
   *   - "user@grid.com:8002/Region Name"
   */
  async hypergridTeleport(destination: string): Promise<void> {
    const hgHub = await this.ensureHypergridHub();
    await hgHub.invoke('HypergridTeleport', destination);
  }

  /**
   * Request an avatar's profile data from the server.
   */
  async requestProfile(avatarId: string): Promise<void> {
    if (!this.connection) return;
    await this.connection.invoke('RequestProfile', avatarId);
  }

  /**
   * Handle snapshot capture and upload to TasiaFeed.
   */
  private handleSnapshot(imageData: string, options: SnapshotOptions): void {
    const metadata = {
      avatarName: 'Avatar',
      gridName: 'I-Grid',
      regionName: 'Current Region',
      position: '0, 0, 0',
    };
    this.snapshotTools.uploadToFeed(imageData, options, metadata).then((result) => {
      if (result.success) {
        console.log('[Snapshot] Uploaded:', result.postUrl);
      } else {
        console.error('[Snapshot] Upload failed:', result.message);
      }
    });
  }

  /**
   * Handle search requests from the SearchPanel.
   */
  private handleSearch(category: SearchCategory, query: string): void {
    if (!this.connection) return;
    switch (category) {
      case 'people': this.connection.invoke('SearchPeople', query); break;
      case 'places': this.connection.invoke('SearchPlaces', query); break;
      case 'events': this.connection.invoke('SearchEvents', query); break;
      case 'groups': this.connection.invoke('SearchGroups', query); break;
      case 'classifieds': this.connection.invoke('SearchClassifieds', query); break;
    }
  }

  /**
   * Handle search result clicks (e.g., teleport to place, view profile).
   */
  private handleSearchResultClick(result: SearchResult): void {
    if (!this.connection) return;
    if (result.category === 'people') {
      this.connection.invoke('RequestProfile', result.id);
    }
  }

  /**
   * Handle inventory actions (wear/rez/take/delete).
   */
  private handleInventoryAction(action: InventoryAction, target: any): void {
    if (!this.connection) return;

    switch (action) {
      case 'rez':
        this.connection.invoke('RezObject', target.id);
        break;
      case 'wear':
        this.connection.invoke('WearItem', target.id);
        break;
      case 'take':
        // TODO: Need local object ID
        console.log('[Inventory] Take object - need local ID');
        break;
      case 'delete':
        console.log(`[Inventory] Delete: ${target.name}`);
        break;
      case 'rename':
        console.log(`[Inventory] Open folder: ${target.name}`);
        this.connection.invoke('ExpandFolder', target.id);
        break;
    }
  }

  /**
   * Handle object interactions from the InteractionManager.
   */
  private handleInteraction(result: InteractionResult, type: InteractionType): void {
    if (!this.connection) return;

    switch (type) {
      case 'sit':
        this.connection.invoke('RequestSit', 'self', result.objectId);
        break;
      case 'touch':
        this.connection.invoke('TouchObject', result.objectId);
        break;
      case 'pay':
        // TODO: Show pay dialog
        console.log(`[Interaction] Pay object: ${result.objectName}`);
        break;
      default:
        console.log(`[Interaction] ${type} on ${result.objectName} (${result.objectId})`);
    }
  }

  /**
   * Stand up from current sit target.
   */
  async standUp(): Promise<void> {
    if (!this.connection) return;
    await this.connection.invoke('StandUp');
  }

  /**
   * Disconnect from the server.
   */
  async stop(): Promise<void> {
    this.soundManager.dispose();
    this.particleManager.clear();
    this.flexibleRenderer.clear();
    this.animationSystem.clear();
    this.attachmentRenderer.clear();
    this.profilePanel.dispose();
    this.groupPanel.dispose();
    this.interactionManager.dispose();
    this.inventoryPanel.dispose();
    this.appearanceEditor.dispose();
    this.hudRenderer.dispose();
    this.searchPanel.dispose();
    this.mediaManager.dispose();
    this.buildTools.dispose();
    this.landTools.dispose();
    this.worldMap.dispose();
    this.notecardEditor.dispose();
    this.snapshotTools.dispose();
    this.chatMedia.dispose();
    this.scriptEditor.dispose();
    this.uploadTools.dispose();
    this.voiceChat.dispose();
    this.editWindow.dispose();
    this.materialLoader.dispose();
    if (this.hypergridConnection) {
      await this.hypergridConnection.stop();
      this.hypergridConnection = null;
    }
    await this.connection.stop();
    this._connected = false;
  }
}

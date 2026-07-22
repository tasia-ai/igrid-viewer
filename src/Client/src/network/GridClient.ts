import * as signalR from '@microsoft/signalr';
import * as THREE from 'three';
import { SceneManager } from '../engine/SceneManager';
import { CameraController } from '../engine/Camera';
import { TerrainRenderer } from '../engine/TerrainRenderer';
import { ObjectRenderer } from '../engine/ObjectRenderer';
import { AvatarRenderer } from '../engine/AvatarRenderer';
import { PBRMaterialLoader } from '../engine/PBRMaterialLoader';
import { type WindlightSettings } from '../engine/Environment';

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
    this.avatars = new AvatarRenderer(sceneManager.scene);
    this.camera = new CameraController(sceneManager.camera, sceneManager.renderer.domElement);

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
  async connectAvatar(avatarId: number): Promise<void> {
    await this.connection.invoke('ConnectAvatar', avatarId);
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
   * Disconnect from the server.
   */
  async stop(): Promise<void> {
    this.materialLoader.dispose();
    if (this.hypergridConnection) {
      await this.hypergridConnection.stop();
      this.hypergridConnection = null;
    }
    await this.connection.stop();
    this._connected = false;
  }
}

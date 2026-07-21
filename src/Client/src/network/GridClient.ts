import * as signalR from '@microsoft/signalr';
import * as THREE from 'three';
import { SceneManager } from '../engine/SceneManager';
import { CameraController } from '../engine/Camera';
import { TerrainRenderer } from '../engine/TerrainRenderer';
import { ObjectRenderer } from '../engine/ObjectRenderer';
import { AvatarRenderer } from '../engine/AvatarRenderer';
import { PBRMaterialLoader } from '../engine/PBRMaterialLoader';

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
    });

    hub.on('ObjectUpdate', (data: any) => {
      this.objects.updatePrim({
        id: data.id,
        name: data.name,
        position: data.position,
        rotation: data.rotation,
        scale: data.scale,
        primType: data.primType,
        textureId: data.textureId,
        faces: data.faces,
      }).catch(err => console.warn('[Grid] updatePrim error:', err));
    });

    hub.on('MeshData', (data: any) => {
      // Decode base64 mesh data and store it for the corresponding prim
      try {
        const meshData = Uint8Array.from(atob(data.data), c => c.charCodeAt(0));
        const primObj = this.objects.getPrim(data.id);
        if (primObj) {
          // Store mesh data on the prim for later use
          primObj.userData.meshData = meshData.buffer;
        }
      } catch (err) {
        console.warn('[Grid] Failed to decode mesh data:', err);
      }
    });

    hub.on('AvatarUpdate', (data: any) => {
      this.avatars.updateAvatar({
        id: data.id,
        name: data.name,
        position: data.position,
        rotation: data.rotation,
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

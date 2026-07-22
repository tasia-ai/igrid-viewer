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
    this.soundManager.dispose();
    this.particleManager.clear();
    this.flexibleRenderer.clear();
    this.materialLoader.dispose();
    if (this.hypergridConnection) {
      await this.hypergridConnection.stop();
      this.hypergridConnection = null;
    }
    await this.connection.stop();
    this._connected = false;
  }
}

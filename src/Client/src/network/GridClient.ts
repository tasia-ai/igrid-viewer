import * as signalR from '@microsoft/signalr';
import * as THREE from 'three';
import { SceneManager } from '../engine/SceneManager';
import { CameraController } from '../engine/Camera';
import { TerrainRenderer } from '../engine/TerrainRenderer';
import { ObjectRenderer } from '../engine/ObjectRenderer';
import { AvatarRenderer } from '../engine/AvatarRenderer';

/**
 * Bridges the browser to the ViewerHub via SignalR.
 * Receives world events and dispatches them to the 3D renderers.
 */
export class GridClient {
  private connection: signalR.HubConnection;
  private terrain: TerrainRenderer;
  private objects: ObjectRenderer;
  private avatars: AvatarRenderer;
  private camera: CameraController;
  private _connected = false;

  public get connected(): boolean {
    return this._connected;
  }

  constructor(
    private sceneManager: SceneManager,
    private authToken: string,
    private onChatMessage?: (from: string, message: string) => void,
    private onPositionUpdate?: (x: number, y: number, z: number) => void
  ) {
    this.terrain = new TerrainRenderer(sceneManager.scene);
    this.objects = new ObjectRenderer(sceneManager.scene);
    this.avatars = new AvatarRenderer(sceneManager.scene);
    this.camera = new CameraController(sceneManager.camera, sceneManager.renderer.domElement);

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/hubs/viewer', {
        accessTokenFactory: () => this.authToken,
      })
      .withAutomaticReconnect()
      .build();

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.connection.on('AvatarConnected', (data: any) => {
      console.log('[Grid] Connected as:', data.firstName);
      this._connected = true;
      this.camera.setTarget(
        new THREE.Vector3(data.position.x, data.position.z, data.position.y)
      );
    });

    this.connection.on('ObjectUpdate', (data: any) => {
      this.objects.updatePrim({
        id: data.id,
        name: data.name,
        position: data.position,
        rotation: data.rotation,
        scale: data.scale,
        pcode: data.pCode,
      });
    });

    this.connection.on('AvatarUpdate', (data: any) => {
      this.avatars.updateAvatar({
        id: data.id,
        name: data.name,
        position: data.position,
        rotation: data.rotation,
      });
    });

    this.connection.on('TerrainPatch', (data: any) => {
      if (data.heights) {
        this.terrain.updatePatch(data.x, data.y, new Float32Array(data.heights));
      }
    });

    this.connection.on('ChatMessage', (data: any) => {
      this.onChatMessage?.(data.from, data.message);
    });

    this.connection.on('MyPosition', (data: any) => {
      this.camera.setTarget(new THREE.Vector3(data.x, data.z, data.y));
      this.onPositionUpdate?.(data.x, data.y, data.z);
    });

    this.connection.on('Error', (message: string) => {
      console.error('[Grid] Error:', message);
    });

    this.connection.onreconnected(() => {
      console.log('[Grid] Reconnected');
    });

    this.connection.onclose((err) => {
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
   * Request to connect an avatar to the grid.
   */
  async connectAvatar(avatarId: number): Promise<void> {
    await this.connection.invoke('ConnectAvatar', avatarId);
  }

  /**
   * Send a chat message to the current region.
   */
  async sendChat(message: string, channel: number = 0): Promise<void> {
    await this.connection.invoke('SendChat', message, channel);
  }

  /**
   * Teleport to a named region.
   */
  async teleport(regionName: string): Promise<void> {
    await this.connection.invoke('Teleport', regionName);
  }

  /**
   * Disconnect from the server.
   */
  async stop(): Promise<void> {
    await this.connection.stop();
    this._connected = false;
  }
}

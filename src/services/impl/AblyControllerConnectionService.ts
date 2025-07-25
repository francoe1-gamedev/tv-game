import { Realtime } from 'ably';
import { v4 as uuidv4 } from 'uuid';
import type { IConnectionService, MessageEnvelope } from '../ConnectionService';

export class AblyControllerConnectionService implements IConnectionService {
  private client: Realtime;
  private channel: any;
  private playerId: string; // único por cliente
  private gameCode: string;

  private onMessageCallback: (msg: MessageEnvelope) => void = () => {};

  constructor(gameCode: string, playerId?: string) {
    this.client = new Realtime({ key: import.meta.env.VITE_ABLY_API_KEY });
    this.gameCode = gameCode;
    this.playerId = playerId || uuidv4();
  }

  async connect() {
    console.log('[ConnectionService] Connecting to channel:', `game-${this.gameCode}`);
    return new Promise<void>((resolve) => {
      this.channel = this.client.channels.get(`game-${this.gameCode}`);
      this.channel.subscribe((message: any) => {
        const data: MessageEnvelope = message.data;
        console.log('[ConnectionService] Message received:', data);

        if (data.forPlayerId && data.forPlayerId !== this.playerId) {
          console.log('[ConnectionService] Message ignored for playerId:', data.forPlayerId);
          return;
        }

        this.onMessageCallback?.(data);
      });

      console.log('[ConnectionService] Sending JOIN message to TV');
      this.channel.publish('message', {
        type: 'JOIN',
        payload: {},
        playerId: this.playerId,
      });

      resolve();
    });
  }

  disconnect() {
    console.log('[ConnectionService] Disconnecting from channel:', `game-${this.gameCode}`);
    this.channel?.detach();
    this.client?.close();
  }

  sendToAll<T>(type: string, payload: T) {
    console.log('[ConnectionService] Sending message to all:', { type, payload });
    const message: MessageEnvelope<T> = {
      type,
      payload,
      playerId: this.playerId,
    };
    this.channel.publish('message', message);
  }

  sendToPlayer<T>(playerId: string, type: string, payload: T) {
    console.log('[ConnectionService] Sending message to player:', { playerId, type, payload });
    const message: MessageEnvelope<T> = {
      type,
      payload,
      playerId: this.playerId,
      forPlayerId: playerId,
    };
    this.channel.publish('message', message);
  }

  onMessage(callback: (msg: MessageEnvelope) => void) {
    console.log('[ConnectionService] Setting onMessage callback');
    this.onMessageCallback = callback;
  }

  getMyPlayerId() {
    return this.playerId;
  }
}

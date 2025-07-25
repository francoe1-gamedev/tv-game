import { Realtime } from 'ably';
import type { IConnectionService, MessageEnvelope } from '../ConnectionService';

export class AblyTVConnectionService implements IConnectionService {
  private client: Realtime;
  private channel: any;
  private playerList: Set<string> = new Set();
  private gameCode: string;
  private myPlayerId = 'tv';

  private onMessageCallback: (msg: MessageEnvelope) => void = () => {};

  constructor(gameCode: string) {
    this.client = new Realtime({ key: import.meta.env.VITE_ABLY_API_KEY });
    this.gameCode = gameCode;
  }

  async connect() {
    console.log('[ConnectionService] Connecting to channel:', `game-${this.gameCode}`);
    return new Promise<void>((resolve) => {
      this.channel = this.client.channels.get(`game-${this.gameCode}`);
      this.channel.subscribe((message: any) => {
        const data: MessageEnvelope = message.data;
        console.log('[ConnectionService] Message received:', data);

        if (data.type === 'JOIN' && data.playerId) {
          const isReconnect = this.playerList.has(data.playerId);
          console.log('[ConnectionService] Player joined:', data.playerId);
          this.playerList.add(data.playerId);
          // Responder al jugador
          this.sendToPlayer(data.playerId, 'JOIN_ACK', { playerId: data.playerId });
          if (isReconnect) {
            this.onMessageCallback?.({ type: 'PLAYER_RECONNECT', payload: { playerId: data.playerId } });
          }
        }

        if (data.forPlayerId && data.forPlayerId !== this.myPlayerId) {
          console.log('[ConnectionService] Message ignored for playerId:', data.forPlayerId);
          return;
        }

        this.onMessageCallback?.(data);
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
    const message: MessageEnvelope<T> = { type, payload };
    this.channel.publish('message', message);
  }

  sendToPlayer<T>(playerId: string, type: string, payload: T) {
    console.log('[ConnectionService] Sending message to player:', { playerId, type, payload });
    const message: MessageEnvelope<T> = {
      type,
      payload,
      forPlayerId: playerId,
    };
    this.channel.publish('message', message);
  }

  onMessage(callback: (msg: MessageEnvelope) => void) {
    console.log('[ConnectionService] Setting onMessage callback');
    this.onMessageCallback = callback;
  }

  getMyPlayerId() {
    return this.myPlayerId;
  }
}

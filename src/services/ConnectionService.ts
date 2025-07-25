export type MessageEnvelope<T = any> = {
  type: string;
  payload: T;
  playerId?: string; // Quien lo envió (si aplica)
  forPlayerId?: string; // Para quién va dirigido (opcional)
};

export interface IConnectionService {
  connect(): Promise<void>
  disconnect(): void

  sendToAll<T>(type: string, payload: T): void
  sendToPlayer<T>(playerId: string, type: string, payload: T): void

  /**
   * Register a callback to be invoked whenever a message is received. Multiple
   * listeners can be registered.
   */
  onMessage(callback: (msg: MessageEnvelope) => void): void
  getMyPlayerId(): string
}

export type MessageEnvelope<T = any> = {
  type: string;
  payload: T;
  playerId?: string; // Quien lo envió (si aplica)
  forPlayerId?: string; // Para quién va dirigido (opcional)
};

export interface IConnectionService {
  connect(): Promise<void>;
  disconnect(): void;

  sendToAll<T>(type: string, payload: T): void;
  sendToPlayer<T>(playerId: string, type: string, payload: T): void;

  onMessage(callback: (msg: MessageEnvelope) => void): void;
  getMyPlayerId(): string;
}

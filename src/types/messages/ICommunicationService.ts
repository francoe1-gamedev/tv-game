export interface ICommunicationService {
    connect(channelName: string): Promise<void>;
    disconnect(): Promise<void>;

    sendAll<TMessage>(message: TMessage): void;
    sendTo<TMessage>(message: TMessage, targetPlayerId: string): void;

    subscribe<TMessage>(handler: (message: TMessage) => void): void;

    getClientId(): string;
}

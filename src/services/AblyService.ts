import Ably from 'ably/promises';
import { ICommunicationService } from '@/types/messages/ICommunicationService';
import { IBaseMessage } from '@/types/messages/IBaseMessage';


export class AblyService implements ICommunicationService {
    private _client: Ably.Realtime;
    private _channel: Ably.Types.RealtimeChannelPromise | null = null;
    private _playerId: string = '';

    public constructor(apiKey: string, playerId: string) {
        this._client = new Ably.Realtime.Promise({ key: apiKey });
        this._playerId = playerId;
    }

    public async connect(channelName: string): Promise<void> {
        this._channel = this._client.channels.get(channelName);
        await this._channel.attach();
    }

    public async disconnect(): Promise<void> {
        if (this._channel) {
            await this._channel.detach();
            this._channel = null;
        }
        await this._client.close();
    }

    public sendAll<TMessage extends IBaseMessage>(message: TMessage): void {
        this._publish(message);
    }

    public sendTo<TMessage extends IBaseMessage>(message: TMessage, targetPlayerId: string): void {
        const enriched = {
            ...message,
            forPlayerId: targetPlayerId,
        };
        this._publish(enriched);
    }

    public subscribe<TMessage extends IBaseMessage>(handler: (message: TMessage) => void): void {
        if (!this._channel) return;
        this._channel.subscribe('message', (msg) => {
            const data = msg.data as TMessage;

            if (!data.forPlayerId || data.forPlayerId === this._playerId) {
                handler(data);
            }
        });
    }

    public getClientId(): string {
        return this._client.auth.clientId || '';
    }

    private _publish(message: IBaseMessage): void {
        if (!this._channel) return;
        this._channel.publish('message', message);
    }
}

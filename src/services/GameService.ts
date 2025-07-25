import type { IConnectionService, MessageEnvelope } from './ConnectionService'
import { useGameStore, type Player, type GameInfo } from '@/store/gameStore'

export class GameService {
  private store = useGameStore()

  constructor(private connection: IConnectionService) {}

  async connect() {
    await this.connection.connect()
    this.connection.onMessage((msg) => this.handleMessage(msg))
  }

  disconnect() {
    this.connection.disconnect()
    this.store.reset()
  }

  join(player: Player) {
    this.connection.sendToAll('join', player)
  }

  selectGame(game: GameInfo & { playerId: string }) {
    this.connection.sendToAll('game-selected', game)
  }

  private handleMessage(msg: MessageEnvelope) {
    const { type, payload } = msg
    if (type === 'join') {
      this.store.addPlayer(payload as Player)
      if (!this.store.leader) {
        this.store.setLeader(payload as Player)
      }
    } else if (type === 'game-selected') {
      this.store.setSelectedGame(payload as GameInfo)
    }
  }
}

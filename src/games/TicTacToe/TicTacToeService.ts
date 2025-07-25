import type { IConnectionService, MessageEnvelope } from '@/services/ConnectionService'
import { TicTacToeLogic } from './GameLogic'
import type { TicTacToeState } from './GameState'

export class TicTacToeService {
  private logic = new TicTacToeLogic()

  constructor(private connection: IConnectionService, private isHost: boolean) {}

  connect() {
    this.connection.onMessage(msg => this.handleMessage(msg))
  }

  private handleMessage(msg: MessageEnvelope) {
    if (msg.type === 'tic/move') {
      if (this.isHost) {
        if (this.logic.makeMove(msg.payload as number)) {
          this.broadcastState()
        }
      }
    } else if (msg.type === 'tic/state') {
      if (!this.isHost) {
        this.logic.state = msg.payload as TicTacToeState
      }
    }
  }

  private broadcastState() {
    this.connection.sendToAll('tic/state', this.logic.state)
  }

  makeMove(index: number) {
    if (this.isHost) {
      if (this.logic.makeMove(index)) {
        this.broadcastState()
      }
    } else {
      this.connection.sendToAll('tic/move', index)
    }
  }

  getState() {
    return this.logic.state
  }
}

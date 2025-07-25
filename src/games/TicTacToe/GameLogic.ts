import { createInitialState, TicTacToeState } from './GameState'

export class TicTacToeLogic {
  state: TicTacToeState = createInitialState()

  makeMove(index: number): boolean {
    if (this.state.winner || this.state.board[index]) {
      return false
    }

    this.state.board[index] = this.state.currentPlayer
    if (this.checkWin()) {
      this.state.winner = this.state.currentPlayer
    } else if (this.state.board.every(c => c)) {
      this.state.winner = 'draw'
    } else {
      this.state.currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X'
    }
    return true
  }

  private checkWin(): boolean {
    const b = this.state.board
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    return lines.some(([a, bIdx, c]) => {
      const v = b[a]
      return v && v === b[bIdx] && v === b[c]
    })
  }
}

export type Cell = 'X' | 'O' | null

export interface TicTacToeState {
  board: Cell[]
  currentPlayer: 'X' | 'O'
  winner: 'X' | 'O' | 'draw' | null
}

export function createInitialState(): TicTacToeState {
  return {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  }
}

import { defineStore } from 'pinia'

export interface Avatar {
  id: number
  name: string
  image: string
}

export interface Player {
  playerId: string
  avatar: Avatar
  name: string
}

export interface GameInfo {
  id: number
  name?: string
  title?: string
  description?: string
  image?: string
}

export const useGameStore = defineStore('game', {
  state: () => ({
    players: [] as Player[],
    leader: null as Player | null,
    selectedGame: null as GameInfo | null,
  }),
  actions: {
    addPlayer(player: Player) {
      if (!this.players.find(p => p.playerId === player.playerId)) {
        this.players.push(player)
      }
    },
    setLeader(player: Player) {
      this.leader = player
    },
    setSelectedGame(game: GameInfo) {
      this.selectedGame = game
    },
    reset() {
      this.players = []
      this.leader = null
      this.selectedGame = null
    }
  }
})

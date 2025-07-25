import type { Player } from '@/store/gameStore'

export interface PlayerProfile extends Player {
  connected: boolean
}

export class PlayerProfileService {
  private profiles = new Map<string, PlayerProfile>()

  addOrUpdate(player: Player) {
    const current = this.profiles.get(player.playerId)
    this.profiles.set(player.playerId, { ...current, ...player, connected: true })
  }

  markDisconnected(playerId: string) {
    const profile = this.profiles.get(playerId)
    if (profile) {
      profile.connected = false
    }
  }

  getProfile(playerId: string): PlayerProfile | undefined {
    return this.profiles.get(playerId)
  }

  getAllProfiles(): PlayerProfile[] {
    return Array.from(this.profiles.values())
  }
}

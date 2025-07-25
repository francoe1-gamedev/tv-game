import { v4 as uuidv4 } from 'uuid'

const KEY = 'playerId'

export function getOrCreatePlayerId(): string {
  if (typeof localStorage !== 'undefined') {
    const existing = localStorage.getItem(KEY)
    if (existing) {
      return existing
    }
    const id = uuidv4()
    localStorage.setItem(KEY, id)
    return id
  }
  return uuidv4()
}

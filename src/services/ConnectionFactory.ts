import { AblyTVConnectionService } from '@/services/impl/AblyTVConnectionService';
import { AblyControllerConnectionService } from '@/services/impl/AblyControllerConnectionService';
import type { IConnectionService } from './ConnectionService';

export function createConnectionService(role: 'tv' | 'controller', gameCode: string): IConnectionService {
  if (role === 'tv') {
    return new AblyTVConnectionService(gameCode);
  }
  return new AblyControllerConnectionService(gameCode);
}

<template>
    <div class="receiver">
        <h1 class="text-3xl font-bold mb-4">Código de la partida:</h1>
        <div class="text-6xl font-mono mb-6">{{ gameCode }}</div>

        <canvas ref="qrCanvas"></canvas>

        <div class="mt-8">
            <h2 class="text-xl font-semibold">Jugadores conectados:</h2>
            <div v-for="player in players" :key="player" class="player-card">
                <img :src="`/avatars/${player.avatar.avatar}.png`" alt="avatar" class="avatar-img" />
                <p class="player-name">{{ player.avatar.name }}</p>
            </div>
        </div>

        <div class="mt-8">
            <TicTacToeBoard v-if="selectedGame?.id === TicTacToeDef.id" :service="ticTacToeService" readonly />
            <GameShow v-else :selectedGame="selectedGame" />
        </div>

        <div v-if="leader" class="mt-8">
            <h2 class="text-xl font-semibold">Líder: {{ leader.avatar.name }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { generateGameCode } from '@/utils/codeGenerator'
import { createQR } from '@/utils/qrGenerator'
import { createConnectionService } from '@/services/ConnectionFactory';
import type { IConnectionService } from '@/services/ConnectionService';
import { GameService } from '@/services/GameService'
import { useGameStore } from '@/store/gameStore'
import GameShow from './ReceiverView/GameShow.vue';
import { TicTacToeService } from '@/games/TicTacToe/TicTacToeService'
import TicTacToeBoard from '@/games/TicTacToe/TicTacToeBoard.vue'
import { GameDefinition as TicTacToeDef } from '@/games/TicTacToe/GameDefinition'

const gameCode = ref<string>(generateGameCode());
const qrCanvas = ref<HTMLCanvasElement | null>(null);
const store = useGameStore()
const players = computed(() => store.players)
const selectedGame = computed(() => store.selectedGame)
const leader = computed(() => store.leader)

const messageService: IConnectionService = createConnectionService('tv', gameCode.value);
const gameService = new GameService(messageService)
const ticTacToeService = new TicTacToeService(messageService, true)

onMounted(() => {
  if (qrCanvas.value) {
    createQR(`${window.location.origin}/controller?code=${gameCode.value}`, qrCanvas.value);
  }

  gameService.connect()
  ticTacToeService.connect()
});
</script>

<style scoped>
.receiver {
    text-align: center;
    padding: 2rem;
}

.player-card {
    display: flex;
    align-items: center;
    background-color: #1f2937;
    padding: 0;
    margin: 0.5rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    border: 2px solid #374151;
    max-width: 200px;
    height: 50px;
}

.avatar-img {
    height: 100%;
    margin-right: 1rem;
    object-fit: cover;
}

.player-name {
    font-size: 1.25rem;
    color: white;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

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
            <GameShow :selectedGame="selectedGame" />
        </div>

        <div v-if="leader" class="mt-8">
            <h2 class="text-xl font-semibold">Líder: {{ leader.avatar.name }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { generateGameCode } from '@/utils/codeGenerator'
import { createQR } from '@/utils/qrGenerator'
import { createConnectionService } from '@/services/ConnectionFactory';
import type { IConnectionService } from '@/services/ConnectionService';
import GameShow from './ReceiverView/GameShow.vue';

const gameCode = ref<string>(generateGameCode());
const qrCanvas = ref<HTMLCanvasElement | null>(null);
const players = ref<any[]>([]);
const selectedGame = ref<any | null>(null);
const leader = ref<any | null>(null);

const messageService: IConnectionService = createConnectionService('tv', gameCode.value);

messageService.onMessage((msg) => {
  if (msg.type === 'join') {
    players.value.push(msg.payload);
  } else if (msg.type === 'game-selected') {
    selectedGame.value = msg.payload;
  }
});

onMounted(() => {
  if (qrCanvas.value) {
    createQR(`${window.location.origin}/controller?code=${gameCode.value}`, qrCanvas.value);
  }

  messageService.connect();
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

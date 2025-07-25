<template>
    <div class="controller">
        <h2 class="text-2xl mb-4">Código de partida: <span class="font-mono">{{ gameCode }}</span></h2>

        <CreateAvatar v-if="currentState === 'create-avatar'" v-on:confirm="createAvatar" />
        <SelectGame v-else-if="currentState === 'select-game' && isLeader" v-on:confirm="selectGame" />
        <Wait v-else-if="currentState === 'waiting'" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { generateGameCode } from '@/utils/codeGenerator'
import { useRoute } from 'vue-router'
import { createConnectionService } from '@/services/ConnectionFactory';
import type { IConnectionService } from '@/services/ConnectionService';
import { GameService } from '@/services/GameService'
import { useGameStore } from '@/store/gameStore'
import CreateAvatar from './ControllerView/CreateAvatar.vue'
import SelectGame from './ControllerView/SelectGame.vue'
import Wait from './ControllerView/Wait.vue'

const route = useRoute()
const gameCode = route.query.code?.toString() || 'UNKNOWN'
const playerId = generateGameCode();
const currentState = ref('create-avatar')
const store = useGameStore()
const isLeader = computed(() => store.leader?.playerId === playerId)

const messageService: IConnectionService = createConnectionService('controller', gameCode);
const gameService = new GameService(messageService)

onMounted(() => {
    gameService.connect()
});

watch(isLeader, (val) => {
    if (currentState.value === 'waiting' && val) {
        currentState.value = 'select-game'
    }
})

function createAvatar(avatar: any) {
    currentState.value = 'waiting';
    const player = { playerId: playerId, avatar, name: avatar.name };
    gameService.join(player);
}

function selectGame(game: any) {
    currentState.value = 'waiting';
    gameService.selectGame({ ...game, playerId });
}
</script>

<style scoped>
.controller {
    padding: 2rem;
    text-align: center;
}

.buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    background-color: #3b82f6;
    color: white;
    cursor: pointer;
    transition: background 0.2s ease;
}

button:hover {
    background-color: #2563eb;
}
</style>

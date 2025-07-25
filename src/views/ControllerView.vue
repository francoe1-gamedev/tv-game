<template>
    <div class="controller">
        <h2 class="text-2xl mb-4">Código de partida: <span class="font-mono">{{ gameCode }}</span></h2>

        <CreateAvatar v-if="currentState === 'create-avatar'" v-on:confirm="createAvatar" />
        <SelectGame v-else-if="currentState === 'select-game' && isLeader" v-on:confirm="selectGame" />
        <Wait v-else-if="currentState === 'waiting'" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { generateGameCode } from '@/utils/codeGenerator'
import { useRoute } from 'vue-router'
import { createConnectionService } from '@/services/ConnectionFactory';
import type { IConnectionService } from '@/services/ConnectionService';
import CreateAvatar from './ControllerView/CreateAvatar.vue'
import SelectGame from './ControllerView/SelectGame.vue'
import Wait from './ControllerView/Wait.vue'

const route = useRoute()
const gameCode = route.query.code?.toString() || 'UNKNOWN'
const playerId = generateGameCode();
const currentState = ref('create-avatar')
const isLeader = ref(false)

const messageService: IConnectionService = createConnectionService('controller', gameCode);

messageService.onMessage((msg) => {
    if (msg.type === 'leader-assigned' && msg.payload.playerId === playerId) {
        isLeader.value = true;
    } else if (msg.type === 'joined') {
        if (isLeader.value) {
            currentState.value = 'select-game';
        } else {
            currentState.value = 'waiting';
        }
    }
});

onMounted(() => {
    messageService.connect();
});

function createAvatar(avatar: any) {
    currentState.value = 'waiting';
    const player = { playerId: playerId, avatar };
    messageService.sendToAll('join', player);
}

function selectGame(game: string) {
    currentState.value = 'waiting';
    messageService.sendToAll('game-selected', { playerId, game });
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

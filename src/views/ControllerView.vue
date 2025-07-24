<template>
    <div class="controller">
        <h2 class="text-2xl mb-4">Código de partida: <span class="font-mono">{{ gameCode }}</span></h2>

        <CreateAvatar v-if="currentState == 0" v-on:confirm="createAvatar" />
        <div v-if="currentState == 1">
            <p>Select Game</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { generateGameCode } from '@/utils/codeGenerator.js'
import { useRoute } from 'vue-router'
import { useAblyChannel } from '@/ably/useAblyChannel.js'
import CreateAvatar from './ControllerView/CreateAvatar.vue'

const route = useRoute()
const gameCode = route.query.code || 'UNKNOWN'
const playerId = generateGameCode();
const currentState = ref(0)

const gameAbly = useAblyChannel(`game-${gameCode}`)
let playerAbly = null;

function onJoined() {
    playerAbly = useAblyChannel(`player-${playerId}`)

    playerAbly.subscribe('joined', (msg) => {
        console.log('Joined')
        console.dir(msg)
    });
}

function createAvatar(avatar) {
    currentState.value++;
    var player = { playerId: playerId, avatar };
    gameAbly.publish('join', player);
    onJoined();
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

<template>
  <div class="game-selector">
    <div v-for="game in games" :key="game.id" class="game-tile">
      <img :src="game.image" :alt="game.name" class="game-image" />
      <h3>{{ game.name }}</h3>
      <button @click="selectGame(game)" class="play-button">Jugar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { availableGames } from '@/games'

const emit = defineEmits(['confirm'])
const games = availableGames
function selectGame(game: any) {
  emit('confirm', game)
}
</script>

<style scoped>
.game-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.game-tile {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.game-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.play-button {
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.play-button:hover {
  background-color: #0056b3;
}
</style>

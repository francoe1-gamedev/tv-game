<template>
  <div class="game-show">
    <h1>{{ selectedGame ? `Juego Seleccionado: ${selectedGame.name}` : "No se ha seleccionado un juego" }}</h1>
    <div v-if="selectedGame" class="game-details">
      <img :src="selectedGame.image" :alt="selectedGame.name" class="game-image" />
      <p>{{ selectedGame.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GameShow",
  props: {
    selectedGame: {
      type: Object as () => { name: string; image: string; description: string } | null,
      required: false,
      default: null,
    },
  },
});
</script>

<style scoped>
.game-show {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #333;
  font-family: 'Press Start 2P', cursive;
  padding: 20px;
}

.game-details {
  margin-top: 20px;
  border: 2px solid #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.game-image {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
}
</style>
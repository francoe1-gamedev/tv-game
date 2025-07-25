<template>
  <div class="board">
    <div
      v-for="(cell, index) in state.board"
      :key="index"
      class="cell"
      @click="play(index)"
    >
      {{ cell || '' }}
    </div>
  </div>
  <div class="info">
    <div v-if="state.winner">Winner: {{ state.winner }}</div>
    <div v-else>Turn: {{ state.currentPlayer }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TicTacToeService } from './TicTacToeService'

const props = defineProps<{ service: TicTacToeService; readonly?: boolean }>()
const state = computed(() => props.service.getState())

function play(index: number) {
  if (props.readonly) return
  props.service.makeMove(index)
}
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 4px;
  margin: 1rem auto;
}
.cell {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  font-size: 2rem;
  cursor: pointer;
}
.info {
  text-align: center;
  margin-top: 1rem;
}
</style>

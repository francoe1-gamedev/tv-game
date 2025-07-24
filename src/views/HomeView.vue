<template>
  <div class="home">
    <h1 class="title">🎮 TV Games</h1>
    <button class="start-btn" @click="goToReceiver">Iniciar en la TV</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToReceiver() {
  router.push('/receiver')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #4f46e5, #1e1b4b);
  color: white;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.start-btn {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 8px;
  background-color: #10b981;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.start-btn:hover {
  background-color: #059669;
}
</style>

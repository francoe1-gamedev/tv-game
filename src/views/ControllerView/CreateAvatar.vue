<template>
  <div class="player-setup">
    <h2 class="text-2xl mb-4">Elegí tu nombre y avatar</h2>

    <input
      v-model="name"
      type="text"
      placeholder="Tu nombre"
      class="name-input"
    />

    <div class="avatar-grid">
      <div
        v-for="avatar in avatars"
        :key="avatar.id"
        class="avatar-option"
        :class="{ selected: avatar.id === selectedAvatar?.id }"
        @click="selectedAvatar = avatar"
      >
        <img :src="avatar.image" :alt="avatar.name" />
      </div>
    </div>

    <button class="confirm-btn" :disabled="!canConfirm" @click="submit">
      Confirmar
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import avatars from '@/data/avatars.json'

const emit = defineEmits(['confirm'])

const name = ref('')
const selectedAvatar = ref(null)

const canConfirm = computed(() => name.value.trim() !== '' && selectedAvatar.value)

function submit() {
  const player = {
    name: name.value.trim(),
    avatar: selectedAvatar.value,
  }
  emit('confirm', player)
}
</script>

<style scoped>
.player-setup {
  padding: 2rem;
  text-align: center;
}

.name-input {
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 250px;
  margin-bottom: 1.5rem;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.avatar-option {
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s;
}

.avatar-option img {
  width: 100%;
  height: auto;
  display: block;
}

.avatar-option.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 8px #3b82f6;
}

.confirm-btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #10b981;
  color: white;
  cursor: pointer;
}

.confirm-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
</style>

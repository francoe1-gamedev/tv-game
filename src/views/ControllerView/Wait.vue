<template>
  <div class="wait-view">
    <h1>Esperando...</h1>
    <p>Por favor, mira al televisor para continuar.</p>
  </div>
</template>

<script>
export default {
  name: "WaitView",
};
</script>

<style scoped>
.wait-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  text-align: center;
  color: #00ff00;
  border: 2px solid #00ff00; /* Borde verde brillante */
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0 0 20px #00ff00; /* Efecto de brillo */
  background: black; /* Fondo negro para contraste */
}

.wait-view h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; /* Efecto de neón */
}

.wait-view p {
  font-size: 1rem;
  text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; /* Efecto de neón */
}
</style>

<link
  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
  rel="stylesheet"
/>
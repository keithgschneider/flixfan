<script setup lang="ts">
import type { Game } from '../types/Game' // Import the Game type

// Props for the games grid
defineProps({
  games: {
    type: Array as () => Game[], // Specify the type as an array of Game
    required: true, // Array of games to display
  },
})
</script>

<template>
  <div class="games-grid">
    <div class="games-container">
      <div v-for="game in games" :key="game.ID" class="game-card">
        <div class="image-wrapper">
          <img :src="`${game.ParodyArtworkURL}?w=400`" :alt="game.Title" class="game-image" />
          <div class="overlay">
            <span class="game-title">{{ game.Title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.games-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 60px; /* Space for the sticky footer */
}
.games-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #121212;
}

.game-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: white;
  width: 200px;
  max-width: 300px;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.game-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(20, 20, 20, 0.7);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  pointer-events: none;
}

.image-wrapper:hover .overlay {
  opacity: 1;
  pointer-events: auto;
}

.game-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  padding: 0.5rem 1rem;
  text-align: center;
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue'
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
        <img :src="`${game.ParodyArtworkURL}?w=400`" :alt="game.Title" class="game-image" />
        <p class="game-title">{{ game.Title }}</p>
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
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  justify-content: center; /* Center items horizontally */
  align-items: flex-start; /* Align items to the top */
  gap: 1rem; /* Add spacing between items */
  padding: 1rem;
  background-color: #121212; /* Optional: Add a background color */
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
  width: 200px; /* Set a fixed width for each card */
  max-width: 300px; /* Optional: Set a max width */
}

.game-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.game-title {
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: bold;
}
</style>

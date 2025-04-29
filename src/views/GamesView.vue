<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrollToTopButton from '../components/ScrollToTopButton.vue'
import SearchHeader from '../components/SearchHeader.vue'
import GamesGrid from '../components/GamesGrid.vue' // Import the new GamesGrid component
import { useFanflixStore } from '../stores/fanflix'

const fanflixStore = useFanflixStore()

// Get the list of games from the store
const games = computed(() => fanflixStore.games)

// Search functionality
const searchQuery = ref('')
const filteredGames = computed(() =>
  games.value.filter((game) => game.Title.toLowerCase().includes(searchQuery.value.toLowerCase())),
)
const totalGames = computed(() => games.value)
</script>

<template>
  <SearchHeader
    title="FanFlix Games"
    :searchQuery="searchQuery"
    :filteredCount="filteredGames.length"
    :totalCount="totalGames.length"
    @update:searchQuery="(value) => (searchQuery = value)"
  >
    <template #info>
      <p class="custom-info">Displaying {{ filteredGames.length }} games</p>
    </template>
  </SearchHeader>

  <GamesGrid :games="filteredGames" />
  <ScrollToTopButton />
</template>

<style scoped>
/* Add any additional styles here if needed */
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useFanflixStore } from './stores/fanflix'
import { loadCampaigns, loadGames, loadProducts } from './helpers/dataLoader'
import StickyFooter from './components/StickyFooter.vue'

onMounted(async () => {
  const fanflixStore = useFanflixStore()

  fanflixStore.loading = true

  // Clear the store before loading new data
  fanflixStore.clear()

  // Load data
  await loadCampaigns(fanflixStore)
  await loadProducts(fanflixStore)
  await loadGames(fanflixStore)

  fanflixStore.loading = false
})
</script>

<template>
  <main>
    <RouterView />
  </main>
  <StickyFooter />
</template>

<style scoped>
main {
  height: 100vh; /* Ensure the main content takes up the full viewport height */
  box-sizing: border-box; /* Include padding in the element's total height */
}
</style>

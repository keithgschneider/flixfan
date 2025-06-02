<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFanflixStore } from '../stores/fanflix'
import ProductGrid from '../components/ProductGrid.vue'
import ScrollToTopButton from '../components/ScrollToTopButton.vue'
import SearchHeader from '../components/SearchHeader.vue'

const fanflixStore = useFanflixStore()
const searchQuery = ref('')

const filteredProducts = computed(() =>
  fanflixStore.products
    .filter((product) => product.Name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .sort((a, b) => a.Name.localeCompare(b.Name)),
)
</script>

<template>
  <main>
    <SearchHeader
      title="FanFlix Products"
      :searchQuery="searchQuery"
      :filteredCount="filteredProducts.length"
      :totalCount="fanflixStore.products.length"
      @update:searchQuery="(value) => (searchQuery = value)"
    />
    <div v-if="fanflixStore.loading" class="loading-spinner"></div>
    <ProductGrid v-else :products="filteredProducts" />
    <ScrollToTopButton />
  </main>
</template>

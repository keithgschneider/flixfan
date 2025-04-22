<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFanflixStore } from '../stores/fanflix' // Updated import
import ProductGrid from '../components/ProductGrid.vue' // Import the new component

const fanflixStore = useFanflixStore() // Updated store usage
const searchQuery = ref('') // Reactive variable for the search input

// Computed property to filter and sort products based on the search query
const filteredProducts = computed(
  () =>
    fanflixStore.products
      .filter((product) => product.Name.toLowerCase().includes(searchQuery.value.toLowerCase()))
      .sort((a, b) => a.Name.localeCompare(b.Name)), // Sort alphabetically by Name
)
</script>

<template>
  <main>
    <header>
      <h1>FanFlix Products</h1>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products..."
        class="search-bar"
      />
      <p class="product-count">
        Showing {{ filteredProducts.length }} of {{ fanflixStore.products.length }} products
      </p>
    </header>
    <ProductGrid :products="filteredProducts" />
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
  margin: auto; /* Center the main content */
}

header {
  text-align: center;
  margin-bottom: 1rem;
}

h1 {
  margin-bottom: 0.5rem;
}

.search-bar {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  margin: 0 auto;
  display: block;
}

.product-count {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}
</style>

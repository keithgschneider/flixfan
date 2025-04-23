<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFanflixStore } from '../stores/fanflix'
import ProductGrid from '../components/ProductGrid.vue'
import ScrollToTopButton from '../components/ScrollToTopButton.vue'

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
    <header>
      <div class="third">
        <h1>FanFlix Products</h1>
      </div>
      <div class="third">
        <p class="product-count">
          Showing {{ filteredProducts.length }} of {{ fanflixStore.products.length }} products
        </p>
      </div>
      <div class="third">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="search-bar"
        />
      </div>
    </header>
    <ProductGrid :products="filteredProducts" />
    <ScrollToTopButton />
  </main>
</template>

<style scoped>
main {
  margin: auto;
  height: 100vh;
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #1e1e1e;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  width: 100vw;
  left: 0;
}

.third {
  flex: 1;
  display: flex;
  align-items: center;
}

.third:first-child {
  justify-content: flex-start;
}

.third:nth-child(2) {
  justify-content: center;
}

.third:last-child {
  justify-content: flex-end;
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}

.search-bar {
  width: 100%;
  max-width: 300px;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #444;
  border-radius: 8px;
  outline: none;
  background-color: #2e2e2e;
  color: white;
  transition: border-color 0.3s ease;
}

.search-bar:focus {
  border-color: #007bff;
}

.product-count {
  font-size: 0.9rem;
  color: #ccc;
}

/* Responsive layout for smaller screens */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 1rem;
  }

  .third {
    flex: none;
    width: 100%;
  }

  .third:first-child {
    justify-content: center;
  }

  .third:nth-child(2) {
    justify-content: center;
  }

  .third:last-child {
    justify-content: center;
  }

  .search-bar {
    margin-top: 1rem;
  }

  .product-count {
    margin-top: 0.5rem;
  }
}
</style>

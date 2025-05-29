<script setup lang="ts">
// Props for the header
defineProps({
  title: {
    type: String,
    required: true, // Dynamic title for the header (e.g., "FanFlix Products" or "FanFlix Games")
  },
  searchQuery: {
    type: String,
    required: true,
  },
  filteredCount: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
})

// Emit event to update the search query
defineEmits(['update:searchQuery'])
</script>

<template>
  <header>
    <div class="third">
      <h1>{{ title }}</h1>
    </div>
    <div class="third">
      <slot name="info">
        <p class="item-count">Showing {{ filteredCount }} of {{ totalCount }}</p>
      </slot>
    </div>
    <div class="third">
      <div class="search-container">
        <svg
          class="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M10 2a8 8 0 105.29 14.71l4.58 4.58a1 1 0 001.42-1.42l-4.58-4.58A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
          />
        </svg>
        <input
          type="text"
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          placeholder="Search..."
          class="search-bar"
        />
        <button
          v-if="searchQuery"
          class="clear-button"
          @click="$emit('update:searchQuery', '')"
          aria-label="Clear search"
        >
          ✕
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #1e1e1e;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: row; /* Default layout: row */
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

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.search-icon {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 20px;
  color: #ccc;
}

.search-bar {
  width: 100%;
  padding: 0.6rem 0.6rem 0.6rem 2.5rem; /* Add padding to the left for the icon */
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

.clear-button {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #ccc;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  padding: 0;
}

.clear-button:hover {
  color: white;
}

/* Responsive layout for smaller devices */
@media (max-width: 768px) {
  header {
    flex-direction: column; /* Stack items vertically */
    padding: 1rem; /* Adjust padding for smaller screens */
  }

  .third {
    width: 100%; /* Full width for each item */
  }

  .third:last-child {
    margin-top: 1em; /* Add margin to the last item for spacing */
  }

  .third:first-child,
  .third:nth-child(2),
  .third:last-child {
    justify-content: center; /* Center items on smaller screens */
  }
}
</style>

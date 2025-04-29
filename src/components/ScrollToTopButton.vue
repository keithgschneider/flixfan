<!-- filepath: /Users/keithschneider/Development/flixfan/src/components/ScrollToTopButton.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showScrollToTop = ref(false)

// Function to scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Function to handle scroll events
const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 200 // Show button after scrolling 200px
}

// Add and remove scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button v-if="showScrollToTop" class="scroll-to-top" @click="scrollToTop">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4l-8 8h6v8h4v-8h6z" />
    </svg>
  </button>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  background-color: #007bff; /* Primary blue color */
  color: white;
  border: none;
  border-radius: 8px; /* Slightly rounded corners for a modern look */
  width: 45px;
  height: 45px;
  font-size: 1.2rem; /* Adjusted font size for better proportions */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Softer shadow for a cleaner look */
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.scroll-to-top:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.scroll-to-top:active {
  transform: scale(0.95); /* Slightly shrink the button on click */
}

.scroll-to-top svg {
  width: 20px;
  height: 20px;
}
</style>

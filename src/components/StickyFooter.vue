<template>
  <footer class="sticky-footer">
    <RouterLink
      to="/games"
      class="footer-link"
      :class="{ active: isActive('/games') }"
      :aria-disabled="isActive('/games')"
      :tabindex="isActive('/games') ? -1 : 0"
    >
      Games
    </RouterLink>
    <RouterLink
      to="/"
      class="footer-link"
      :class="{ active: isActive('/') }"
      :aria-disabled="isActive('/')"
      :tabindex="isActive('/') ? -1 : 0"
    >
      Products
    </RouterLink>
    <RouterLink
      to="/match"
      class="footer-link"
      :class="{ active: isActive('/match') }"
      :aria-disabled="isActive('/match')"
      :tabindex="isActive('/match') ? -1 : 0"
    >
      Match
    </RouterLink>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

// Function to check if the current route matches the given path
const isActive = (path: string) => route.path === path
</script>

<style scoped>
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #1e1e1e;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -6px 15px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #007bff;
}

.footer-link.active {
  color: #007bff; /* Highlight the active link */
  cursor: not-allowed; /* Indicate the link is disabled */
}

.footer-link[aria-disabled='true'] {
  pointer-events: none; /* Disable clicks on the active link */
  opacity: 0.6; /* Reduce opacity for a disabled effect */
}
</style>

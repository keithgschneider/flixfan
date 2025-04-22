<script setup lang="ts">
import { defineProps } from 'vue'
import type { Product } from '../types/Product' // Import the Product type

// Define props to accept the filtered products
defineProps({
  products: {
    type: Array as () => Product[], // Specify the type as an array of Product
    required: true,
  },
})
</script>

<template>
  <div class="product-grid">
    <a
      v-for="product in products"
      :key="product.ID"
      :href="product.ProductURL"
      target="_blank"
      rel="noopener noreferrer"
      class="product-item"
    >
      <img :src="`${product.ImageURL}?w=100`" :alt="product.Name" class="product-thumbnail" />
      <div class="product-overlay">
        <span class="product-name">{{ product.Name }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.product-grid {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  gap: 1rem; /* Space between items */
  justify-content: center; /* Center items horizontally */
  width: 100%;
}

.product-item {
  position: relative; /* Enable positioning for the overlay */
  width: 100px; /* Set a fixed width for each thumbnail */
  height: 150px; /* Maintain a 2:3 aspect ratio */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Ensure images and overlays don’t overflow their container */
  border: 1px solid #ddd; /* Optional: Add a border for better visibility */
  border-radius: 8px; /* Optional: Add rounded corners */
  background-color: #f9f9f9; /* Optional: Add a background color */
  text-decoration: none; /* Remove underline from links */
}

.product-thumbnail {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* Ensure the image covers the container without distortion */
}

.product-overlay {
  position: absolute; /* Position the overlay on top of the image */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-opaque black background */
  color: #fff; /* White text color */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s ease; /* Smooth transition for hover effect */
  border-radius: 8px; /* Match the border radius of the product item */
}

.product-item:hover .product-overlay {
  opacity: 1; /* Show the overlay on hover */
}

.product-name {
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;
}
</style>

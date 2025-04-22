import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Campaign } from '../types/Campaign'
import type { Product } from '../types/Product' // Import the Product type

export const useFanflixStore = defineStore('fanflix', () => {
  const campaigns = ref<Campaign[]>([]) // Store campaigns as an array of Campaign objects
  const products = ref<Product[]>([]) // Store products as an array of Product objects

  return { campaigns, products }
})

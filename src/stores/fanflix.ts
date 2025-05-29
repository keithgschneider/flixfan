import { defineStore } from 'pinia'
import type { Campaign } from '../types/Campaign'
import type { Product } from '../types/Product'
import type { Game } from '@/types/Game'

// Define the FanflixStore interface
export interface FanflixStore {
  campaigns: Campaign[]
  products: Product[]
  games: Game[]
  loading: boolean
}

// Define the Pinia store
export const useFanflixStore = defineStore('fanflix', {
  state: (): FanflixStore => ({
    campaigns: [],
    products: [],
    games: [],
    loading: false,
  }),
  actions: {
    // Clear the store by resetting campaigns and products
    clear() {
      this.campaigns = []
      this.products = []
      this.games = []
    },
  },
})

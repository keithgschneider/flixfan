<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { fetchHtml, parseCtxFromHtml } from './helpers/htmlParser'
import { useFanflixStore } from './stores/fanflix'
import type { Campaign } from './types/Campaign'
import type { Product } from './types/Product'

const filmsStore = useFanflixStore()

interface CampaignContext {
  Campaigns?: Campaign[] // Replace `any[]` with the actual type if known
}

async function loadCampaigns() {
  try {
    const html = await fetchHtml('/api')
    if (typeof html !== 'string') {
      console.error('Failed to fetch Campaigns HTML string')
      return
    }

    const ctx: CampaignContext = parseCtxFromHtml(html) as CampaignContext
    if (!ctx) {
      console.error('Failed to parse Campaigns context from HTML')
      return
    }

    if (ctx.Campaigns) {
      // Add the "id" property to each campaign
      filmsStore.campaigns = ctx.Campaigns.map((campaign) => ({
        ...campaign,
        id: campaign.url.split('/').pop() || '', // Extract the id from the URL
      }))
      console.log('Loaded campaigns with IDs:', filmsStore.campaigns)
    } else {
      console.error('Campaigns not found in ctx')
    }
  } catch (error) {
    console.error('Error loading campaigns:', error)
  }
}

interface ProductContext {
  Products?: Product[] // Replace `any[]` with the actual type if known
}

async function loadProducts() {
  try {
    for (const campaign of filmsStore.campaigns) {
      if (!campaign.url) {
        console.error('Campaign URL is missing:', campaign)
        continue
      }

      const html = await fetchHtml(`/api/c/${campaign.id}`)
      if (typeof html !== 'string') {
        console.error(`Failed to fetch HTML for campaign at URL: ${campaign.url}`)
        continue
      }

      const ctx: ProductContext = parseCtxFromHtml(html) as ProductContext
      if (!ctx) {
        console.error(`Failed to parse context for campaign at URL: ${campaign.url}`)
        continue
      }

      if (ctx.Products) {
        // Add ProductURL to each product
        const productsWithUrls = ctx.Products.map((product) => ({
          ...product,
          ProductURL: `https://fanflix.co/c/${campaign.id}?show=${product.ID}`,
        }))
        filmsStore.products.push(...productsWithUrls)
        console.log(`Loaded products for campaign ${campaign.id}:`, productsWithUrls)
      } else {
        console.error(`Products not found in ctx for campaign at URL: ${campaign.url}`)
      }
    }
  } catch (error) {
    console.error('Error loading products:', error)
  }
}

onMounted(async () => {
  await loadCampaigns()
  await loadProducts()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

import { fetchHtml, parseCtxFromHtml } from './htmlParser'
import { log, error } from './logger' // Import the logger functions
import type { FanflixStore } from '../stores/fanflix'
import type { Campaign } from '../types/Campaign'
import type { Product } from '../types/Product'
import gamesData from '../data/games.json' // Import the games.json file

interface CampaignContext {
  Campaigns?: Campaign[]
}

interface ProductContext {
  Products?: Product[]
}

export async function loadCampaigns(store: FanflixStore) {
  try {
    const html = await fetchHtml('/api')
    if (typeof html !== 'string') {
      error('Failed to fetch Campaigns HTML string')
      return
    }

    const ctx: CampaignContext = parseCtxFromHtml(html) as CampaignContext
    if (!ctx) {
      error('Failed to parse Campaigns context from HTML')
      return
    }

    if (ctx.Campaigns) {
      store.campaigns = ctx.Campaigns.map((campaign) => ({
        ...campaign,
        id: campaign.url.split('/').pop() || '', // Extract the id from the URL
      }))
      log('Loaded campaigns with IDs:', store.campaigns)
    } else {
      error('Campaigns not found in ctx')
    }
  } catch (err) {
    error('Error loading campaigns:', err)
  }
}

export async function loadProducts(store: FanflixStore) {
  try {
    for (const campaign of store.campaigns) {
      if (!campaign.url) {
        error('Campaign URL is missing:', campaign)
        continue
      }

      const html = await fetchHtml(`/api/c/${campaign.id}`)
      if (typeof html !== 'string') {
        error(`Failed to fetch HTML for campaign at URL: ${campaign.url}`)
        continue
      }

      const ctx: ProductContext = parseCtxFromHtml(html) as ProductContext
      if (!ctx) {
        error(`Failed to parse context for campaign at URL: ${campaign.url}`)
        continue
      }

      if (ctx.Products) {
        const productsWithUrls = ctx.Products.map((product) => ({
          ...product,
          ProductURL: `https://fanflix.co/c/${campaign.id}?show=${product.ID}`,
        }))
        store.products.push(...productsWithUrls)
        log(`Loaded products for campaign ${campaign.id}:`, productsWithUrls)
      } else {
        error(`Products not found in ctx for campaign at URL: ${campaign.url}`)
      }
    }
  } catch (err) {
    error('Error loading products:', err)
  }
}

export async function loadGames(store: FanflixStore) {
  try {
    if (!gamesData || !Array.isArray(gamesData.items)) {
      error('Invalid games data format in games.json')
      return
    }

    const games = gamesData.items.map((game) => ({
      ...game,
    }))

    store.games = games // Add games to the store
    log('Loaded games:', games)
  } catch (err) {
    error('Error loading games:', err)
  }
}

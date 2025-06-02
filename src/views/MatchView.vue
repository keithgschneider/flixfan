<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useFanflixStore } from '../stores/fanflix'
import BucketDrop from '../components/BucketDrop.vue'
import DraggableProduct from '../components/DraggableProduct.vue'
import { bucketDefs } from '../data/buckets'
import type { Product } from '@/types/Product'

const fanflixStore = useFanflixStore()

const uncategorizedProducts = computed(() =>
  fanflixStore.products.filter((p) => p.IsSeen === undefined || p.IsSeen === null),
)

const randomProduct = ref<Product | null>()
const droppedBucket = ref('')
const droppedProduct = ref<Product | null>()
const dragPosition = ref({ x: 0, y: 0 })

// Track the most recent CategorizedIndex value
const categorizedIndexCounter = ref(1)

function pickRandomProduct() {
  const products = uncategorizedProducts.value
  randomProduct.value = products.length
    ? products[Math.floor(Math.random() * products.length)]
    : null
}

function centerProduct() {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  dragPosition.value = { x: viewportWidth / 2, y: viewportHeight / 2 - 30 }
}

onMounted(() => {
  centerProduct()
  if (!fanflixStore.loading) {
    pickRandomProduct()
  }
})

watch(
  () => fanflixStore.loading,
  (loading) => {
    if (!loading) {
      pickRandomProduct()
    }
  },
)

function getBucketAt(x: number, y: number) {
  for (const bucket of bucketDefs) {
    const el = document.querySelector(`.bucket.${bucket.class}`) as HTMLElement
    if (el) {
      const rect = el.getBoundingClientRect()
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return bucket.name
      }
    }
  }
  return null
}

function handleProductDrop(coords: { x: number; y: number }) {
  const bucket = getBucketAt(coords.x, coords.y)
  if (bucket && randomProduct.value) {
    // Update IsSeen and IsLiked based on the bucket
    if (bucket === 'Top Left') {
      randomProduct.value.IsSeen = true
      randomProduct.value.IsLiked = false
    } else if (bucket === 'Top Right') {
      randomProduct.value.IsSeen = true
      randomProduct.value.IsLiked = true
    } else if (bucket === 'Bottom Left') {
      randomProduct.value.IsSeen = false
      randomProduct.value.IsLiked = false
    } else if (bucket === 'Bottom Right') {
      randomProduct.value.IsSeen = false
      randomProduct.value.IsLiked = true
    }
    // Set CategorizedIndex to the next highest value
    randomProduct.value.CategorizedIndex = categorizedIndexCounter.value++
    droppedBucket.value = bucket
    droppedProduct.value = randomProduct.value
    setTimeout(() => {
      droppedBucket.value = ''
      droppedProduct.value = null
      pickRandomProduct()
      centerProduct()
    }, 800)
  }
}

function getProductsForBucket(bucketName: string) {
  let filtered: Product[] = []
  if (bucketName === 'Top Left') {
    filtered = fanflixStore.products.filter((p) => p.IsSeen === true && p.IsLiked === false)
  } else if (bucketName === 'Top Right') {
    filtered = fanflixStore.products.filter((p) => p.IsSeen === true && p.IsLiked === true)
  } else if (bucketName === 'Bottom Left') {
    filtered = fanflixStore.products.filter((p) => p.IsSeen === false && p.IsLiked === false)
  } else if (bucketName === 'Bottom Right') {
    filtered = fanflixStore.products.filter((p) => p.IsSeen === false && p.IsLiked === true)
  }
  // Sort by CategorizedIndex descending (most recent last)
  return filtered.slice().sort((b, a) => (b.CategorizedIndex ?? 0) - (a.CategorizedIndex ?? 0))
}
</script>

<template>
  <div class="match-view">
    <div v-if="fanflixStore.loading" class="loading-spinner"></div>
    <DraggableProduct
      v-else-if="randomProduct && !droppedProduct"
      :product="randomProduct"
      :initialPosition="dragPosition"
      @dropped="handleProductDrop"
    />
    <div v-else-if="!randomProduct">
      <p>No products available to display.</p>
    </div>

    <BucketDrop
      v-for="bucket in bucketDefs"
      :key="bucket.name"
      :bucketClass="bucket.class"
      :label="bucket.label"
      :icon1="bucket.icon1"
      :icon1Class="bucket.icon1Class"
      :icon2="bucket.icon2"
      :icon2Class="bucket.icon2Class"
      :desc="bucket.desc"
      :products="getProductsForBucket(bucket.name)"
    />
  </div>
</template>

<style scoped>
.match-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #121212;
  color: white;
  text-align: center;
  padding: 1rem;
  position: relative;
  overscroll-behavior: none;
  touch-action: pan-x pan-y;
  overflow: hidden;
}
</style>

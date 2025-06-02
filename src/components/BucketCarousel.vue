<template>
  <div class="carousel" :class="products.length <= 3 ? 'static' : ''" ref="carouselRef">
    <!-- Carousel will be populated dynamically -->
    <template v-if="products.length <= 3">
      <div class="product-card" v-for="(product, index) in products" :key="index">
        <img :src="product.ImageURL + '?w=200'" :alt="product.Name" class="product-card-img" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import type { Product } from '@/types/Product'

const props = defineProps<{
  products: Product[]
}>()

const carouselRef = ref<HTMLElement | null>(null)
let intervalId: number | null = null
let productIndex = 0

function createAnimatedCard(product: Product) {
  if (!carouselRef.value) return

  // Create card element
  const thisCard = document.createElement('div') // Use a local variable
  thisCard.className = 'product-card'
  thisCard.style.left = '100%'
  thisCard.style.transition = 'left 12s linear'

  // Create image element
  const img = document.createElement('img')
  img.src = product.ImageURL + '?w=200'
  img.alt = product.Name
  img.className = 'product-card-img'

  thisCard.appendChild(img)
  carouselRef.value.appendChild(thisCard)

  // Animate out after a delay, then remove
  setTimeout(() => {
    thisCard.style.left = '-100%'
    thisCard.addEventListener(
      'transitionend',
      () => {
        if (thisCard.parentNode) {
          thisCard.parentNode.removeChild(thisCard)
        }
      },
      { once: true },
    )
  }, 100)
}

function startCycling() {
  if (intervalId !== null) clearInterval(intervalId)
  if (!props.products.length) return

  productIndex = 0 // Reset to start

  // Show the first card immediately
  createAnimatedCard(props.products[productIndex])

  intervalId = setInterval(() => {
    productIndex = (productIndex + 1) % props.products.length
    createAnimatedCard(props.products[productIndex])
  }, 2000)
}

// Start cycling only when products array has at least one product
watch(
  () => props.products.length,
  (len) => {
    if (len > 3 && intervalId === null) startCycling()
  },
  { immediate: true },
)

onMounted(() => {
  startCycling()
})

onBeforeUnmount(() => {
  if (intervalId !== null) clearInterval(intervalId)
})
</script>

<style>
.carousel {
  position: relative;
  width: 100%;
  height: 20vh;
  overflow: hidden;
}
.carousel.static {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
}
.carousel .product-card {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.carousel.static .product-card {
  position: relative;
}
.carousel .product-card-img {
  width: 10vw;
  height: 15vw;
  object-fit: contain;
  display: block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>

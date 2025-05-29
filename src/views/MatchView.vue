<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useFanflixStore } from '../stores/fanflix'
import Bucket from '../components/Bucket.vue'

const fanflixStore = useFanflixStore()

// Only select products that have not been categorized yet
const uncategorizedProducts = computed(() =>
  fanflixStore.products.filter((p) => p.IsSeen === undefined || p.IsSeen === null),
)

const randomProduct = ref<any>(null)

function pickRandomProduct() {
  const products = uncategorizedProducts.value
  if (products.length === 0) {
    randomProduct.value = null
    return
  }
  const randomIndex = Math.floor(Math.random() * products.length)
  randomProduct.value = products[randomIndex]
}

const droppedBucket = ref('')
const droppedProduct = ref<any>(null)
const dragPosition = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const offset = ref({ x: 0, y: 0 })

const buckets = [
  { name: 'Top Left', class: 'top-left' },
  { name: 'Top Right', class: 'top-right' },
  { name: 'Bottom Left', class: 'bottom-left' },
  { name: 'Bottom Right', class: 'bottom-right' },
]

// --- Bucket counters ---
const topLeftCount = computed(
  () => fanflixStore.products.filter((p) => p.IsSeen === true && p.IsLiked === false).length,
)
const topRightCount = computed(
  () => fanflixStore.products.filter((p) => p.IsSeen === true && p.IsLiked === true).length,
)
const bottomLeftCount = computed(
  () => fanflixStore.products.filter((p) => p.IsSeen === false && p.IsLiked === false).length,
)
const bottomRightCount = computed(
  () => fanflixStore.products.filter((p) => p.IsSeen === false && p.IsLiked === true).length,
)
// -----------------------

onMounted(() => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  dragPosition.value = { x: viewportWidth / 2, y: viewportHeight / 2 - 30 }
  pickRandomProduct()
})

function getBucketAt(x: number, y: number) {
  for (const bucket of buckets) {
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

const onPointerDown = (event: MouseEvent | TouchEvent) => {
  if (!randomProduct.value) return
  isDragging.value = true

  let clientX: number, clientY: number
  if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
  } else {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
    window.addEventListener('touchmove', onPointerMove)
    window.addEventListener('touchend', onPointerUp)
  }
  offset.value = {
    x: clientX - dragPosition.value.x,
    y: clientY - dragPosition.value.y,
  }
}

const onPointerMove = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  let clientX: number, clientY: number
  if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
  } else {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  }
  dragPosition.value = {
    x: clientX - offset.value.x,
    y: clientY - offset.value.y,
  }
}

const onPointerUp = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  let clientX: number, clientY: number
  if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
    window.removeEventListener('mousemove', onPointerMove)
    window.removeEventListener('mouseup', onPointerUp)
  } else {
    clientX = event.changedTouches[0].clientX
    clientY = event.changedTouches[0].clientY
    window.removeEventListener('touchmove', onPointerMove)
    window.removeEventListener('touchend', onPointerUp)
  }
  const bucket = getBucketAt(clientX, clientY)
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
    droppedBucket.value = bucket
    droppedProduct.value = randomProduct.value

    // After a short delay, pull a new random product and reset state
    setTimeout(() => {
      droppedBucket.value = ''
      droppedProduct.value = null
      pickRandomProduct()
      // Reset drag position to center
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      dragPosition.value = { x: viewportWidth / 2, y: viewportHeight / 2 - 30 }
    }, 800)
  }
  isDragging.value = false
}
</script>

<template>
  <div class="match-view">
    <div v-if="fanflixStore.loading">
      <p>Loading products...</p>
    </div>
    <div
      v-else-if="randomProduct && !droppedProduct"
      class="product-card"
      :style="{
        top: `${dragPosition.y}px`,
        left: `${dragPosition.x}px`,
        position: 'absolute',
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'box-shadow 0.2s',
        pointerEvents: 'auto',
      }"
      @mousedown="onPointerDown"
      @touchstart="onPointerDown"
    >
      <img
        :src="`${randomProduct.ImageURL}?w=300`"
        :alt="randomProduct.Name"
        class="product-image"
        draggable="false"
        @dragstart.prevent
      />
      <p class="product-title">{{ randomProduct.Name }}</p>
    </div>
    <div v-else-if="!randomProduct">
      <p>No products available to display.</p>
    </div>

    <!-- Buckets with counters -->
    <Bucket
      bucketClass="top-left"
      label="Seen It"
      icon1="✅"
      icon1Class="check"
      icon2="👎"
      icon2Class="thumb-down"
      desc="Don't Like It"
      :count="topLeftCount"
      :showProduct="droppedBucket === 'Top Left'"
      :product="droppedProduct"
    />
    <Bucket
      bucketClass="top-right"
      label="Seen It"
      icon1="✅"
      icon1Class="check"
      icon2="👍"
      icon2Class="thumb-up"
      desc="Like It"
      :count="topRightCount"
      :showProduct="droppedBucket === 'Top Right'"
      :product="droppedProduct"
    />
    <Bucket
      bucketClass="bottom-left"
      label="Haven't Seen It"
      icon1="❌"
      icon1Class="xmark"
      icon2="👎"
      icon2Class="thumb-down"
      desc="Not Interested"
      :count="bottomLeftCount"
      :showProduct="droppedBucket === 'Bottom Left'"
      :product="droppedProduct"
    />
    <Bucket
      bucketClass="bottom-right"
      label="Haven't Seen It"
      icon1="❌"
      icon1Class="xmark"
      icon2="👍"
      icon2Class="thumb-up"
      desc="Interested"
      :count="bottomRightCount"
      :showProduct="droppedBucket === 'Bottom Right'"
      :product="droppedProduct"
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
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  z-index: 1000;
  transform: translate(-50%, -50%);
  user-select: none;
}

.product-card:active {
  cursor: grabbing;
}

.product-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.product-image {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 8px;
  -webkit-user-drag: none;
  user-drag: none;
  pointer-events: none;
}

.product-title {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  pointer-events: none;
}

.bucket {
  position: absolute;
  width: 40%;
  height: 40%;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  border: 2.5px solid #444;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  text-align: center;
  font-size: 1.2rem;
  transition:
    box-shadow 0.2s,
    border-color 0.2s,
    background 0.2s;
  padding: 1.2rem 0.5rem;
  gap: 0.5rem;
  user-select: none;
  pointer-events: auto;
}

.bucket-label {
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  margin-bottom: 0.2rem;
  opacity: 0.85;
}

.bucket-icons {
  font-size: 2.2rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
}

.icon.check {
  filter: drop-shadow(0 0 4px #2ecc40);
}
.icon.xmark {
  filter: drop-shadow(0 0 4px #e74c3c);
}
.icon.thumb-up {
  filter: drop-shadow(0 0 4px #3498db);
}
.icon.thumb-down {
  filter: drop-shadow(0 0 4px #e67e22);
}

.bucket-desc {
  font-size: 1rem;
  opacity: 0.8;
  margin-top: 0.2rem;
}

.bucket-product {
  margin-top: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.bucket-product-image {
  width: 60px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}

.bucket-product-title {
  font-size: 0.95rem;
  margin-top: 0.2rem;
  color: #fff;
  opacity: 0.9;
  text-align: center;
}

.bucket-count {
  margin-top: 0.2rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffd700;
  opacity: 0.95;
  display: block;
}

.bucket:hover,
.bucket:focus-within {
  box-shadow:
    0 0 0 4px #007bff55,
    0 8px 32px 0 rgba(31, 38, 135, 0.18);
  border-color: #007bff;
  background: linear-gradient(135deg, #232526 0%, #2c5364 100%);
}

.bucket.top-left {
  top: 5%;
  left: 5%;
}

.bucket.top-right {
  top: 5%;
  right: 5%;
}

.bucket.bottom-left {
  bottom: 10%;
  left: 5%;
}

.bucket.bottom-right {
  bottom: 10%;
  right: 5%;
}

.dropped-message {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #00ff00;
}
</style>

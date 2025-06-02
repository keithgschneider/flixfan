<template>
  <div
    class="product-card"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`,
      position: 'absolute',
      zIndex: 1000,
      cursor: isDragging ? 'grabbing' : 'grab',
      transition: isDragging ? 'none' : 'box-shadow 0.2s',
      pointerEvents: 'auto',
      transform: 'translate(-50%, -50%)',
    }"
    @mousedown="onPointerDown"
    @touchstart="onPointerDown"
  >
    <img
      v-if="product"
      :src="`${product.ImageURL}?w=300`"
      :alt="product.Name"
      class="product-image"
      draggable="false"
      @dragstart.prevent
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product'
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  product: Product | null
  initialPosition: { x: number; y: number }
}>()
const emit = defineEmits<{
  (e: 'dropped', coords: { x: number; y: number }): void
}>()

const isDragging = ref(false)
const position = ref({ ...props.initialPosition })
const offset = ref({ x: 0, y: 0 })

watch(
  () => props.initialPosition,
  (val) => {
    position.value = { ...val }
  },
)

function onPointerDown(event: MouseEvent | TouchEvent) {
  if (!props.product) return
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
    x: clientX - position.value.x,
    y: clientY - position.value.y,
  }
}

function onPointerMove(event: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  let clientX: number, clientY: number
  if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
  } else {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  }
  position.value = {
    x: clientX - offset.value.x,
    y: clientY - offset.value.y,
  }
}

function onPointerUp(event: MouseEvent | TouchEvent) {
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
  isDragging.value = false
  emit('dropped', { x: clientX, y: clientY })
}

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onPointerMove)
  window.removeEventListener('mouseup', onPointerUp)
  window.removeEventListener('touchmove', onPointerMove)
  window.removeEventListener('touchend', onPointerUp)
})
</script>

<style scoped>
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
</style>

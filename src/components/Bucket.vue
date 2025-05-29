<template>
  <div :class="['bucket', bucketClass]">
    <span class="bucket-label">{{ label }}</span>
    <span class="bucket-icons">
      <span v-if="icon1" :class="['icon', icon1Class]">{{ icon1 }}</span>
      <span v-if="icon2" :class="['icon', icon2Class]">{{ icon2 }}</span>
    </span>
    <span class="bucket-desc">{{ desc }}</span>
    <span class="bucket-count">{{ count }}</span>
    <div v-if="showProduct && product" class="bucket-product">
      <img :src="`${product.ImageURL}?w=80`" :alt="product.Name" class="bucket-product-image" />
      <div class="bucket-product-title">{{ product.Name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  bucketClass: string
  label: string
  icon1?: string
  icon1Class?: string
  icon2?: string
  icon2Class?: string
  desc: string
  count: number
  showProduct?: boolean
  product?: any
}>()
</script>

<style scoped>
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
</style>

import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import GamesView from '../views/GamesView.vue'

const routes = [
  { path: '/', name: 'Products', component: ProductsView },
  { path: '/games', name: 'Games', component: GamesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

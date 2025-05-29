import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import GamesView from '../views/GamesView.vue'
import MatchView from '../views/MatchView.vue'

const routes = [
  { path: '/', name: 'Products', component: ProductsView },
  { path: '/games', name: 'Games', component: GamesView },
  { path: '/match', name: 'Match', component: MatchView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

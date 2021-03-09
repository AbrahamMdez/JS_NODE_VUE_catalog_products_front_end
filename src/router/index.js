import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Article',
    component: () => import('../components/Article.vue')
  },
  {
    path: '/favs',
    name: 'Favs',
    component: () => import('../views/Fav.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

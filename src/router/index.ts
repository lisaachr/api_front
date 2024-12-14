import { createRouter, createWebHistory } from 'vue-router'
import API from '@/views/Main.vue'
import AllUsers from '@/views/AllUsers.vue'
import AllEvents from '@/views/AllEvents.vue'
import AllScenes from '@/views/AllScenes.vue'
import AllPartieConcert from '@/views/AllPartiesConcerts.vue'
import SingleEvent from '@/views/SingleEvent.vue'
import SingleUser from '@/views/SingleUser.vue'
import SinglePartieConcert from '@/views/SinglePartieConcert.vue'
import SingleScene from '@/views/SingleScene.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: API,
      redirect: { name: 'api_front' }
    },
    {
      path: '/api_front',
      name: 'api_front',
      component: API
    },
    {
      path: '/users',
      name: 'allUsers',
      component: AllUsers
    },
    {
      path: '/users/:id',
      name: 'singleUser',
      component: SingleUser
    },
    {
      path: '/evenement/:id',
      name: 'singleEvent',
      component: SingleEvent
    },
    {
      path: '/partieconcert/:id',
      name: 'singlePartieConcert',
      component: SinglePartieConcert
    },
    {
      path: '/scene/:id',
      name: 'singleScene',
      component: SingleScene
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: 'api_front'
    },
    {
      path: '/allEvents',
      name: 'allEvents',
      component: AllEvents
    },
    {
      path: '/allScenes',
      name: 'allScenes',
      component: AllScenes
    },
    {
      path: '/allPartieConcert',
      name: 'allPartieConcert',
      component: AllPartieConcert
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/FormulaireConnexion.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('@/views/FormulaireInscription.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import API from '@/views/Main.vue'
import User from '@/views/AllUsers.vue'
import AllEvents from '@/views/AllEvents.vue'
import AllScenes from '@/views/AllScenes.vue'
import AllPartieConcert from '@/views/AllPartiesConcerts.vue'

const router = createRouter({
  //Cette ligne indique qu'on utilise la gestion html5 des urls
  //l'argument donné à la fonction createWebHistory sert de base pour la réécriture des routes
  //on utilise donc import.meta.env.BASE_URL qui correspond à la valeur donné à base dans le fichier vite.config.ts
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: API,
      redirect: { name: 'api_front' },
      children: []
    },
    {
      path: '/api_front',
      name: 'api_front',
      component: API
    },
    {
      path: '/users',
      name:'allUsers',
      component: User
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
      component: () => import('@/views/FormulaireInscription.vue'),
    }
  ]
})

export default router

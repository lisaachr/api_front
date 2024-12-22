import { createRouter, createWebHistory } from 'vue-router';
import API from '@/views/MainView.vue';
import AllEvents from '@/views/AllEvents.vue';
import AllScenes from '@/views/AllScenes.vue';

const router = createRouter({
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
      component: API,
      children: []
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
      path: '/login',
      name: 'login',
      component: () => import('@/views/FormulaireConnexion.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('@/views/FormulaireInscription.vue')
    },
    {
      path: '/updateProfil/',
      name: 'updateProfil',
      component: () => import('@/views/FormulaireModifUser.vue')
    }
  ]
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import CurrencyPage from '@/pages/CurrencyPage.vue';
import GamesPage from '@/pages/GamesPage.vue';
import SlotPage from '@/pages/SlotPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/pages/games'
    },
    {
      path: '/pages/currency',
      component: CurrencyPage
    },
    {
      path: '/pages/games',
      component: GamesPage
    },
    {
      path: '/pages/slot',
      component: SlotPage
    }
  ]
});

export default router;

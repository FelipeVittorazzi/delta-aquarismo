import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: () => import('@/layouts/TabsLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'promocoes',
        component: () => import('@/views/PromocoesPage.vue')
      },
      {
        path: 'fichas',
        component: () => import('@/views/FichasPage.vue')
      },
      {
        path: 'ficha/:id',
        component: () => import('@/views/FichaDetalhe.vue')
      },
      {
        path: 'calculadoras',
        component: () => import('@/views/CalculadorasPage.vue')
      },
      {
        path: 'conta',
        component: () => import('@/views/ContaPage.vue')
      },
      {
        path: 'historico/:type',
        component: () => import('@/views/HistoricoPage.vue')
      },
      {
        path: 'favoritos',
        component: () => import('@/views/FavoritosPage.vue')
      },
      {
        path: 'comentarios',
        component: () => import('@/views/ComentariosPage.vue')
      },
      {
        path: 'editar-perfil',
        component: () => import('@/views/EditarPerfilPage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;

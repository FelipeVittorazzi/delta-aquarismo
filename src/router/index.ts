import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { authGuard, blockLoginWhenAuthenticated } from '@/router/guards';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { public: true },
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
        component: () => import('@/views/ContaPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'historico/:type',
        component: () => import('@/views/HistoricoPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'favoritos',
        component: () => import('@/views/FavoritosPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'comentarios',
        component: () => import('@/views/ComentariosPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'editar-perfil',
        component: () => import('@/views/EditarPerfilPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

router.beforeEach(blockLoginWhenAuthenticated);
router.beforeEach(authGuard);

export default router;

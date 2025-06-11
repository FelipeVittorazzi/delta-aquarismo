import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabBar from '@/components/TabBar.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: TabBar,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'promocoes',
        name: 'Promocoes',
        component: () => import('@/views/PromocoesPage.vue')
      },
      {
        path: 'fichas',
        name: 'Fichas',
        component: () => import('@/views/FichasPage.vue')
      },
      {
        path: 'ficha/:id',
        name: 'FichaDetalhe',
        component: () => import('@/views/FichaDetalhe.vue')
      },
      {
        path: 'calculadoras',
        name: 'Calculadoras',
        component: () => import('@/views/CalculadorasPage.vue')
      },
      {
        path: 'conta',
        name: 'Conta',
        component: () => import('@/views/ContaPage.vue')
      },
      {
        path: 'historico/:type',
        name: 'Historico',
        component: () => import('@/views/HistoricoPage.vue')
      },
      {
        path: 'favoritos',
        name: 'Favoritos',
        component: () => import('@/views/FavoritosPage.vue')
      },
      {
        path: 'comentarios',
        name: 'Comentarios',
        component: () => import('@/views/ComentariosPage.vue')
      },
      {
        path: 'editar-perfil',
        name: 'EditarPerfil',
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

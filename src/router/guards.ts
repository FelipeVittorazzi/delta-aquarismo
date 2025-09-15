import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { isTokenValid, loadToken } from '@/utils/storage';

export function authGuard(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  // Qualquer rota não pública exige autenticação
  if (to.meta.public) return next();
  const token = loadToken();
  if (!isTokenValid(token)) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }
  return next();
}

export function blockLoginWhenAuthenticated(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (to.path !== '/login') return next();
  const token = loadToken();
  if (isTokenValid(token)) {
    return next({ path: '/home' });
  }
  return next();
}



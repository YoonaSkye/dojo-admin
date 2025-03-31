import type { AppRouteObject } from '@/types';
import { coreRoutes, fallbackNotFoundRoute } from './core';

export function getRoutesFromModules() {
  const menuModules: AppRouteObject[] = [];

  const modules = import.meta.glob('./modules/**/*.tsx', {
    eager: true,
  });
  for (const key in modules) {
    const mod = (modules as any)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  }
  return menuModules;
}

export const dynamicRouteFiles = import.meta.glob('./modules/**/*.tsx', {
  eager: true,
});

/**动态路由 */
// const dynamicRoutes: AppRouteObject[] = mergeRouteModules(dynamicRouteFiles);
const dynamicRoutes: AppRouteObject[] = getRoutesFromModules();

/** 路由列表，由基本路由、外部路由和404兜底路由组成
 *  无需走权限验证（会一直显示在菜单中） */
const routes: AppRouteObject[] = [...coreRoutes];

/** 有权限校验的路由列表，包含动态路由和静态路由 */
const accessRoutes = [...dynamicRoutes];
export { accessRoutes, routes, fallbackNotFoundRoute };

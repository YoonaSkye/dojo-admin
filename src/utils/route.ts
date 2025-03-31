import { AppRouteObject } from '@/types';

/**
 *
 * @param absolutePath 当前location中的路由地址
 * @param routes 全部权限路由
 * @returns 匹配的路由对象
 */
const findRouteByAbsolutePath = (
  absolutePath: string,
  routes: AppRouteObject[]
) => {
  function find(routes: Array<AppRouteObject>): AppRouteObject | undefined {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.path === absolutePath) {
        return route;
      }
      if (route.children && route.children.length > 0) {
        const targetRoute = find(route.children);
        if (targetRoute) {
          return targetRoute;
        }
      }
    }
  }
  return find(routes);
};

export { findRouteByAbsolutePath };

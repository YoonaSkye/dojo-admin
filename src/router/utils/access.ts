import { AppRouteObject } from '#/router';
import { filterTree } from '@/utils';

/**
 * 动态生成路由 - 前端方式
 */
function generateRoutesByFrontend(
  routes: AppRouteObject[],
  roles: string[]
): AppRouteObject[] {
  // 根据角色标识过滤路由表,判断当前用户是否拥有指定权限
  const finalRoutes = filterTree(routes, (route) => {
    return hasAuthority(route, roles);
  });

  return finalRoutes;
}

/**
 * 判断路由是否有权限访问
 * @param route
 * @param access
 */
function hasAuthority(route: AppRouteObject, access: string[]) {
  const authority = route.handle?.authority;
  if (!authority) {
    return true;
  }
  const canAccess = access.some((value) => authority.includes(value));

  return canAccess;
}

export { generateRoutesByFrontend };

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import type { AppRouteObject, RouteRecordStringComponent } from '@/types';
import { filterTree, mapTree } from '@/utils';

const ENTRY_PATH = '/src/pages';
const pagesMap: Record<string, () => Promise<any>> = import.meta.glob(
  '/src/pages/**/index.tsx',
);

const loadComponentFromPath = (path: string) =>
  lazy(pagesMap[`${ENTRY_PATH}${path}`]);

const Forbidden = lazy(() => import('@/pages/_core/fallback/forbidden'));

/**
 * 判断路由是否有权限访问
 * @param route
 * @param access 用户角色列表
 */
function hasAuthority(
  route: RouteRecordStringComponent,
  access: string[],
): boolean {
  const authority = route.handle?.authority;
  if (!authority || authority.length === 0) {
    return true;
  }
  const canAccess = access.some((value) => authority.includes(value));

  return canAccess || (!canAccess && menuHasVisibleWithForbidden(route));
}

/**
 * 判断路由是否在菜单中显示，但是访问会被重定向到403
 * @param route
 */
function menuHasVisibleWithForbidden(
  route: RouteRecordStringComponent,
): boolean {
  return (
    !!route.handle?.authority &&
    'menuVisibleWithForbidden' in (route.handle || {}) &&
    route.handle?.menuVisibleWithForbidden === true
  );
}

/**
 * 动态生成路由 - 前端方式
 * @param routes 静态路由配置
 * @param roles 用户角色列表
 * @returns 转换后的路由和需要缓存的路由
 */
function generateRoutesByFrontend(
  routes: RouteRecordStringComponent[],
  roles: string[],
): { routes: AppRouteObject[]; cacheRoutes: string[] } {
  // 根据角色标识过滤路由表,判断当前用户是否拥有指定权限
  const finalRoutes = filterTree(routes, (route) => {
    return hasAuthority(route, roles);
  });

  const cacheRoutes: string[] = [];

  // 转换所有过滤后的路由
  const convertedRoutes = convertRoutes(finalRoutes, cacheRoutes);

  // 如果有禁止访问的页面，将禁止访问的页面替换为403页面
  const routesWithForbidden = mapTree(convertedRoutes, (route) => {
    const authority = route.handle?.authority;
    if (
      route.handle?.menuVisibleWithForbidden &&
      authority &&
      !roles.some((role) => authority.includes(role))
    ) {
      return { ...route, element: <Forbidden /> };
    }
    return route;
  });

  return { routes: routesWithForbidden, cacheRoutes };
}

function convertRoutes(
  routes: RouteRecordStringComponent[],
  cacheRoutes: string[] = [],
): AppRouteObject[] {
  return mapTree(routes, (node) => {
    // 对于index路由单独处理
    if (node.index) return node;

    const route = {} as AppRouteObject;

    const { name, component, redirect, path, handle, children } = node;

    if (name) route.id = name;
    if (path) route.path = path;
    if (handle) route.handle = handle;
    if (children && children.length > 0) route.children = [...children];

    // layout转换
    if (!component && redirect) {
      if (children && children.length > 0) {
        // 添加index路由
        const indexRoute: AppRouteObject = {
          id: `${name}-index`,
          index: true,
          handle,
          element: <Navigate to={redirect} replace />,
        };

        route.children?.unshift(indexRoute);
      }
    } else if (component) {
      if (pagesMap[`${ENTRY_PATH}${component}`]) {
        const Comp = loadComponentFromPath(component);
        route.element = <Comp />;
      } else {
        console.error(`route component is invalid: ${component}`, node);
        route.Component = loadComponentFromPath(
          '/_core/fallback/not-found/index.tsx',
        );
      }

      // 如果路由配置了 keepAlive，则将其路径添加到 cacheRoutes 中
      if (handle?.keepAlive && route.path) {
        cacheRoutes.push(route.path);
      }
    }

    return route;
  });
}

export { generateRoutesByFrontend, hasAuthority, menuHasVisibleWithForbidden };
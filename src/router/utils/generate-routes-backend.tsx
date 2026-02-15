import { mapTree } from '@/utils';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { AppRouteObject, RouteRecordStringComponent } from '@/types';

const ENTRY_PATH = '/src/pages';
const pagesMap: Record<string, () => Promise<any>> = import.meta.glob(
  '/src/pages/**/index.tsx',
);
console.log('pagesMap', pagesMap);

const loadComponentFromPath = (path: string) =>
  lazy(pagesMap[`${ENTRY_PATH}${path}`]);

/**
 * 动态生成路由 - 后端方式
 */
function generateRoutesByBackend(menuRoutes: RouteRecordStringComponent[]) {
  const cacheRoutes = [] as string[];
  const routes = convertRoutes(menuRoutes, cacheRoutes);

  return { routes, cacheRoutes };
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
        // 添加index路由，例如： /dashboard 路由不渲染页面，但有子路由 /dashboard/analytics
        const indexRoute: AppRouteObject = {
          id: `${name}-index`,
          index: true,
          handle,
          element: <Navigate to={redirect} replace />,
        };

        route.children?.unshift(indexRoute);
      }

      // 页面组件转换
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
      // 目前只针对了页面级路由，且路径必须存在
      // TODO
      // if (handle?.keepAlive) cacheRoutes.push(route.path || '');
    }

    return route;
  });
}

export { convertRoutes, generateRoutesByBackend };

import { AppRouteObject } from '@/types';
import { mapTree } from '@/utils';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

// 定义递归类型以将 RouteObject 的 component / element 属性更改为 string
type RouteRecordStringComponent<T = string> = {
  redirect?: string;
  children?: RouteRecordStringComponent<T>[];
  component: T;
} & Omit<RouteObject, 'children' | 'component'>;

const ENTRY_PATH = '/src/pages';
const pagesMap = import.meta.glob('/src/pages/**/index.tsx');

const loadComponentFromPath = (path: string) =>
  pagesMap[`${ENTRY_PATH}${path}`];

/**
 * 动态生成路由 - 后端方式
 */
function generateRoutesByBackend(menuRoutes: any): AppRouteObject[] {
  const routes = convertRoutes(menuRoutes);

  return routes;
}

function convertRoutes(routes: RouteRecordStringComponent[]): AppRouteObject[] {
  return mapTree(routes, (node) => {
    // 对于index路由单独处理
    if (node.index) return node;

    const route = {} as AppRouteObject;

    const { component, redirect, path, handle, children } = node;

    route.path = path;
    if (handle) route.handle = handle;
    if (children && children.length > 0) route.children = [...children];

    // layout转换
    if (!component && redirect) {
      if (children && children.length > 0) {
        const indexRoute: AppRouteObject = {
          index: true,
          element: <Navigate to={redirect} replace />,
        };

        route.children?.unshift(indexRoute);
      }

      // 页面组件转换
    } else if (component) {
      const Comp = lazy(loadComponentFromPath(component) as any);

      route.element = <Comp />;
    }

    return route;
  });
}

export { convertRoutes, generateRoutesByBackend };

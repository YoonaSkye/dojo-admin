import { useAccessMenus } from '@/store/access';

import { lazy, Suspense, useMemo } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

type RouteRecordRaw = {
  path: string;
  component?: string;
  handle: [];
  redirect?: string;
  children?: RouteRecordRaw[];
};
// 使用 import.meta.glob 获取所有路由组件
const pages = import.meta.glob('/src/pages/**/*.tsx');

// 构建绝对路径的函数
const resolveComponent = (path: string) => {
  return pages[`/src/pages${path}`];
};

export function usePermission() {
  const permissions = useAccessMenus();
  // console.log('permission', permissions);

  return useMemo(() => {
    const asyncRoutes = generateRoutesByBackend(permissions);

    return [...asyncRoutes];
  }, [permissions]);
}

function generateRoutesByBackend(menuRoutes: RouteRecordRaw[]) {
  const resultRoutes = menuRoutes.map((node) => {
    const { component, redirect, path, handle, children } =
      node as RouteRecordRaw;
    const route: RouteObject = {
      path: path,
      handle: handle,
    };
    // layout转换
    if (component && component === 'BasicLayout') {
      route.element = (
        <Suspense fallback={<p>Loading</p>}>
          <Outlet />
        </Suspense>
      );
      // 页面组件转换
    } else if (component) {
      const Element = lazy(resolveComponent(component) as any);
      route.element = <Element />;
    }

    if (children) route.children = generateRoutesByBackend(children);

    if (redirect && route.children && route.children.length > 0) {
      route.children?.unshift({
        index: true,
        element: <Navigate to={redirect} replace />,
      });
    }

    return route;
  });

  return resultRoutes;
}

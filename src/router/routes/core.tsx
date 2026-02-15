import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import type { AppRouteObject } from '@/types';
import { traverseTreeValues } from '@/utils';

// eslint-disable-next-line react-refresh/only-export-components
const Login = lazy(() => import('@/pages/_core/authentication/login'));
const BasicLayout = lazy(() => import('@/layouts/basic'));
const AuthGuard = lazy(() => import('../components/AuthGuard'));
const FallbackNotFound = lazy(() => import('@/pages/_core/fallback/not-found'));

const HOME_PAGE = import.meta.env.VITE_APP_HOMEPAGE || '/dashboard/analytics';

/** 全局404页面 */
const fallbackNotFoundRoute: AppRouteObject = {
  id: 'notFound',
  path: '*',
  element: <FallbackNotFound />,
  handle: {
    name: 'FallbackNotFound',
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },
};

/** 基本路由，这些路由是必须存在的 */
const coreRoutes: AppRouteObject[] = [
  /**
   * 布局路由
   * 使用基础布局，作为所有页面的父级容器，子级就不必配置BasicLayout。
   * 此路由必须存在，且不应修改
   */
  {
    id: 'basic-layout',
    element: <BasicLayout />,
    handle: {
      title: 'Basic Layout',
      hideInBreadcrumb: true,
      hideInTab: true,
    },
    children: [],
  },
  {
    id: 'Authentication',
    path: '/auth',
    handle: {
      title: 'Authentication',
      hideInTab: true,
    },
    children: [
      {
        id: 'Login',
        path: '/auth/login',
        handle: {
          title: 'page.auth.login',
        },
        element: <Login />,
      },
    ],
  },
];

/** 路由列表，由基本路由、外部路由和404兜底路由组成
 *  无需走权限验证（会一直显示在菜单中） */
const routes: RouteObject[] = [
  /**
   * 根路由 - 包含全局路由守卫
   * 处理所有路由的访问权限和重定向逻辑
   * 此路由必须存在，且不应修改
   */
  {
    path: '/',
    id: 'root',
    element: <AuthGuard />,
    children: [
      {
        id: 'root-index',
        index: true,
        element: <Navigate to={HOME_PAGE} replace />,
        handle: { title: 'root' },
      },
      ...(coreRoutes as unknown as RouteObject[]),
      fallbackNotFoundRoute as unknown as RouteObject,
    ],
  },
];

/** 基本路由列表，这些路由不需要进入权限拦截 */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.id);

export { coreRoutes, fallbackNotFoundRoute, routes, coreRouteNames };

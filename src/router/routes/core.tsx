import type { AppRouteObject } from '#/router';
import Login from '@/pages/_core/authentication/login/Login';
import { lazy } from 'react';

/** 全局404页面 */
const fallbackNotFoundRoute: AppRouteObject = {
  path: '*',
  Component: lazy(() => import('@/pages/_core/fallback/not-found.tsx')),
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
  {
    path: '/auth',
    handle: {
      name: 'Authentication',
      title: 'Authentication',
      hideInTab: true,
    },
    // element: <AuthPageLayout />,
    // redirect: LOGIN_PATH,
    children: [
      {
        path: '/auth/login',
        handle: {
          name: 'Login',
          title: 'page.auth.login',
        },
        element: <Login />,
      },
    ],
  },
];

export { coreRoutes, fallbackNotFoundRoute };

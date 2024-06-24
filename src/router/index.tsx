import { AppRouteObject } from '#/router';
import {
  createHashRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

// TODO: 后续对路由进行懒加载处理
// import Login from '@/pages/sys/login/Login';
import DashboardLayout from '@/layouts/dashboard';
import DefaultLayout from '@/layouts/default';
import { usePermissionRoutes } from '@/router/hooks/use-permission-routes';
import { lazy } from 'react';
import AuthGuard from './components/AuthGuard';
import { ErrorRoutes } from './routes/error-routes';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};

const Not_Found_Page_Route: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  // TODO：完善动态路由功能
  const permissonRoutes = usePermissionRoutes();
  const asyncRoutes: AppRouteObject = {
    // TODO: 完善路由守卫功能
    path: '/',
    element: (
      <AuthGuard>
        {/* <DashboardLayout /> */}
        <DefaultLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      ...permissonRoutes,
    ],
  };

  // 路由：异步路由 + 同步路由
  const routes: AppRouteObject[] = [
    LoginRoute,
    asyncRoutes,
    ErrorRoutes,
    Not_Found_Page_Route,
  ];

  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}

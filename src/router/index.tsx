import {
  createHashRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

// TODO: 后续对路由进行懒加载处理
import DefaultLayout from '@/layouts/default';
import { lazy } from 'react';
import AuthGuard from './components/AuthGuard';
import { usePermission } from './hooks/use-permission';
import { ErrorRoutes } from './routes/error-routes';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const LoginRoute: RouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};

const Not_Found_Page_Route: RouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  // TODO：完善动态路由功能
  const permissonRoutes = usePermission();

  const asyncRoutes: RouteObject = {
    // TODO: 完善路由守卫功能
    path: '/',
    element: (
      <AuthGuard>
        <DefaultLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      ...permissonRoutes,
    ],
  };

  // 路由：异步路由 + 同步路由
  const routes: RouteObject[] = [
    LoginRoute,
    asyncRoutes,
    ErrorRoutes,
    Not_Found_Page_Route,
  ];

  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}

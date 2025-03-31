import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import BasicLayout from '@/layouts/basic';
import AuthGuard from './components/AuthGuard';
import { AppRouteObject } from '@/types';
import { routes, fallbackNotFoundRoute } from './routes';

import { useAccessRoutes } from '@/store/access';

export default function Router() {
  const permissonRoutes = useAccessRoutes();

  const authRoutes: AppRouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <BasicLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard/analytics" replace /> },
      ...permissonRoutes,
    ],
  };

  const newRoutes = [...routes, authRoutes, fallbackNotFoundRoute];

  const router = createBrowserRouter(newRoutes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}

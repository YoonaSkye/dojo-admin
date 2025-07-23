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
    path: '/*',
    element: <AuthGuard />,
    children: [
      { element: <BasicLayout />, children: [...permissonRoutes] },
      fallbackNotFoundRoute,
    ],
  };

  const newRoutes = [
    ...routes,
    { path: '/', element: <Navigate to="/dashboard/analytics" replace /> },
    authRoutes,
  ];

  const router = createBrowserRouter(newRoutes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}

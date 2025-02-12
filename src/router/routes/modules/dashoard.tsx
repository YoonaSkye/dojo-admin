import { AppRouteObject } from '#/router';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Analytics = lazy(() => import('@/pages/dashboard/analytics'));
const Workspace = lazy(() => import('@/pages/dashboard/workspace'));

const dashboard: AppRouteObject = {
  path: '/dashboard',
  handle: {
    name: 'Dashboard',
    title: 'page.dashboard.title',
    icon: 'lucide:layout-dashboard',
    order: -1,
  },
  children: [
    {
      index: true,
      element: <Navigate to="/dashboard/analytics" replace />,
    },
    {
      path: '/dashboard/analytics',
      element: <Analytics />,
      handle: {
        name: 'Analytics',
        title: 'page.dashboard.analytics',
        affixTab: true,
        icon: 'lucide:area-chart',
      },
    },
    {
      path: '/dashboard/workspace',
      element: <Workspace />,
      handle: {
        name: 'Workspace',
        title: 'page.dashboard.workspace',
        icon: 'carbon:workspace',
      },
    },
  ],
};

export default dashboard;

import { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { Spin } from 'antd';

import AuthGuard from '../components/AuthGuard';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@/pages/sys/error/Page500'));

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: RouteObject = {
  element: (
    <AuthGuard>
      <div className="flex h-screen w-full flex-col">
        <Suspense fallback={<Spin size="large" />}>
          <Outlet />
        </Suspense>
      </div>
    </AuthGuard>
  ),
  children: [
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
  ],
};

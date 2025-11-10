import { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { Spin } from 'antd';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@/pages/sys/error/Page500'));

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: RouteObject = {
  element: (
    <div className="flex h-screen w-full flex-col">
      <h1>错误页面</h1>
      <Suspense fallback={<Spin size="large" />}>
        <Outlet />
      </Suspense>
    </div>
  ),
  children: [
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
  ],
};

import { useAccessStore } from '@/store/access';
import { useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePrevious, useRoute } from '../hooks/use-route';
import type { Route } from '@/types';

function handleRouteSwitch(to: Route, from: Route | null) {
  // route with href
  if (to.handle?.link) {
    window.open(to.handle.link, '_blank');

    return { path: from?.fullPath as string, replace: true };
  }

  return null;
}

function createRouteGuard(to: Route, previousRoute: Route | null) {
  const loginRoute = '/auth/login';
  const isLogin = Boolean(useAccessStore.getState().accessToken);

  const notFoundRoute = 'notFound';
  const isNotFoundRoute = to.id === notFoundRoute;

  if (!isLogin) {
    // if the user is not logged in and the route is a constant route but not the "not-found" route, then it is allowed to access.
    if (to.handle?.constant && !isNotFoundRoute) {
      return null;
    }

    // if the user is not logged in, then switch to the login page
    const query = to.fullPath;
    const location = `${loginRoute}?redirect=${query}`;

    return location;
  }

  const rootRoute = '/';

  // if it is login route when logged in, then switch to the root page
  if (
    to.fullPath.includes('login') &&
    to.pathname !== '/auth/loginout' &&
    isLogin
  ) {
    return rootRoute;
  }

  return handleRouteSwitch(to, previousRoute);
}

const RootLayout = () => {
  const route = useRoute();
  console.log('route', route);

  const previousRoute = usePrevious(route);

  const { id } = route;

  const routeId = useRef<string | null>(null);

  const location = useRef<string | { path: string; replace: boolean } | null>(
    null
  );

  if (routeId.current !== id) {
    routeId.current = id;

    location.current = createRouteGuard(route, previousRoute);
  }

  // eslint-disable-next-line no-nested-ternary
  return location.current ? (
    typeof location.current === 'string' ? (
      <Navigate to={location.current} />
    ) : (
      <Navigate replace={location.current.replace} to={location.current.path} />
    )
  ) : (
    <Outlet context={previousRoute} />
  );
};

export default RootLayout;

import type { RouteObject, NavigateOptions, To } from 'react-router-dom';
import { createBrowserRouter, matchRoutes, Navigate } from 'react-router-dom';

import BasicLayout from '@/layouts/basic';
import { useAccessStore } from '@/store/access';
import RootLayout from './components/RootLayout';
import { fallbackNotFoundRoute, routes } from './routes';
import { initAuthRoutes } from './utils/initRoutes';

const HOME_PAGE = import.meta.env.VITE_APP_HOMEPAGE || '/analytics';

const newRoutes: RouteObject[] = [
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    // HydrateFallback: Loading,
    children: [
      { index: true, element: <Navigate to={HOME_PAGE} replace /> },
      {
        id: 'basic',
        element: <BasicLayout />,
        children: [],
      },
      ...(routes as unknown as RouteObject[]),
      fallbackNotFoundRoute as unknown as RouteObject,
    ],
  },
];

function getIsNeedPatch(path: string) {
  if (!useAccessStore.getState().accessToken) return false;

  if (useAccessStore.getState().isAccessChecked) return false;

  const matchRoute = matchRoutes(
    newRoutes,
    { pathname: path },
    import.meta.env.VITE_BASE_URL
  );

  if (!matchRoute) return true;

  if (matchRoute) {
    return matchRoute[1].route.path === '*';
  }

  return false;
}

function initRouter() {
  const reactRouter = createBrowserRouter(newRoutes, {
    patchRoutesOnNavigation: async ({ patch, path }) => {
      // Dynamically import and patch routes if needed
      const isNeed = getIsNeedPatch(path);
      if (isNeed) {
        useAccessStore.setState({ isAccessChecked: true });

        await initAuthRoutes(patch);
      }
    },
  });

  function resetRoutes() {
    // useAccessStore.setState({ isAccessChecked: false });
    reactRouter._internalSetRoutes(newRoutes);
  }

  return { reactRouter, resetRoutes };
}

function navigator() {
  const { reactRouter, resetRoutes } = initRouter();

  async function navigate(path: To | null, options?: NavigateOptions) {
    reactRouter.navigate(path, options);
  }

  function back() {
    reactRouter.navigate(-1);
  }

  function forward() {
    reactRouter.navigate(1);
  }

  function go(delta: number) {
    reactRouter.navigate(delta);
  }

  function replace(path: To) {
    reactRouter.navigate(path, { replace: true });
  }

  function reload() {
    reactRouter.navigate(0);
  }

  function navigateUp() {
    reactRouter.navigate('..');
  }

  function goHome() {
    reactRouter.navigate(HOME_PAGE);
  }

  // eslint-disable-next-line max-params
  // function push(
  //   path: string,
  //   query?: LocationQueryRaw,
  //   state?: any,
  //   _replace?: boolean
  // ) {
  //   let _path = path;

  //   if (query) {
  //     const search = stringifyQuery(query);

  //     _path = `${path}?${search}`;
  //   }

  //   reactRouter.navigate(_path, { replace: _replace, state });
  // }

  return {
    back,
    forward,
    go,
    goHome,
    navigate,
    navigateUp,
    // push,
    reactRouter,
    reload,
    replace,
    resetRoutes,
  };
}

const router = navigator();

export { router };
export type RouterContextType = Awaited<ReturnType<typeof navigator>>;

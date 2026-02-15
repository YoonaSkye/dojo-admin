import type { NavigateOptions, To } from 'react-router-dom';
import { createBrowserRouter, matchRoutes } from 'react-router-dom';

import { useAccessStore } from '@/store/access';

import { routes } from './routes';
import { initAuthRoutes } from './utils/initRoutes';
import { checkIsAccessChecked, checkIsAuthenticated } from './utils/shared';

function getIsNeedPatch(path: string) {
  const isLogin = checkIsAuthenticated();
  const isAccessChecked = checkIsAccessChecked();

  if (!isLogin) return false;

  if (isAccessChecked) return false;

  const matchRoute = matchRoutes(
    routes,
    { pathname: path },
    import.meta.env.VITE_BASE_URL,
  );

  if (!matchRoute) return true;

  if (matchRoute) {
    return matchRoute[1].route.path === '*';
  }

  return false;
}

function initRouter() {
  const reactRouter = createBrowserRouter(routes, {
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
    reactRouter._internalSetRoutes(routes);
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

  return {
    back,
    forward,
    go,
    navigate,
    reactRouter,
    reload,
    replace,
    resetRoutes,
  };
}

const router = navigator();

export { router };
export type RouterContextType = Awaited<ReturnType<typeof navigator>>;

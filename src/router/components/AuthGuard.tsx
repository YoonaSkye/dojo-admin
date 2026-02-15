import type { Route } from '@/types';
import { startProgress, stopProgress } from '@/utils';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

import { usePrevious, useRoute } from '../hooks/use-route';
import { coreRouteNames } from '../routes';
import { checkIsAuthenticated, checkIsLoginRoute } from '../utils/shared';

/**
 * 处理外链跳转
 */
function handleRouteSwitch(to: Route, from: Route | null) {
  if (to.handle?.link) {
    window.open(to.handle.link, '_blank');
    return { path: from?.fullPath as string, replace: true };
  }
  return null;
}

/**
 * 完善的路由守卫逻辑
 * 处理场景：
 * 1. 未登录 -> 基本路由 + ignoreAccess=true路由允许，其他跳转登录页
 * 2. 已登录 -> 访问登录页跳转首页
 * 3. 已登录但无权限 -> 统一跳转404
 * 4. 外链处理 -> 打开新窗口
 * 5. 访问接口没有权限403  -> 跳转403
 */
function createRouteGuard(to: Route, previousRoute: Route | null) {
  const loginRoute = '/auth/login';
  const homePath = import.meta.env.VITE_APP_HOMEPAGE || '/dashboard/analytics';

  const isLogin = checkIsAuthenticated();
  const isLoginRoute = checkIsLoginRoute(to.fullPath);

  // 基本路由，这些路由不需要进入权限拦截
  if (coreRouteNames.includes(to.id as string)) {
    if (isLoginRoute && isLogin) {
      return homePath;
    }
    return null;
  }

  // accessToken 检查
  if (!isLogin) {
    // 明确声明忽略权限访问权限，则可以访问
    if (to.handle?.ignoreAccess) {
      return handleRouteSwitch(to, previousRoute);
    }

    // 没有访问权限，跳转登录页面
    if (!isLoginRoute) {
      return loginRoute;
    }
    return null;
  }

  return handleRouteSwitch(to, previousRoute);
}

const AuthGuard = () => {
  const route = useRoute();
  const previousRoute = usePrevious(route);

  const { id, handle, pathname } = route;
  const { title } = handle;

  const routeId = useRef<string | null>(null);
  const location = useRef<string | { path: string; replace: boolean } | null>(
    null,
  );

  const { t } = useTranslation();

  useEffect(() => {
    document.title = title ? t(title) : 'Dojo Vite';
  }, [title, t]);

  useEffect(() => {
    stopProgress();

    return () => {
      startProgress();
    };
  }, [pathname]);

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

export default AuthGuard;

import { RouteObject } from 'react-router-dom';

import { getAllMenusApi } from '@/api/core';
import { useAccessStore } from '@/store/access';

import { generateRoutesByBackend } from './generate-routes-backend';
import { generateMenus } from './generate-menus';

export async function initAuthRoutes(
  addRoutes: (parent: string | null, route: RouteObject[]) => void,
) {
  // 静态模式
  // 目前只支持动态模式
  // TODO: 后面考虑用Tanstack Query 来做接口缓存，避免重复请求菜单接口
  const data = await getAllMenusApi();

  // react router 的兜底ErrorBoundary 要添加
  const { routes: authRoutes } = generateRoutesByBackend(data);
  const menus = generateMenus(data);

  useAccessStore.setState({
    isAccessChecked: true,
    accessRoutes: [...authRoutes],
    accessMenus: [...menus],
  });

  addRoutes('basic-layout', authRoutes as RouteObject[]);
}

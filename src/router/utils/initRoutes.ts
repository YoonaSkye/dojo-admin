import { RouteObject } from 'react-router-dom';

import { getAllMenusApi } from '@/api/core';
import { useAccessStore } from '@/store/access';
import { useTabbarStore } from '@/store/tabs';
import { useUserStore } from '@/store/user';
import type { RouteRecordStringComponent } from '@/types';

import { frontendRoutes } from '../routes/modules';

import { generateMenus } from './generate-menus';
import { generateRoutesByBackend } from './generate-routes-backend';
import { generateRoutesByFrontend } from './generate-routes-frontend';

const ACCESS_MODE = import.meta.env.VITE_ACCESS_MODE || 'backend';

export async function initAuthRoutes(
  addRoutes: (parent: string | null, route: RouteObject[]) => void,
) {
  const userRoles = useUserStore.getState().userRoles;

  let result: ReturnType<typeof generateRoutesByBackend>;

  if (ACCESS_MODE === 'frontend') {
    // 前端静态路由模式：根据用户角色过滤路由后生成菜单
    result = generateRoutesByFrontend(
      frontendRoutes as RouteRecordStringComponent[],
      userRoles,
    );
  } else {
    // 后端动态路由模式
    const data = await getAllMenusApi();
    result = generateRoutesByBackend(data);
  }

  const authRoutes = result.routes;
  const menus = generateMenus(authRoutes);
  useTabbarStore.setState({ cachedTabs: new Set(result.cacheRoutes) });

  useAccessStore.setState({
    isAccessChecked: true,
    accessRoutes: [...authRoutes],
    accessMenus: [...menus],
  });

  addRoutes('basic-layout', authRoutes as RouteObject[]);
}

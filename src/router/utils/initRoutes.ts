import { RouteObject } from 'react-router-dom';

import { getAllMenusApi } from '@/api/core';
import { useAccessStore } from '@/store/access';
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

  let authRoutes: ReturnType<typeof generateRoutesByBackend>['routes'] = [];
  let menus: ReturnType<typeof generateMenus> = [];

  if (ACCESS_MODE === 'frontend') {
    // 前端静态路由模式：根据用户角色过滤路由后生成菜单
    const result = generateRoutesByFrontend(
      frontendRoutes as RouteRecordStringComponent[],
      userRoles,
    );
    authRoutes = result.routes;
    menus = generateMenus(authRoutes);
  } else {
    // 后端动态路由模式
    const data = await getAllMenusApi();
    const result = generateRoutesByBackend(data);
    authRoutes = result.routes;
    // 统一使用转换后的路由生成菜单
    menus = generateMenus(authRoutes);
  }

  useAccessStore.setState({
    isAccessChecked: true,
    accessRoutes: [...authRoutes],
    accessMenus: [...menus],
  });

  addRoutes('basic-layout', authRoutes as RouteObject[]);
}

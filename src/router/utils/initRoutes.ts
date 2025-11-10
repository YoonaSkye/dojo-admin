import { getAllMenusApi } from '@/api/core';
import { generateRoutesByBackend } from './generate-routes-backend';
import { RouteObject } from 'react-router-dom';
import { useAccessStore } from '@/store/access';
import { generateMenus } from './generate-menus';
import { $t as t } from '@/locales/i18n';

export async function initAuthRoutes(
  addRoutes: (parent: string | null, route: RouteObject[]) => void
) {
  // 静态模式
  // 动态模式
  const data = await getAllMenusApi();

  const authRoutes = generateRoutesByBackend(data);
  const menus = generateMenus(authRoutes, t);

  useAccessStore.setState({
    isAccessChecked: true,
    accessRoutes: [...authRoutes],
    accessMenus: [...menus],
  });

  addRoutes('basic', authRoutes as RouteObject[]);
}

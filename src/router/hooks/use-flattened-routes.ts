import { useCallback, useMemo } from 'react';
import { AppRouteObject } from '@/types';
import { ascend } from 'ramda';
import { usePermission } from './use-permission';

type SeachItemType = {
  title: string;
  key: string;
};

/**
 * return menu routes
 */
const menuFilter = (items: AppRouteObject[]) => {
  return items
    .filter((item) => {
      if (item.index) return false;

      const show = item.handle.title;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.handle.order || Infinity));
};

/**
 * return flattened routes
 */
function flattenMenuRoutes(routes: AppRouteObject[]) {
  return routes.reduce<SeachItemType[]>((prev, item) => {
    const { path, handle, children } = item;
    if (handle) prev.push({ title: handle.title, key: path! });
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
}

/**
 * 返回扁平化的菜单路由meta信息集合,用于command menu组件的全局模糊搜索
 *
 */
export function useFlattenedRoutes() {
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  const permissonRoutes = usePermission();

  return useMemo(() => {
    const menuRoutes = menuFilter(permissonRoutes);
    return flattenRoutes(menuRoutes);
  }, [flattenRoutes, permissonRoutes]);
}

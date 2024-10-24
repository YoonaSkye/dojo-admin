import { useCallback, useMemo } from 'react';
import { flattenMenuRoutes, menuFilter } from '../utils';
import { usePermission } from './use-permission';

/**
 * 返回扁平化的菜单路由meta信息集合
 */
export function useFlattenedRoutes() {
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  const permissonRoutes = usePermission();

  return useMemo(() => {
    const menuRoutes = menuFilter(permissonRoutes);
    return flattenRoutes(menuRoutes);
  }, [flattenRoutes, permissonRoutes]);
}

import { useCallback, useMemo } from 'react';
import { usePermissionRoutes } from './use-permission-routes';
import { flattenMenuRoutes, menuFilter } from '../utils';

/**
 * 返回扁平化的菜单路由
 */
export function useFlattenedRoutes() {
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  const permissonRoutes = usePermissionRoutes();

  return useMemo(() => {
    const menuRoutes = menuFilter(permissonRoutes);
    return flattenRoutes(menuRoutes);
  }, [flattenRoutes, permissonRoutes]);
}

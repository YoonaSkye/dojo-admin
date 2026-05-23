import { useAccessRoutes } from '@packages/stores';

export function usePermission() {
  const permissonRoutes = useAccessRoutes();
  return permissonRoutes;
}

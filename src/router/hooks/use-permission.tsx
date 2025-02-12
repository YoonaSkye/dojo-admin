import { useAccessRoutes } from '@/store/access';

export function usePermission() {
  const permissonRoutes = useAccessRoutes();
  return permissonRoutes;
}

import { useAccessMenus } from '@/store/access';

export function usePermission() {
  const permissions = useAccessMenus();

  return permissions;
}

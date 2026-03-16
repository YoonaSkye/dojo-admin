import { useMemo } from 'react';

import { useAccessStore } from '@/store/access';
import { usePreferencesStore } from '@/store/preferences';
import { useUserStore } from '@/store/user';

function useAccess() {
  const accessCodes = useAccessStore((store) => store.accessCodes);
  const userRoles = useUserStore((store) => store.userRoles);
  const accessMode = usePreferencesStore((store) => store.app.accessMode);

  /**
   * 基于角色判断是否有权限
   * @description: Determine whether there is permission，The role is judged by the user's role
   * @param roles
   */
  function hasAccessByRoles(roles: string[]) {
    if (!roles || roles.length === 0) return true;

    const userRoleSet = new Set(userRoles);
    const intersection = roles.filter((item) => userRoleSet.has(item));
    return intersection.length > 0;
  }

  /**
   * 基于权限码判断是否有权限
   * @description: Determine whether there is permission，The permission code is judged by the user's permission code
   * @param codes
   */
  function hasAccessByCodes(codes: string[]) {
    if (!codes || codes.length === 0) return true;

    const userCodesSet = new Set(accessCodes);
    const intersection = codes.filter((item) => userCodesSet.has(item));
    return intersection.length > 0;
  }

  const accessModeMemo = useMemo(() => accessMode, [accessMode]);

  return {
    accessMode: accessModeMemo,
    hasAccessByCodes,
    hasAccessByRoles,
  };
}

export { useAccess };

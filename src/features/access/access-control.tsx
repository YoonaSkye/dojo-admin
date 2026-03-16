import { type ReactNode, useMemo } from 'react';

import { useAccess } from './use-access';

interface AccessControlProps {
  /**
   * Specified codes is visible
   * @default []
   */
  codes?: string[];
  /**
   * 通过什么方式来控制组件，如果是 role，则传入角色，如果是 code，则传入权限码
   * @default 'role'
   */
  type?: 'code' | 'role';
  children?: ReactNode;
}

/**
 * Access control component for fine-grained access control.
 * TODO: 可以扩展更完善的功能：
 * 1. 支持多个权限码，只要有一个权限码满足即可 或者 多个权限码全部满足
 * 2. 支持多个角色，只要有一个角色满足即可 或者 多个角色全部满足
 * 3. 支持自定义权限码和角色的判断逻辑
 */
function AccessControl({
  codes = [],
  type = 'role',
  children,
}: AccessControlProps) {
  const { hasAccessByCodes, hasAccessByRoles } = useAccess();

  const hasAuth = useMemo(() => {
    if (!codes || codes.length === 0) return true;
    return type === 'role' ? hasAccessByRoles(codes) : hasAccessByCodes(codes);
  }, [codes, type, hasAccessByCodes, hasAccessByRoles]);

  if (!codes || codes.length === 0) {
    return <>{children}</>;
  }

  if (hasAuth) {
    return <>{children}</>;
  }

  return null;
}

export { AccessControl };

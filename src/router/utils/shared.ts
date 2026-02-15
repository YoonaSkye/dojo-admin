import { useAccessStore } from '@/store/access';

/**
 * 检查用户是否已认证（已登录）
 */
function checkIsAuthenticated(): boolean {
  return Boolean(useAccessStore.getState().accessToken);
}

/**
 * 检查用户是否已认证（已登录）
 */
function checkIsAccessChecked(): boolean {
  return Boolean(useAccessStore.getState().isAccessChecked);
}

/**
 * 检查路由是否是登录页
 */
function checkIsLoginRoute(fullPath: string): boolean {
  return fullPath.includes('/auth/login');
}

export { checkIsAccessChecked, checkIsAuthenticated, checkIsLoginRoute };

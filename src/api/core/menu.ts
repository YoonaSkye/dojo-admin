import requestClient from '../request';
import type { RouteMeta } from '@/types';

export interface Permission {
  path: string;
  redirect?: string;
  component?: string;
  handle?: RouteMeta;
  children?: Permission[];
}

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<Permission[]>('/menu/all', {
    withCredentials: true,
  });
}

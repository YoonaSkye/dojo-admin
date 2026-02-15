import requestClient from '../request';
import type { RouteRecordStringComponent } from '@/types';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>('/menu/all', {
    withCredentials: true,
  });
}

import { Permission } from '#/entity';
import requestClient from '../request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<Permission[]>('/menu/all', {
    withCredentials: true,
  });
}

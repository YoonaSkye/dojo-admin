import requestClient from '../request';

import { UserInfo } from '@/types';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}

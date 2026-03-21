import { requestClient } from '../request';

/**
 * 发起请求
 */
async function getBigIntData() {
  return requestClient.get('/demo/bigint');
}

export { getBigIntData };

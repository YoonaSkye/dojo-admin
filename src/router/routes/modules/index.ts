import { dashboardRoutes } from './dashboard';
import { demosRoutes } from './demos';
import { manageRoutes } from './manage';

/**
 * 前端静态路由配置
 * 所有路由配置在此定义，权限通过 authority 控制
 */
const frontendRoutes = [
  ...dashboardRoutes,
  ...demosRoutes,
  ...manageRoutes,
];

export { dashboardRoutes, demosRoutes, frontendRoutes, manageRoutes };
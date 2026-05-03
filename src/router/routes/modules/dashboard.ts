/**
 * dashboard 路由模块
 * authority: 需要 admin 或 super 角色才能访问
 */
const dashboardRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/analytics',
    handle: {
      title: 'page.dashboard.title',
      icon: 'lucide:layout-dashboard',
      order: -1,
      hideInTab: true,
      authority: ['admin', 'super'],
    },
    children: [
      {
        name: 'Analytics',
        path: '/dashboard/analytics',
        component: '/dashboard/analytics/index.tsx',
        handle: {
          title: 'page.dashboard.analytics',
          affixTab: true,
          icon: 'lucide:area-chart',
          hideInTab: false,
          keepAlive: true,
          authority: ['admin', 'super'],
        },
      },
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        component: '/dashboard/workspace/index.tsx',
        handle: {
          title: 'page.dashboard.workspace',
          icon: 'carbon:workspace',
          hideInTab: false,
          authority: ['admin', 'super'],
        },
      },
    ],
  },
];

export { dashboardRoutes };
/**
 * manage 路由模块
 * authority: 需要 admin 角色才能访问
 */
const manageRoutes = [
  {
    name: 'Manage',
    path: '/manage',
    redirect: '/manage/user',
    handle: {
      title: 'page.manage.title',
      icon: 'ion:settings-outline',
      order: -1,
      hideInTab: true,
      authority: ['admin'],
    },
    children: [
      {
        name: 'User',
        path: '/manage/user',
        component: '/manage/user/index.tsx',
        handle: {
          title: 'page.manage.user',
          icon: 'lucide:user-cog',
          hideInTab: false,
          keepAlive: true,
          authority: ['admin'],
        },
      },
      {
        name: 'Role',
        path: '/manage/role',
        component: '/manage/role/index.tsx',
        handle: {
          title: 'page.manage.role',
          icon: 'mdi:account-group',
          hideInTab: false,
          authority: ['admin'],
        },
      },
      {
        name: 'Menu',
        path: '/manage/menu',
        component: '/manage/menu/index.tsx',
        handle: {
          title: 'page.manage.menu',
          icon: 'mdi:menu',
          hideInTab: false,
          authority: ['admin'],
        },
      },
    ],
  },
];

export { manageRoutes };
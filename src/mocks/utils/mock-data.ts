export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  roles: string[];
  username: string;
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: '123456',
    realName: 'Dojo',
    roles: ['super'],
    username: 'dojo',
  },
  {
    id: 1,
    password: '123456',
    realName: 'Admin',
    roles: ['admin'],
    username: 'admin',
  },
  {
    id: 2,
    password: '123456',
    realName: 'Jack',
    roles: ['user'],
    username: 'jack',
  },
];

export enum PermissionType {
  CATALOGUE,
  MENU,
  BUTTON,
}
export enum BasicStatus {
  DISABLE,
  ENABLE,
}

export const MOCK_CODES = [
  // super
  {
    codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
    username: 'dojo',
  },
  {
    // admin
    codes: ['AC_100010', 'AC_100020', 'AC_100030'],
    username: 'admin',
  },
  {
    // user
    codes: ['AC_1000001', 'AC_1000002'],
    username: 'jack',
  },
];

const dashboardMenus = [
  {
    path: 'dashboard',
    redirect: '/dashboard/analytics',
    handle: {
      name: 'Dashboard',
      title: 'page.dashboard.title',
      icon: 'lucide:layout-dashboard',
      order: -1,
      hideTab: true,
    },
    children: [
      {
        path: 'analytics',
        component: '/dashboard/analytics/index.tsx',
        handle: {
          name: 'Analytics',
          title: 'page.dashboard.analytics',
          affixTab: true,
          icon: 'lucide:area-chart',
          hideTab: false,
        },
      },
      {
        path: 'workspace',
        component: '/dashboard/workspace/index.tsx',
        handle: {
          name: 'Workspace',
          title: 'page.dashboard.workspace',
          icon: 'carbon:workspace',
          hideTab: false,
        },
      },
    ],
  },
];

const manageMenus = [
  {
    path: 'manage',
    redirect: '/manage/user',
    handle: {
      name: 'Manage',
      title: 'page.manage.title',
      icon: 'lucide:layout-dashboard',
      order: -1,
      hideTab: true,
    },
    children: [
      {
        path: 'user',
        component: '/manage/user/index.tsx',
        handle: {
          name: 'User',
          title: 'page.manage.user',
          affixTab: true,
          icon: 'lucide:user-cog',
          hideTab: false,
        },
      },
      {
        path: 'role',
        component: '/manage/role/index.tsx',
        handle: {
          name: 'Role',
          title: 'page.manage.role',
          icon: 'carbon:user-role',
          hideTab: false,
        },
      },
      {
        path: 'menu',
        component: '/manage/menu/index.tsx',
        handle: {
          name: 'Menu',
          title: 'page.manage.menu',
          icon: 'lucide:align-left',
          hideTab: false,
        },
      },
    ],
  },
];

const fallbackMenus = [
  {
    path: 'fallback',
    redirect: '/fallback/403',
    handle: {
      name: 'FallbackDemos',
      title: 'page.demos.fallback.title',
      icon: 'mdi:lightbulb-error-outline',
      hideTab: true,
    },
    children: [
      {
        path: '403',
        component: '/_core/fallback/forbidden/index.tsx',
        handle: {
          name: 'Fallback403Demo',
          title: '403',
          icon: 'ic:baseline-block',
        },
      },
      {
        path: '404',
        component: '/_core/fallback/not-found/index.tsx',
        handle: {
          name: 'Fallback404Demo',
          title: '404',
          icon: 'ic:baseline-web-asset-off',
        },
      },
      {
        path: '500',
        component: '/_core/fallback/internal-error/index.tsx',
        handle: {
          name: 'Fallback500Demo',
          title: '500',
          icon: 'ic:baseline-wifi-off',
        },
      },
    ],
  },
];
//@ts-ignore
const createDemosMenus = (role: 'admin' | 'super' | 'user') => {
  //@ts-ignore
  const roleWithMenus = {
    admin: {
      path: '/demos/access/admin-visible',
      component: '/demos/access/admin-visible',
      handle: {
        name: 'AccessAdminVisibleDemo',
        title: 'demos.access.adminVisible',
        icon: 'mdi:button-cursor',
      },
    },
    super: {
      path: '/demos/access/super-visible',
      component: '/demos/access/super-visible',
      handle: {
        name: 'AccessSuperVisibleDemo',
        title: 'demos.access.superVisible',
        icon: 'mdi:button-cursor',
      },
    },
    user: {
      path: '/demos/access/user-visible',
      component: '/demos/access/user-visible',
      handle: {
        name: 'AccessUserVisibleDemo',
        title: 'demos.access.userVisible',
        icon: 'mdi:button-cursor',
      },
    },
  };

  return [
    {
      path: 'demos',
      redirect: '/demos/access',
      handle: {
        name: 'Demos',
        title: 'page.demos.title',
        icon: 'ic:baseline-view-in-ar',
        keepAlive: true,
        order: 1000,
        hideTab: true,
      },
      children: [
        // 权限控制
        {
          path: 'access',
          redirect: '/demos/access/page-control',
          handle: {
            name: 'AccessDemos',
            title: 'page.demos.access.frontendPermissions',
            icon: 'mdi:shield-key-outline',
            hideTab: true,
          },
          children: [
            {
              path: 'page-control',
              component: '/demos/access/page-control/index.tsx',
              handle: {
                name: 'AccessPageControlDemo',
                title: 'page.demos.access.pageAccess',
                icon: 'mdi:page-previous-outline',
                hideTab: false,
              },
            },
            {
              path: 'button-control',
              component: '/demos/access/button-control/index.tsx',
              handle: {
                name: 'AccessButtonControlDemo',
                title: 'page.demos.access.buttonControl',
                icon: 'mdi:button-cursor',
                hideTab: false,
              },
            },
          ],
        },
      ],
    },
  ];
};

export const MOCK_MENUS = [
  {
    menus: [
      ...dashboardMenus,
      ...createDemosMenus('super'),
      ...manageMenus,
      ...fallbackMenus,
    ],
    username: 'dojo',
  },
  {
    menus: [
      ...dashboardMenus,
      ...createDemosMenus('admin'),
      ...manageMenus,
      ...fallbackMenus,
    ],
    username: 'admin',
  },
  {
    menus: [
      ...dashboardMenus,
      ...createDemosMenus('user'),
      manageMenus,
      ...fallbackMenus,
    ],
    username: 'jack',
  },
];

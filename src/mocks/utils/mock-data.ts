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
    realName: 'Vben',
    roles: ['super'],
    username: 'vben',
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

export const MOCK_CODES = [
  // super
  {
    codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
    username: 'vben',
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
    component: 'BasicLayout',
    handle: {
      name: 'Dashboard',
      icon: 'lucide:layout-dashboard',
      order: -1,
      // title: 'page.dashboard.title',
      title: 'sys.menu.dashboard',
    },
    path: '/dashboard',
    redirect: '/analytics',
    children: [
      {
        path: '/dashboard/analytics',
        // component: '/dashboard/analytics/index',
        component: '/dashboard/analysis/index.tsx',
        handle: {
          name: 'Analytics',
          affixTab: true,
          icon: 'lucide:area-chart',
          // title: 'page.dashboard.analytics',
          title: 'sys.menu.analysis',
        },
      },
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        // component: '/dashboard/workspace/index',
        component: '/dashboard/workbench/index.tsx',
        handle: {
          name: 'Workspace',
          icon: 'carbon:workspace',
          // title: 'page.dashboard.workspace',
          title: 'sys.menu.workbench',
        },
      },
    ],
  },
];

const createDemosMenus = (role: 'admin' | 'super' | 'user') => {
  const roleWithMenus = {
    admin: {
      component: '/demos/access/admin-visible',
      handle: {
        icon: 'mdi:button-cursor',
        title: 'page.demos.access.adminVisible',
      },
      name: 'AccessAdminVisibleDemo',
      path: '/demos/access/admin-visible',
    },
    super: {
      component: '/demos/access/super-visible',
      handle: {
        icon: 'mdi:button-cursor',
        title: 'page.demos.access.superVisible',
      },
      name: 'AccessSuperVisibleDemo',
      path: '/demos/access/super-visible',
    },
    user: {
      component: '/demos/access/user-visible',
      handle: {
        icon: 'mdi:button-cursor',
        title: 'page.demos.access.userVisible',
      },
      name: 'AccessUserVisibleDemo',
      path: '/demos/access/user-visible',
    },
  };

  return [
    {
      component: 'BasicLayout',
      handle: {
        icon: 'ic:baseline-view-in-ar',
        keepAlive: true,
        order: 1000,
        title: 'page.demos.title',
      },
      name: 'Demos',
      path: '/demos',
      redirect: '/demos/access',
      children: [
        {
          name: 'AccessDemos',
          path: '/demosaccess',
          handle: {
            icon: 'mdi:cloud-key-outline',
            title: 'page.demos.access.backendPermissions',
          },
          redirect: '/demos/access/page-control',
          children: [
            {
              name: 'AccessPageControlDemo',
              path: '/demos/access/page-control',
              component: '/demos/access/index',
              handle: {
                icon: 'mdi:page-previous-outline',
                title: 'page.demos.access.pageAccess',
              },
            },
            {
              name: 'AccessButtonControlDemo',
              path: '/demos/access/button-control',
              component: '/demos/access/button-control',
              handle: {
                icon: 'mdi:button-cursor',
                title: 'page.demos.access.buttonControl',
              },
            },
            {
              name: 'AccessMenuVisible403Demo',
              path: '/demos/access/menu-visible-403',
              component: '/demos/access/menu-visible-403',
              handle: {
                authority: ['no-body'],
                icon: 'mdi:button-cursor',
                menuVisibleWithForbidden: true,
                title: 'page.demos.access.menuVisible403',
              },
            },
            roleWithMenus[role],
          ],
        },
      ],
    },
  ];
};

export const MOCK_MENUS = [
  {
    // menus: [...dashboardMenus, ...createDemosMenus('super')],
    menus: [...dashboardMenus],
    username: 'vben',
  },
  {
    // menus: [...dashboardMenus, ...createDemosMenus('admin')],
    menus: [...dashboardMenus],
    username: 'admin',
  },
  {
    // menus: [...dashboardMenus, ...createDemosMenus('user')],
    menus: [...dashboardMenus],
    username: 'jack',
  },
];

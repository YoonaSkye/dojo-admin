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
    name: 'Dashboard',
    component: 'BasicLayout',
    handle: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'page.dashboard.title',
      hideTab: true,
    },
    path: '/dashboard',
    redirect: '/dashboard/analytics',
    children: [
      {
        name: 'Analytics',
        path: '/dashboard/analytics',
        component: '/dashboard/analysis/index.tsx',
        handle: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: 'page.dashboard.analytics',
          hideTab: false,
        },
      },
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        component: '/dashboard/workbench/index.tsx',
        handle: {
          icon: 'carbon:workspace',
          title: 'page.dashboard.workspace',
          hideTab: false,
        },
      },
    ],
  },
];

const demosMenus = [
  {
    component: 'BasicLayout',
    handle: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: 'page.demos.title',
      hideTab: true,
    },
    name: 'Demos',
    path: '/demos',
    redirect: '/demos/access',
    children: [
      // 权限控制
      {
        handle: {
          icon: 'mdi:shield-key-outline',
          title: 'page.demos.access.frontendPermissions',
          hideTab: true,
        },
        name: 'AccessDemos',
        path: '/demos/access',
        redirect: '/demos/access/page-control',
        children: [
          {
            name: 'AccessPageControlDemo',
            path: '/demos/access/page-control',
            component: '/demos/access/index.tsx',
            handle: {
              icon: 'mdi:page-previous-outline',
              title: 'page.demos.access.pageAccess',
              hideTab: false,
            },
          },
          {
            name: 'AccessButtonControlDemo',
            path: '/demos/access/button-control',
            component: '/demos/access/button-control.tsx',
            handle: {
              icon: 'mdi:button-cursor',
              title: 'page.demos.access.buttonControl',
              hideTab: false,
            },
          },
          // {
          //   name: 'AccessMenuVisible403Demo',
          //   path: '/demos/access/menu-visible-403',
          //   component: '/demos/access/menu-visible-403.tsx',
          //   handle: {
          //     authority: ['no-body'],
          //     icon: 'mdi:button-cursor',
          //     menuVisibleWithForbidden: true,
          //     title: 'page.demos.access.menuVisible403',
          //   },
          // },
          // {
          //   name: 'AccessSuperVisibleDemo',
          //   path: '/demos/access/super-visible',
          //   component: '#/views/demos/access/super-visible.tsx',
          //   handle: {
          //     authority: ['super'],
          //     icon: 'mdi:button-cursor',
          //     title: 'page.demos.access.superVisible',
          //   },
          // },
          // {
          //   name: 'AccessAdminVisibleDemo',
          //   path: '/demos/access/admin-visible',
          //   component: '/demos/access/admin-visible.tsx',
          //   handle: {
          //     authority: ['admin'],
          //     icon: 'mdi:button-cursor',
          //     title: 'page.demos.access.adminVisible',
          //   },
          // },
          // {
          //   name: 'AccessUserVisibleDemo',
          //   path: '/demos/access/user-visible',
          //   component: '/demos/access/user-visible.tsx',
          //   handle: {
          //     authority: ['user'],
          //     icon: 'mdi:button-cursor',
          //     title: 'page.demos.access.userVisible',
          //   },
          // },
        ],
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
    menus: [...dashboardMenus, ...demosMenus],
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

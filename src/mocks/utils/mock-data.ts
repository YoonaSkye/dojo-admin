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

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = [
  {
    id: '9100714781927703',
    parentId: '',
    label: 'page.dashboard.title',
    name: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    type: PermissionType.CATALOGUE,
    route: 'dashboard',
    order: 1,
    children: [
      {
        id: '9710971640510357',
        parentId: '9100714781927703',
        label: 'page.dashboard.analytics',
        name: 'Analysis',
        icon: 'lucide:area-chart',
        type: PermissionType.MENU,
        route: 'analytics',
        component: '/dashboard/analysis/index.tsx',
      },
      {
        id: '8426999229400979',
        parentId: '9100714781927703',
        label: 'page.dashboard.workspace',
        name: 'Workbench',
        icon: 'carbon:workspace',
        type: PermissionType.MENU,
        route: 'workbench',
        component: '/dashboard/workbench/index.tsx',
      },
    ],
  },
];

const MANAGEMENT_PERMISSION = [
  {
    id: '0249937641030250',
    parentId: '0901673425580518',
    label: 'sys.menu.system.index',
    name: 'System',
    type: PermissionType.CATALOGUE,
    route: 'system',
    children: [
      {
        id: '4359580910369984',
        parentId: '0249937641030250',
        label: 'sys.menu.system.permission',
        name: 'Permission',
        type: PermissionType.MENU,
        route: 'permission',
        component: '/management/permission/index.tsx',
      },
      {
        id: '1689241785490759',
        parentId: '0249937641030250',
        label: 'sys.menu.system.role',
        name: 'Role',
        type: PermissionType.MENU,
        route: 'role',
        component: '/management/role/index.tsx',
      },
      {
        id: '0157880245365433',
        parentId: '0249937641030250',
        label: 'sys.menu.system.user',
        name: 'User',
        type: PermissionType.MENU,
        route: 'user',
        component: '/management/user/index.tsx',
      },
    ],
  },
];

export const MOCK_MENUS = [
  {
    menus: [...DASHBOARD_PERMISSION],
    username: 'vben',
  },
  {
    menus: [...dashboardMenus],
    username: 'admin',
  },
  {
    menus: [...dashboardMenus],
    username: 'jack',
  },
];

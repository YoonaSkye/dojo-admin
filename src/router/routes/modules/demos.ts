/**
 * demos 路由模块
 * authority: 部分页面需要特定角色才能访问
 */
const demosRoutes = [
  {
    name: 'Demos',
    path: '/demos',
    redirect: '/demos/access',
    handle: {
      title: 'demos.title',
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      hideInTab: true,
    },
    children: [
      {
        name: 'AccessDemos',
        path: '/demos/access',
        redirect: '/demos/access/page-control',
        handle: {
          title: 'demos.access.frontendPermissions',
          icon: 'mdi:shield-key-outline',
          hideInTab: true,
        },
        children: [
          {
            name: 'AccessPageControlDemo',
            path: '/demos/access/page-control',
            component: '/demos/access/page-control/index.tsx',
            handle: {
              title: 'demos.access.pageAccess',
              icon: 'mdi:page-previous-outline',
              hideInTab: false,
              authority: ['admin', 'super', 'user'],
            },
          },
          {
            name: 'AccessButtonControlDemo',
            path: '/demos/access/button-control',
            component: '/demos/access/button-control/index.tsx',
            handle: {
              title: 'demos.access.buttonControl',
              icon: 'mdi:button-cursor',
              hideInTab: false,
              authority: ['admin', 'super'],
            },
          },
          {
            name: 'AccessMenuVisible403Demo',
            path: '/demos/access/menu-visible-403',
            component: '/demos/access/menu-visible-403/index.tsx',
            handle: {
              title: 'demos.access.menuVisible403',
              icon: 'mdi:button-cursor',
              hideInTab: false,
              authority: ['no-body'],
              menuVisibleWithForbidden: true,
            },
          },
          {
            name: 'AccessSuperVisibleDemo',
            path: '/demos/access/super-visible',
            component: '/demos/access/super-visible/index.tsx',
            handle: {
              title: 'demos.access.superVisible',
              icon: 'mdi:button-cursor',
              hideInTab: false,
              authority: ['super'],
            },
          },
          {
            name: 'AccessAdminVisibleDemo',
            path: '/demos/access/admin-visible',
            component: '/demos/access/admin-visible/index.tsx',
            handle: {
              title: 'demos.access.adminVisible',
              icon: 'mdi:button-cursor',
              hideInTab: false,
              authority: ['admin'],
            },
          },
          {
            name: 'AccessUserVisibleDemo',
            path: '/demos/access/user-visible',
            component: '/demos/access/user-visible/index.tsx',
            handle: {
              title: 'demos.access.userVisible',
              icon: 'mdi:button-cursor',
              hideInTab: false,
              authority: ['user'],
            },
          },
        ],
      },
      {
        name: 'FeaturesDemos',
        path: '/demos/features',
        redirect: '/demos/features/icons',
        handle: {
          icon: 'mdi:feature-highlight',
          title: 'demos.features.title',
          hideInTab: true,
        },
        children: [
          {
            name: 'IconsDemo',
            path: '/demos/features/icons',
            component: '/demos/features/icons/index.tsx',
            handle: {
              title: 'demos.features.icons',
              icon: 'lucide:annoyed',
              hideInTab: false,
              authority: ['admin', 'super', 'user'],
            },
          },
          {
            name: 'FileDownloadDemo',
            path: '/demos/features/file-download',
            component: '/demos/features/file-download/index.tsx',
            handle: {
              title: 'demos.features.fileDownload',
              icon: 'lucide:hard-drive-download',
              hideInTab: false,
              authority: ['admin', 'super', 'user'],
            },
          },
          {
            name: 'RequestParamsSerializerDemo',
            path: '/demos/features/request-params-serializer',
            component: '/demos/features/request-params-serializer/index.tsx',
            handle: {
              title: 'demos.features.requestParamsSerializer',
              icon: 'lucide:git-pull-request-arrow',
              hideInTab: false,
              authority: ['admin', 'super', 'user'],
            },
          },
          {
            name: 'BigIntDemo',
            path: '/demos/features/json-bigint',
            component: '/demos/features/json-bigint/index.tsx',
            handle: {
              title: 'JSON BigInt',
              icon: 'lucide:grape',
              hideInTab: false,
              authority: ['admin', 'super'],
            },
          },
        ],
      },
    ],
  },
  // 缺省页面
  {
    name: 'FallbackDemos',
    path: '/fallback',
    redirect: '/fallback/403',
    handle: {
      title: 'demos.fallback.title',
      icon: 'mdi:lightbulb-error-outline',
      hideInTab: true,
      order: 2000,
    },
    children: [
      {
        name: 'Fallback403Demo',
        path: '/fallback/403',
        component: '/_core/fallback/forbidden/index.tsx',
        handle: {
          title: '403',
          icon: 'ic:baseline-block',
        },
      },
      {
        name: 'Fallback404Demo',
        path: '/fallback/404',
        component: '/_core/fallback/not-found/index.tsx',
        handle: {
          title: '404',
          icon: 'ic:baseline-web-asset-off',
        },
      },
      {
        name: 'Fallback500Demo',
        path: '/fallback/500',
        component: '/_core/fallback/internal-error/index.tsx',
        handle: {
          title: '500',
          icon: 'ic:baseline-wifi-off',
        },
      },
    ],
  },
  // 项目页面
  {
    name: 'VbenProject',
    path: '/vben-admin',
    redirect: '/vben-admin/github',
    handle: {
      icon: 'lucide:book-open-text',
      order: 9998,
      title: 'demos.vben.title',
    },
    children: [
      {
        name: 'VbenGithub',
        path: '/vben-admin/github',
        component: '/_core/iframe-page/index.tsx',
        handle: {
          icon: 'mdi:github',
          link: 'https://github.com/YoonaSkye/dojo-admin',
          title: 'Github',
        },
      },
      {
        name: 'VbenAntd',
        path: '/vben-admin/antd',
        component: '/_core/iframe-page/index.tsx',
        handle: {
          icon: 'logos:ant-design',
          iframeSrc: 'https://ant.design/index-cn',
          title: 'demos.vben.antd',
        },
      },
      {
        name: 'TailwindcssDemo',
        path: '/vben-admin/tailwindcss',
        component: '/_core/iframe-page/index.tsx',
        handle: {
          icon: 'devicon:tailwindcss',
          iframeSrc: 'https://tailwindcss.com',
          title: 'Tailwindcss',
        },
      },
    ],
  },
];

export { demosRoutes };

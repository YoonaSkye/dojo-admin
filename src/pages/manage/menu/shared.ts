export type MenuOption = {
  label: string;
  value: number;
};

export const layoutOptions = [
  {
    label: 'base',
    value: 'base',
  },
  {
    label: 'blank',
    value: 'blank',
  },
];

export function createDefaultModel() {
  return {
    activeMenu: null,
    buttons: [],
    component: '',
    constant: false,
    fixedIndexInTab: null,
    hideInMenu: false,
    href: null,
    i18nKey: null,
    icon: '',
    iconType: '1',
    keepAlive: false,
    layout: 'base',
    menuName: '',
    menuType: '1',
    multiTab: false,
    order: 0,
    page: '',
    parentId: 0,
    pathParam: '',
    query: [],
    routeName: '',
    routePath: '',
    status: '1',
  };
}

export function getPageOptions(routeName: string, allPages: string[]) {
  if (routeName && !allPages.includes(routeName)) {
    allPages.unshift(routeName);
  }

  const opts = allPages.map((page) => ({
    label: page,
    value: page,
  }));

  return opts;
}

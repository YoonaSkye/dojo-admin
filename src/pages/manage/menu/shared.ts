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

export function flattenMenu(menuList: Api.SystemManage.Menu[]) {
  const result: MenuOption[] = [];

  function flatten(item: Api.SystemManage.Menu) {
    // const label = item.i18nKey ? t(item.i18nKey) : item.menuName;
    const label = item.menuName;

    result.push({ label, value: item.id }); // 将当前元素加入结果数组，并移除 children 属性

    if (item.children && Array.isArray(item.children))
      item.children.forEach(flatten); // 递归处理 children
  }

  menuList.forEach(flatten); // 对初始数组中的每一个元素进行展开

  return result;
}

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

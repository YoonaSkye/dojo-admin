import { filterTree, mapTree } from '@/utils';
import { AppRouteObject } from '@/types';
import { Iconify } from '@/components/icon';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const renderLabel = (label: string, t: (key: string) => string) => {
  return (
    <div className="inline-flex w-full items-center justify-between">
      <div>{t(label)}</div>
    </div>
  );
};

/**
 * 根据 routes 生成菜单列表
 * @param routes
 */
function generateMenus(
  routes: AppRouteObject[],
  t: (key: string) => string
): MenuItem[] {
  const menus = filterTree(routes, (route) => {
    if (!route.path) return false;
    return !route?.handle?.hideInMenu;
  });
  const sortedMenus = menus.sort(
    (a, b) => (a.handle.order || 999) - (b.handle.order || 999)
  );
  const finalMenus = mapTree(sortedMenus, (route) => {
    // 转换为菜单结构
    const { path, handle, children } = route;
    const { hideChildrenInMenu = false, icon, title = '' } = handle || {};

    // 隐藏子菜单
    const resultChildren = hideChildrenInMenu ? [] : (children as MenuItem[]);

    // 隐藏子菜单
    // const resultPath = hideChildrenInMenu ? redirect || path : link || path;

    return {
      key: path,
      label: renderLabel(title, t),
      ...(icon && {
        icon: <Iconify icon={icon} width="1em" height="1em" />,
      }),
      ...(resultChildren && { children: resultChildren }),
    };
  });

  return finalMenus;
}

export { generateMenus };

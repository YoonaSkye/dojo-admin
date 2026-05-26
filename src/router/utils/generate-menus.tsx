import { filterTree, mapTree } from '@packages/@core/base/shared/utils';

import { Iconify } from '@/components/icon';
import { useLocale } from '@/features/lang';
import type { AppRouteObject, RouteRecordStringComponent } from '@/types';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

/**
 * 菜单标签组件，支持动态翻译响应语言变化
 * 注意：必须使用 useLocale 提供的 $t 函数（来自 react-i18next），而非 $t 静态代理。
 * 静态 $t 不订阅语言变化，不会触发重渲染。
 */
// eslint-disable-next-line react-refresh/only-export-components
const MenuLabel = ({ label }: { label: string }) => {
  const { $t } = useLocale();
  return <>{$t(label)}</>;
};

/**
 * 根据 routes 生成菜单列表
 * @param routes
 */
function generateMenus(
  routes: (RouteRecordStringComponent | AppRouteObject)[],
): MenuItem[] {
  const menus = filterTree(routes, (route) => {
    if (!route.path) return false;
    return !route?.handle?.hideInMenu;
  });
  const sortedMenus = menus.sort(
    (a, b) => (a.handle?.order || 999) - (b.handle?.order || 999),
  );

  const finalMenus = mapTree(sortedMenus, (route) => {
    // 转换为菜单结构
    const { path, handle, children } = route;
    const { hideChildrenInMenu = false, icon, title = '' } = handle || {};

    // 隐藏子菜单
    const resultChildren = hideChildrenInMenu ? [] : children;

    return {
      key: path,
      label: <MenuLabel label={title} />,
      ...(icon && {
        icon: <Iconify icon={icon} width="1em" height="1em" />,
      }),
      ...(resultChildren && { children: resultChildren }),
    };
  });

  return finalMenus as MenuItem[];
}

export { generateMenus };

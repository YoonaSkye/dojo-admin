import { filterTree, mapTree } from '@/utils';
import { AppRouteObject, ExRouteRecordRaw, MenuRecordRaw } from '@/types';
import { Iconify } from '@/components/icon';
import { useTranslation } from 'react-i18next';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

/**
 * 菜单标签组件，支持动态翻译响应语言变化
 */
const MenuLabel = ({ label }: { label: string }) => {
  const { t } = useTranslation();
  return (
    // <div className="inline-flex w-full items-center justify-between">
    //   <div>{t(label)}</div>
    // </div>
    <>{t(label)}</>
  );
};

/**
 * 根据 routes 生成菜单列表
 * @param routes
 */
function generateMenus(routes: AppRouteObject[]): MenuItem[] {
  const menus = filterTree(routes, (route) => {
    // BUG：这里会修改原始路由数据，导致后续路由匹配失败，尤其是index路由
    if (!route.path) return false;
    return !route?.handle?.hideInMenu;
  });
  const sortedMenus = menus.sort(
    (a, b) => (a.handle.order || 999) - (b.handle.order || 999)
  );

  const finalMenus = mapTree<ExRouteRecordRaw, MenuRecordRaw>(
    sortedMenus,
    (route) => {
      // 转换为菜单结构
      const { path, handle, children } = route;
      const { hideChildrenInMenu = false, icon, title = '' } = handle || {};

      // 隐藏子菜单
      const resultChildren = hideChildrenInMenu
        ? []
        : (children as MenuRecordRaw[]);

      // 设置子菜单的父子关系
      if (resultChildren && resultChildren.length > 0) {
        resultChildren.forEach((child) => {
          child.parents = [...(route.parents ?? []), path];
          child.parent = path;
        });
      }

      // 最终菜单路径
      let resultPath = null;
      if (route.parents && route.parents.length > 0) {
        resultPath = `/${route.parents.join('/')}/${path}`;
      } else {
        resultPath = '/' + path;
      }

      return {
        key: resultPath,
        label: <MenuLabel label={title} />,
        ...(icon && {
          icon: <Iconify icon={icon} width="1em" height="1em" />,
        }),
        ...(resultChildren && { children: resultChildren }),
      };
    }
  );

  return finalMenus as unknown as MenuItem[];
}

export { generateMenus };

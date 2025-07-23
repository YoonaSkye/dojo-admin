import { Iconify } from '@/components/icon';
import { useAccessRoutes } from '@/store/access';
import { ExRouteRecordRaw, MenuRecordRaw } from '@/types';
import { filterTree, mapTree } from '@/utils';
import { useTranslation } from 'react-i18next';

const renderLabel = (label: string, t: (key: string) => string) => {
  return (
    <div className="inline-flex w-full items-center justify-between">
      <div>{t(label)}</div>
    </div>
  );
};

/**
 * 将路由routes信息转换成菜单menus信息
 */
export function useRouteToMenu() {
  const { t } = useTranslation();
  const authRoutes = useAccessRoutes();

  const menus = filterTree(authRoutes, (route) => {
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
        label: renderLabel(title, t),
        ...(icon && {
          icon: <Iconify icon={icon} width="1em" height="1em" />,
        }),
        ...(resultChildren && { children: resultChildren }),
      };
    }
  );

  return finalMenus;
}

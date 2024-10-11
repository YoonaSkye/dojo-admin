import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { Iconify } from '@/components/icon';

import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { RouteObject } from 'react-router-dom';

/**
 * 将路由routes信息转换成菜单menus信息
 */
export function useRouteToMenu() {
  const { t } = useTranslation();
  // const routeToMenuFn = useCallback(
  //   (items: AppRouteObject[]) => {
  //     return items
  //       .filter((item) => !item.meta?.hideMenu)
  //       .map((item) => {
  //         const menuItem: any = [];
  //         const { meta, children } = item;
  //         if (meta) {
  //           const { key, label, icon, disabled, suffix } = meta;
  //           menuItem.key = key;
  //           menuItem.disabled = disabled;
  //           menuItem.label = (
  //             <div className="inline-flex w-full items-center justify-between">
  //               <div>{t(label)}</div>
  //               {suffix}
  //             </div>
  //           );

  //           if (icon) {
  //             if (typeof icon === 'string') {
  //               if (icon.startsWith('ic')) {
  //                 menuItem.icon = (
  //                   <SvgIcon
  //                     icon={icon}
  //                     size={24}
  //                     className="ant-menu-item-icon"
  //                   />
  //                 );
  //               } else {
  //                 menuItem.icon = (
  //                   <Iconify
  //                     icon={icon}
  //                     size={24}
  //                     className="ant-menu-item-icon"
  //                   />
  //                 );
  //               }
  //             } else {
  //               menuItem.icon = icon;
  //             }
  //           }
  //         }
  //         if (children) {
  //           menuItem.children = routeToMenuFn(children);
  //         }

  //         return menuItem as ItemType;
  //       });
  //   },
  //   [t]
  // );
  const routeToMenuFn = useCallback(
    (items: RouteObject[]) => {
      return items.map((item) => {
        const menuItem: any = [];
        const { handle, children, path } = item;
        if (handle) {
          const { icon, title, name } = handle;
          menuItem.key = path;
          menuItem.label = (
            <div className="inline-flex w-full items-center justify-between">
              <div>{t(title)}</div>
            </div>
          );

          if (icon) {
            <Iconify icon={icon} />;
          }
        }
        if (children) {
          menuItem.children = routeToMenuFn(children);
        }

        return menuItem as ItemType;
      });
    },
    [t]
  );

  return routeToMenuFn;
}

import { Iconify } from '@/components/icon';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AppRouteObject } from '#/router';
import type { GetProp, MenuProps } from 'antd';

type MenuItem = GetProp<MenuProps, 'items'>[number];

const renderLabel = (
  label: string,
  suffix: React.ReactNode,
  t: (key: string) => string
) => {
  // return (
  //   <div className="flex items-center">
  //     <div>{t(label)}</div>
  //     {suffix}
  //   </div>
  // );
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

  // const routeToMenuFn = useCallback(
  //   (items: RouteObject[]) => {
  //     return items.map((item) => {
  //       const menuItem: any = [];
  //       const { handle, children, path } = item;
  //       if (handle) {
  //         const { icon, title } = handle;
  //         menuItem.key = path;
  //         menuItem.label = (
  //           <div className="inline-flex w-full items-center justify-between">
  //             <div>{t(title)}</div>
  //           </div>
  //         );

  //         if (icon) {
  //           menuItem.icon = <Iconify icon={icon} width="1em" height="1em" />;
  //         }
  //       }
  //       if (children) {
  //         menuItem.children = routeToMenuFn(children);
  //       }

  //       return menuItem;
  //     });
  //   },
  //   [t]
  // );
  const routeToMenuFn = useCallback(
    (items: AppRouteObject[]): MenuItem[] => {
      return items
        .filter((item) => !item.meta?.hideMenu)
        .map((item) => {
          const { meta, children } = item;
          if (!meta) return {} as MenuItem;

          const menuItem: Partial<MenuItem> = {
            key: meta.key,
            disabled: meta.disabled,
            label: renderLabel(meta.label, meta.suffix, t),
            ...(meta.icon && {
              icon: <Iconify icon={meta.icon} width="1em" height="1em" />,
            }),
            ...(children && { children: routeToMenuFn(children) }),
          };

          return menuItem as MenuItem;
        });
    },
    [t]
  );
  return routeToMenuFn;
}

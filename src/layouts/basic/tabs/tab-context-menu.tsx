import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { IContextMenuItem } from '@/types';
import { getKeepaliveIns } from '@/utils/keepaliveIns';
import { Fragment, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  menu: Record<string, any>;
  createContextMenus: (data: any) => IContextMenuItem[];
};

export default function TabContextMenu({
  children,
  menu,
  createContextMenus,
}: Props) {
  const menusView = createContextMenus?.(menu);

  const handleClick = (menu: any) => {
    if (menu.disabled) {
      return;
    }
    menu?.handler?.();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {menusView?.map((menu) => (
          <Fragment key={menu.key}>
            <ContextMenuItem
              className="cursor-pointer"
              disabled={menu.disabled}
              onClick={(event) => {
                event.stopPropagation();
                handleClick(menu);
              }}
            >
              {menu.icon && <menu.icon className="mr-2 size-4 text-lg" />}
              {menu.text}
            </ContextMenuItem>
            {menu.separator && <ContextMenuSeparator />}
          </Fragment>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  FoldHorizontal,
  RotateCw,
  X,
} from '@/icons';
import { TabPageItem, useTabPageActions, useTabsStore } from '@/store/tabs';
import { getKeepaliveIns } from '@/utils/keepaliveIns';
import { Fragment, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

type Props = PropsWithChildren & {
  tab: TabPageItem;
};

export default function TabDropdownMenu({ children, tab }: Props) {
  const location = useLocation();
  const activeKey = location.pathname + location.search;
  const tabs = useTabsStore((state) => state.tabPages);
  const setTabPages = useTabsStore((state) => state.setTabPages);
  const { closeTabPage } = useTabPageActions();

  /**
   * 获取操作是否禁用
   * @param tab
   */
  function getTabDisableState(tab = location.pathname) {
    const index = tabs.findIndex((item) => item.url === tab);

    const disabled = tabs.length <= 1;

    const isCurrentTab = activeKey === tab;

    // 当前处于最左侧或者减去固定标签页的数量等于0
    const disabledCloseLeft = index === 0 || !isCurrentTab;

    const disabledCloseRight = !isCurrentTab || index === tabs.length - 1;

    const disabledCloseOther = disabled || !isCurrentTab;
    return {
      disabledCloseAll: disabled,
      disabledCloseCurrent: disabled,
      disabledCloseLeft,
      disabledCloseOther,
      disabledCloseRight,
      disabledRefresh: !isCurrentTab,
    };
  }

  const createContextMenus = (tabKey: string = location.pathname) => {
    const {
      disabledCloseCurrent,
      disabledCloseLeft,
      disabledCloseOther,
      disabledCloseRight,
      disabledRefresh,
    } = getTabDisableState(tabKey);

    const menus = [
      {
        disabled: disabledCloseCurrent,
        handler: () => {
          // closeTab(tabKey);
          closeTabPage(tab.url);
        },
        icon: X,
        key: 'close',
        text: '关闭',
      },

      {
        disabled: disabledRefresh,
        handler: () => {
          const keepaliveIns = getKeepaliveIns();
          keepaliveIns?.refresh();
        },
        icon: RotateCw,
        key: 'reload',
        text: '重新加载',
      },

      {
        disabled: disabledCloseLeft,
        handler: () => {
          setTabPages((tabPages) => {
            const currentIndex = tabPages.findIndex(
              (tab) => tab.url === activeKey
            );
            // check if currentIndex is 0
            if (currentIndex === 0) {
              return tabPages;
            } else {
              return tabPages.slice(currentIndex);
            }
          });
        },
        icon: ArrowLeftToLine,
        key: 'close-left',
        text: '关闭左侧标签页',
      },
      {
        disabled: disabledCloseRight,
        handler: () => {
          setTabPages((tabPages) => {
            const currentIndex = tabPages.findIndex(
              (tab) => tab.url === activeKey
            );
            if (currentIndex === tabPages.length - 1) {
              return tabPages;
            } else {
              return tabPages.slice(0, currentIndex + 1);
            }
          });
        },
        icon: ArrowRightToLine,
        key: 'close-right',
        separator: true,
        text: '关闭右侧标签页',
      },
      {
        disabled: disabledCloseOther,
        handler: () => {
          setTabPages((tabPages) => {
            return tabPages.filter((tab) => tab.url === activeKey);
          });
        },
        icon: FoldHorizontal,
        key: 'close-other',
        text: '关闭其他标签页',
      },
    ];
    return menus;
  };

  const menus = createContextMenus(tab?.url);

  const handleClick = (menu: any) => {
    if (menu.disabled) {
      return;
    }
    menu?.handler?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex h-full items-center gap-1">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="">
        <DropdownMenuGroup>
          {menus.map((menu) => (
            <Fragment key={menu.key}>
              <DropdownMenuItem
                className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground text-foreground/80 mb-1 cursor-pointer"
                disabled={menu.disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  handleClick(menu);
                }}
              >
                <menu.icon className="mr-2 size-4 text-lg" />
                {menu.text}
              </DropdownMenuItem>
              {menu.separator && (
                <DropdownMenuSeparator className="bg-border" />
              )}
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

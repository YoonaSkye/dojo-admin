import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Fragment, PropsWithChildren, useMemo } from 'react';
import {
  ArrowLeftToLine,
  ArrowRightLeft,
  ArrowRightToLine,
  ExternalLink,
  FoldHorizontal,
  Fullscreen,
  Minimize2,
  RotateCw,
  X,
} from '@/icons';
import { useMultiTabsContext } from '../default/tabbar/multi-tabs-provider';
import { useLocation } from 'react-router-dom';
import { KeepAliveTab } from '@/hooks/use-keep-alive';

const contentIsMaximize = false;

type Props = PropsWithChildren & {
  tab: KeepAliveTab;
};

export default function TabContextMenu({ children, tab }: Props) {
  const {
    tabs,
    activeTabRoutePath,
    setTabs,
    closeTab,
    refreshTab,
    closeOthersTab,
    closeAll,
    closeLeft,
    closeRight,
  } = useMultiTabsContext();
  const { pathname } = useLocation();

  /**
   * 获取操作是否禁用
   * @param tab
   */
  function getTabDisableState(tab = pathname) {
    const index = tabs.findIndex((item) => item.key === tab);

    const disabled = tabs.length <= 1;

    const isCurrentTab = activeTabRoutePath === tab;

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

  const createContextMenus = (tabKey: string) => {
    const {
      disabledCloseAll,
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
          console.log(tabKey);
          closeTab(tabKey);
        },
        icon: X,
        key: 'close',
        text: '关闭',
      },
      // {
      //   handler: async () => {
      //     await toggleTabPin(tab);
      //   },
      //   icon: affixTab ? PinOff : Pin,
      //   key: 'affix',
      //   text: affixTab
      //     ? $t('preferences.tabbar.contextMenu.unpin')
      //     : $t('preferences.tabbar.contextMenu.pin'),
      // },
      {
        // handler: async () => {
        //   if (!contentIsMaximize.value) {
        //     await router.push(tab.fullPath);
        //   }
        //   toggleMaximize();
        // },
        icon: contentIsMaximize ? Minimize2 : Fullscreen,
        key: contentIsMaximize ? 'restore-maximize' : 'maximize',
        text: contentIsMaximize ? '还原' : '最大化',
      },
      {
        disabled: disabledRefresh,
        // handler: refreshTab,
        icon: RotateCw,
        key: 'reload',
        text: '重新加载',
      },
      {
        // handler: async () => {
        //   await openTabInNewWindow(tab);
        // },
        icon: ExternalLink,
        key: 'open-in-new-window',
        separator: true,
        text: '新窗口打开',
      },

      {
        disabled: disabledCloseLeft,
        handler: () => {
          closeLeft(tabKey);
        },
        icon: ArrowLeftToLine,
        key: 'close-left',
        text: '关闭左侧标签页',
      },
      {
        disabled: disabledCloseRight,
        handler: () => {
          closeRight(tabKey);
        },
        icon: ArrowRightToLine,
        key: 'close-right',
        separator: true,
        text: '关闭右侧标签页',
      },
      {
        disabled: disabledCloseOther,
        // handler: async () => {
        //   await closeOtherTabs(tab);
        // },
        icon: FoldHorizontal,
        key: 'close-other',
        text: '关闭其他标签页',
      },
      {
        disabled: disabledCloseAll,
        // handler: closeAllTabs,
        icon: ArrowRightLeft,
        key: 'close-all',
        text: '关闭全部标签页',
      },
    ];
    return menus;
  };

  const menus = createContextMenus(tab.key);

  const handleClick = (menu) => {
    if (menu.disabled) {
      return;
    }
    menu?.handler?.();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {menus.map((menu) => (
          <Fragment key={menu.key}>
            <ContextMenuItem
              className="cursor-pointer"
              disabled={menu.disabled}
              onClick={(event) => {
                event.stopPropagation();
                handleClick(menu);
              }}
            >
              <menu.icon className="mr-2 size-4 text-lg" />
              {menu.text}
            </ContextMenuItem>
            {menu.separator && <ContextMenuSeparator />}
          </Fragment>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

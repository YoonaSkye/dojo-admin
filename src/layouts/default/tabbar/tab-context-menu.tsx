import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { KeepAliveTab } from '@/hooks/use-keep-alive';
import {
  ArrowLeftToLine,
  ArrowRightLeft,
  ArrowRightToLine,
  FoldHorizontal,
  RotateCw,
  X,
} from '@/icons';
import { Fragment, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { useMultiTabsContext } from './multi-tabs-provider';

const contentIsMaximize = false;

type Props = PropsWithChildren & {
  tab?: KeepAliveTab;
};

export default function TabContextMenu({ children, tab }: Props) {
  const {
    tabs,
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOthersTab,
    closeAll,
    closeLeft,
    closeRight,
  } = useMultiTabsContext();
  const { pathname } = useLocation();
  // const currentTab = tabs.find((item) => item.key === pathname)?.key;

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

  const createContextMenus = (tabKey: string = pathname) => {
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
      //     if (!contentIsMaximize.value) {
      //       await router.push(tab.fullPath);
      //     }
      //     toggleMaximize();
      //   },
      //   icon: contentIsMaximize ? Minimize2 : Fullscreen,
      //   key: contentIsMaximize ? 'restore-maximize' : 'maximize',
      //   text: contentIsMaximize ? '还原' : '最大化',
      // },
      {
        disabled: disabledRefresh,
        handler: () => refreshTab(tabKey),
        icon: RotateCw,
        key: 'reload',
        text: '重新加载',
      },
      // {
      //   handler: async () => {
      //     await openTabInNewWindow(tab);
      //   },
      //   icon: ExternalLink,
      //   key: 'open-in-new-window',
      //   separator: true,
      //   text: '新窗口打开',
      // },

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
        handler: () => {
          closeOthersTab(tabKey);
        },
        icon: FoldHorizontal,
        key: 'close-other',
        text: '关闭其他标签页',
      },
      {
        disabled: disabledCloseAll,
        handler: () => closeAll(),
        icon: ArrowRightLeft,
        key: 'close-all',
        text: '关闭全部标签页',
      },
    ];
    return menus;
  };

  const menus = createContextMenus(tab?.key);

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

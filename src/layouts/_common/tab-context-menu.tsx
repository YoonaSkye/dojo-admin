import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { PropsWithChildren } from 'react';
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

const contentIsMaximize = false;

const menus = [
  {
    // disabled: disabledCloseCurrent,
    // handler: async () => {
    //   await closeCurrentTab(tab);
    // },
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
    // disabled: disabledRefresh,
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
    // disabled: disabledCloseLeft,
    // handler: async () => {
    //   await closeLeftTabs(tab);
    // },
    icon: ArrowLeftToLine,
    key: 'close-left',
    text: '关闭左侧标签页',
  },
  {
    // disabled: disabledCloseRight,
    // handler: async () => {
    //   await closeRightTabs(tab);
    // },
    icon: ArrowRightToLine,
    key: 'close-right',
    separator: true,
    text: '关闭右侧标签页',
  },
  {
    // disabled: disabledCloseOther,
    // handler: async () => {
    //   await closeOtherTabs(tab);
    // },
    icon: FoldHorizontal,
    key: 'close-other',
    text: '关闭其他标签页',
  },
  {
    // disabled: disabledCloseAll,
    // handler: closeAllTabs,
    icon: ArrowRightLeft,
    key: 'close-all',
    text: '关闭全部标签页',
  },
];

export default function TabContextMenu({ children }: PropsWithChildren) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {menus.map((menu) => (
          <>
            <ContextMenuItem key={menu.key} className="cursor-pointer">
              <menu.icon className="mr-2 size-4 text-lg" />
              {menu.text}
            </ContextMenuItem>
            {menu.separator && <ContextMenuSeparator />}
          </>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

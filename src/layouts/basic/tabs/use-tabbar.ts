import { useLocale } from '@/features/lang';
import {
  ArrowLeftToLine,
  ArrowRightLeft,
  ArrowRightToLine,
  FoldHorizontal,
  Pin,
  PinOff,
  RotateCw,
  X,
} from '@/icons';
import { $t } from '@/locales/i18n';
import { useRoute, useRouter } from '@/router';

import { getTabKey, useTabbarStore } from '@/store/tabs';
import type { IContextMenuItem, TabDefinition } from '@/types';
import { useEffect, useMemo } from 'react';
import { useTabs } from './use-tabs';

export function useTabbar() {
  const router = useRouter();
  const route = useRoute();

  const tabs = useTabbarStore((state) => state.tabs);
  const updateTime = useTabbarStore((state) => state.updateTime);
  const menuList = useTabbarStore((state) => state.menuList);
  const { addTab, getTabByKey } = useTabbarStore();

  const {
    closeAllTabs,
    closeCurrentTab,
    closeLeftTabs,
    closeOtherTabs,
    closeRightTabs,
    closeTabByKey,
    getTabDisableState,
    toggleTabPin,
    refresh,
  } = useTabs();

  /**
   * 当前路径对应的tab的key
   */
  const currentActive = useMemo(() => {
    return getTabKey(route);
  }, [route]);

  const { locale } = useLocale();

  const currentTabs = useMemo(() => {
    return tabs.map((item) => wrapperTabLocale(item));
  }, [tabs, updateTime, locale]);

  // 点击tab,跳转路由
  const handleClick = (key: string) => {
    const { fullPath, pathname } = getTabByKey(key);
    router.navigate(fullPath || pathname);
  };

  // 关闭tab
  const handleClose = (key: string) => {
    closeTabByKey(key, router, route);
  };

  function wrapperTabLocale(tab: TabDefinition) {
    return {
      ...tab,
      handle: {
        ...tab?.handle,
        title: $t(tab?.handle?.title as string),
      },
    };
  }

  useEffect(() => {
    // FIX: 防止添加目录路由，如/dashboard
    if (!route.handle || route.handle.hideInTab) return;

    addTab({
      ...route,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.fullPath]);

  const createContextMenus = (tab: TabDefinition) => {
    const {
      disabledCloseAll,
      disabledCloseCurrent,
      disabledCloseLeft,
      disabledCloseOther,
      disabledCloseRight,
      disabledRefresh,
    } = getTabDisableState(tab);

    const affixTab = tab?.handle?.affixTab ?? false;

    const menus: IContextMenuItem[] = [
      {
        disabled: disabledCloseCurrent,
        handler: () => {
          closeCurrentTab(tab);
        },
        icon: X,
        key: 'close',
        text: $t('preferences.tabbar.contextMenu.close'),
      },
      {
        handler: async () => {
          await toggleTabPin(tab);
        },
        icon: affixTab ? PinOff : Pin,
        key: 'affix',
        text: affixTab
          ? $t('preferences.tabbar.contextMenu.unpin')
          : $t('preferences.tabbar.contextMenu.pin'),
      },
      {
        disabled: disabledRefresh,
        handler: () => refresh(),
        icon: RotateCw,
        key: 'reload',
        separator: true,
        text: $t('preferences.tabbar.contextMenu.reload'),
      },
      {
        disabled: disabledCloseLeft,
        handler: () => {
          closeLeftTabs(tab);
        },
        icon: ArrowLeftToLine,
        key: 'close-left',
        text: $t('preferences.tabbar.contextMenu.closeLeft'),
      },
      {
        disabled: disabledCloseRight,
        handler: () => {
          closeRightTabs(tab);
        },
        icon: ArrowRightToLine,
        key: 'close-right',
        separator: true,
        text: $t('preferences.tabbar.contextMenu.closeRight'),
      },
      {
        disabled: disabledCloseOther,
        handler: () => {
          closeOtherTabs(tab);
        },
        icon: FoldHorizontal,
        key: 'close-other',
        text: $t('preferences.tabbar.contextMenu.closeOther'),
      },
      {
        disabled: disabledCloseAll,
        handler: closeAllTabs,
        icon: ArrowRightLeft,
        key: 'close-all',
        text: $t('preferences.tabbar.contextMenu.closeAll'),
      },
    ];

    return menus.filter((item) => menuList.includes(item.key));
  };

  return {
    createContextMenus,
    currentActive,
    currentTabs,
    handleClick,
    handleClose,
  };
}

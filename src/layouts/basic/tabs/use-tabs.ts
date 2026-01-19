import { useRoute, useRouter } from '@/router';
import { useTabbarStore } from '@/store/tabs';
import type { TabDefinition } from '@/types';

export function useTabs() {
  const router = useRouter();
  const route = useRoute();
  const tabs = useTabbarStore((state) => state.tabs);

  const {
    closeAllTabs,
    closeLeftTabs,
    closeOtherTabs,
    closeRightTabs,
    closeTab,
    closeTabByKey,
    toggleTabPin,
    getAffixTabs,
    refresh,
  } = useTabbarStore();

  function closeCurrentTab(tab?: TabDefinition) {
    closeTab(tab || route, router, route);
  }

  /**
   * 获取操作是否禁用
   * @param tab
   */
  function getTabDisableState(tab: TabDefinition = route) {
    const index = tabs.findIndex((item) => item.pathname === tab.pathname);
    const affixTabs = getAffixTabs();

    const disabled = tabs.length <= 1;

    const { handle } = tab;
    const affixTab = handle?.affixTab ?? false;
    const isCurrentTab = route.pathname === tab.pathname;

    // 当前处于最左侧或者减去固定标签页的数量等于0
    const disabledCloseLeft =
      index === 0 || index - affixTabs.length <= 0 || !isCurrentTab;

    const disabledCloseRight = !isCurrentTab || index === tabs.length - 1;

    const disabledCloseOther =
      disabled || !isCurrentTab || tabs.length - affixTabs.length <= 1;

    return {
      disabledCloseAll: disabled,
      disabledCloseCurrent: !!affixTab || disabled,
      disabledCloseLeft,
      disabledCloseOther,
      disabledCloseRight,
      disabledRefresh: !isCurrentTab,
    };
  }

  return {
    closeAllTabs,
    closeCurrentTab,
    closeLeftTabs,
    closeOtherTabs,
    closeRightTabs,
    closeTabByKey,
    getTabDisableState,
    toggleTabPin,
    refresh,
  };
}

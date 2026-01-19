import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Route, TabDefinition } from '@/types';
import type { RouterContextType as Router } from '@/router';

interface TabbarState {
  /**
   * @zh_CN 当前打开的标签页列表缓存
   */
  cachedTabs: Set<string>;
  /**
   * @zh_CN 需要排除缓存的标签页
   */
  excludeCachedTabs: Set<string>;
  /**
   * @zh_CN 标签右键菜单列表
   */
  menuList: string[];
  /**
   * @zh_CN 是否刷新
   */
  renderRouteView?: boolean;
  /**
   * @zh_CN 当前打开的标签页列表
   */
  tabs: TabDefinition[];
  /**
   * @zh_CN 更新时间，用于一些更新场景，使用watch深度监听的话，会损耗性能
   */
  updateTime?: number;
}

interface TabbarActions {
  /**
   * Close tabs in bulk
   */
  _bulkCloseByKeys: (keys: string[]) => void;
  /**
   * @zh_CN 关闭标签页
   */
  _close: (tab: TabDefinition) => void;
  /**
   * @zh_CN 跳转到默认标签页
   */
  _goToDefaultTab: (router: Router) => void;
  /**
   * @zh_CN 跳转到标签页
   */
  _goToTab: (tab: TabDefinition, router: Router) => void;
  /**
   * @zh_CN 添加标签页
   */
  addTab: (routeTab: TabDefinition) => TabDefinition;
  /**
   * @zh_CN 关闭所有标签页
   */
  closeAllTabs: (router: Router) => void;
  /**
   * @zh_CN 关闭左侧标签页
   */
  closeLeftTabs: (tab: TabDefinition) => void;
  /**
   * @zh_CN 关闭其他标签页
   */
  closeOtherTabs: (tab: TabDefinition) => void;
  /**
   * @zh_CN 关闭右侧标签页
   */
  closeRightTabs: (tab: TabDefinition) => void;
  /**
   * @zh_CN 关闭标签页
   */
  closeTab: (tab: TabDefinition, router: Router, currentRoute: Route) => void;
  /**
   * @zh_CN 通过key关闭标签页
   */
  closeTabByKey: (key: string, router: Router, route: Route) => void;
  /**
   * 根据tab的key获取tab
   */
  getTabByKey: (key: string) => TabDefinition;
  /**
   * @zh_CN 固定标签页
   * @param tab
   */
  pinTab: (tab: TabDefinition) => void;
  /**
   * 刷新标签页
   */
  refresh: (key?: string) => void;
  /**
   * 根据路由名称刷新指定标签页
   */
  // refreshByName: (name: string) => Promise<void>;
  /**
   * @zh_CN 更新菜单列表
   */
  setMenuList: (list: string[]) => void;
  setUpdateTime: () => void;
  /**
   * @zh_CN 设置标签页顺序
   * @param oldIndex
   * @param newIndex
   */
  sortTabs: (oldIndex: number, newIndex: number) => void;
  /**
   * @zh_CN 切换固定标签页
   * @param tab
   */
  toggleTabPin: (tab: TabDefinition) => void;
  /**
   * @zh_CN 取消固定标签页
   * @param tab
   */
  unpinTab: (tab: TabDefinition) => void;
  /**
   * 根据当前打开的选项卡更新缓存
   */
  updateCacheTabs: () => void;
  getAffixTabs: () => TabDefinition[];
}

type TabbarStore = TabbarState & TabbarActions;

export const useTabbarStore = create<TabbarStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      cachedTabs: new Set(),
      excludeCachedTabs: new Set(),
      menuList: [
        'close',
        'affix',
        'reload',
        'close-left',
        'close-right',
        'close-other',
        'close-all',
      ],
      renderRouteView: false,
      tabs: [],
      updateTime: Date.now(),

      // Actions
      _bulkCloseByKeys: (keys: string[]) => {
        const keySet = new Set(keys);
        set((state) => {
          state.tabs = state.tabs.filter(
            (item) => !keySet.has(getTabKeyFromTab(item))
          );
        });
        get().updateCacheTabs();
      },

      _close: (tab: TabDefinition) => {
        if (isAffixTab(tab)) {
          return;
        }
        set((state) => {
          const index = state.tabs.findIndex((item) => equalTab(item, tab));
          if (index !== -1) {
            state.tabs.splice(index, 1);
          }
        });
      },

      _goToDefaultTab: (router: Router) => {
        const state = get();
        if (state.tabs.length <= 0) {
          return;
        }
        const firstTab = state.tabs[0];
        if (firstTab) {
          get()._goToTab(firstTab, router);
        }
      },

      _goToTab: (tab: TabDefinition, router: Router) => {
        const { params, pathname, query } = tab;
        const toParams = {
          pathname: pathname,
          search: new URLSearchParams(query).toString(),
          state: params,
        };
        router.navigate(toParams);
      },

      addTab: (routeTab: TabDefinition) => {
        let tab = cloneTab(routeTab);
        if (!tab.key) {
          tab.key = getTabKey(routeTab);
        }
        if (!isTabShown(tab)) {
          return tab;
        }

        const state = get();
        const tabIndex = state.tabs.findIndex((item) => equalTab(item, tab));

        if (tabIndex === -1) {
          // const maxCount = preferences.tabbar.maxCount;
          const maxCount = 0;

          set((state) => {
            if (maxCount > 0 && state.tabs.length >= maxCount) {
              const index = state.tabs.findIndex(
                (item) => !item.handle.affixTab
              );
              if (index !== -1) {
                state.tabs.splice(index, 1);
              }
            }
            state.tabs.push(tab);
          });
        } else {
          set((state) => {
            const currentTab = state.tabs[tabIndex];
            const mergedTab = {
              ...currentTab,
              ...tab,
              handle: { ...currentTab?.handle, ...tab.handle },
            };
            if (currentTab) {
              const curMeta = currentTab.handle;
              if (curMeta.affixTab !== undefined) {
                mergedTab.handle.affixTab = curMeta.affixTab;
              }
              // if (curMeta.newTabTitle !== undefined) {
              //   mergedTab.handle.newTabTitle = curMeta.newTabTitle;
              // }
            }
            state.tabs.splice(tabIndex, 1, mergedTab);
            tab = mergedTab;
          });
        }

        return tab;
      },

      closeAllTabs: (router: Router) => {
        set((state) => {
          const newTabs = state.tabs.filter((tab) => isAffixTab(tab));
          state.tabs = newTabs.length > 0 ? newTabs : state.tabs.slice(0, 1);
        });
        get()._goToDefaultTab(router);
        get().updateCacheTabs();
      },

      closeLeftTabs: (tab: TabDefinition) => {
        const state = get();
        const index = state.tabs.findIndex((item) => equalTab(item, tab));
        if (index < 1) {
          return;
        }
        const leftTabs = state.tabs.slice(0, index);
        const keys: string[] = [];
        for (const item of leftTabs) {
          if (!isAffixTab(item)) {
            keys.push(item.key as string);
          }
        }
        get()._bulkCloseByKeys(keys);
      },

      closeOtherTabs: (tab: TabDefinition) => {
        const state = get();
        const closeKeys = state.tabs.map((item) => getTabKeyFromTab(item));
        const keys: string[] = [];
        for (const key of closeKeys) {
          if (key !== getTabKeyFromTab(tab)) {
            const closeTab = state.tabs.find(
              (item) => getTabKeyFromTab(item) === key
            );
            if (closeTab && !isAffixTab(closeTab)) {
              keys.push(closeTab.key as string);
            }
          }
        }
        get()._bulkCloseByKeys(keys);
      },

      closeRightTabs: (tab: TabDefinition) => {
        const state = get();
        const index = state.tabs.findIndex((item) => equalTab(item, tab));
        if (index !== -1 && index < state.tabs.length - 1) {
          const rightTabs = state.tabs.slice(index + 1);
          const keys: string[] = [];
          for (const item of rightTabs) {
            if (!isAffixTab(item)) {
              keys.push(item.key as string);
            }
          }
          get()._bulkCloseByKeys(keys);
        }
      },

      closeTab: (tab: TabDefinition, router: Router, currentRoute: Route) => {
        const state = get();

        if (getTabKey(currentRoute) !== getTabKeyFromTab(tab)) {
          get()._close(tab);
          get().updateCacheTabs();
          return;
        }
        const index = state.tabs.findIndex(
          (item) => getTabKeyFromTab(item) === getTabKey(currentRoute)
        );
        const before = state.tabs[index - 1];
        const after = state.tabs[index + 1];
        if (after) {
          get()._close(tab);
          get()._goToTab(after, router);
        } else if (before) {
          get()._close(tab);
          get()._goToTab(before, router);
        } else {
          console.error('Failed to close the tab; only one tab remains open.');
        }
      },

      closeTabByKey: (key: string, router: Router, route: Route) => {
        // const originKey = decodeURIComponent(key);
        const originKey = key;
        const state = get();
        const index = state.tabs.findIndex(
          (item) => getTabKeyFromTab(item) === originKey
        );
        if (index === -1) {
          return;
        }
        const tab = state.tabs[index];
        if (tab) {
          get().closeTab(tab, router, route);
        }
      },

      getTabByKey: (key: string) => {
        const state = get();
        return state.tabs.find(
          (item) => getTabKeyFromTab(item) === key
        ) as TabDefinition;
      },

      pinTab: (tab: TabDefinition) => {
        const state = get();
        const index = state.tabs.findIndex((item) => equalTab(item, tab));
        if (index === -1) {
          return;
        }

        set((state) => {
          const oldTab = state.tabs[index];
          tab.handle.affixTab = true;
          tab.handle.title = oldTab?.handle?.title as string;
          state.tabs.splice(index, 1, tab);
        });

        // 过滤固定tabs，后面更改affixTabOrder的值的话可能会有问题，目前行464排序affixTabs没有设置值
        const affixTabs = get().tabs.filter((tab) => isAffixTab(tab));
        // 获得固定tabs的index
        const newIndex = affixTabs.findIndex((item) => equalTab(item, tab));
        // 交换位置重新排序
        get().sortTabs(index, newIndex);
      },

      refresh: async () => {
        set((state) => {
          state.renderRouteView = true;
        });

        await new Promise((resolve) => setTimeout(resolve, 200));

        set((state) => {
          state.renderRouteView = false;
        });
      },

      setMenuList: (list: string[]) => {
        set((state) => {
          state.menuList = list;
        });
      },

      setUpdateTime: () => {
        set((state) => {
          state.updateTime = Date.now();
        });
      },

      sortTabs: (oldIndex: number, newIndex: number) => {
        const state = get();
        const currentTab = state.tabs[oldIndex];
        if (!currentTab) {
          return;
        }
        set((state) => {
          state.tabs.splice(oldIndex, 1);
          state.tabs.splice(newIndex, 0, currentTab);
        });
      },

      toggleTabPin: (tab: TabDefinition) => {
        const affixTab = tab?.handle?.affixTab ?? false;

        affixTab ? get().unpinTab(tab) : get().pinTab(tab);
      },

      unpinTab: (tab: TabDefinition) => {
        const state = get();
        const index = state.tabs.findIndex((item) => equalTab(item, tab));
        if (index === -1) {
          return;
        }

        set((state) => {
          const oldTab = state.tabs[index];
          tab.handle.affixTab = false;
          tab.handle.title = oldTab?.handle?.title as string;
          // this.addTab(tab);
          state.tabs.splice(index, 1, tab);
        });

        // 过滤固定tabs，后面更改affixTabOrder的值的话可能会有问题，目前行464排序affixTabs没有设置值
        const affixTabs = get().tabs.filter((tab) => isAffixTab(tab));
        // 获得固定tabs的index,使用固定tabs的下一个位置也就是活动tabs的第一个位置
        const newIndex = affixTabs.length;
        // 交换位置重新排序
        get().sortTabs(index, newIndex);
      },

      updateCacheTabs: () => {
        // TODO: 待完成
      },

      getAffixTabs: () => {
        const state = get();
        return state.tabs.filter((tab) => isAffixTab(tab));
      },
    })),
    {
      name: 'core-tabbar',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ tabs: state.tabs }),
    }
  )
);

// Helper functions
function cloneTab(route: TabDefinition): TabDefinition {
  if (!route) {
    return route;
  }
  const { matched, handle, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          handle: item.handle,
          pathname: item.pathname,
        }))
      : undefined) as any[],
    handle: {
      ...handle,
    },
  };
}

function isAffixTab(tab: TabDefinition) {
  return tab?.handle?.affixTab ?? false;
}

function isTabShown(tab: TabDefinition) {
  return !tab.handle.hideInTab;
}

function getTabKey(tab: any) {
  const { fullPath, pathname, handle: { fullPathKey } = {}, query = {} } = tab;
  const pageKey = Array.isArray(query.pageKey)
    ? query.pageKey[0]
    : query.pageKey;
  let rawKey;
  if (pageKey) {
    rawKey = pageKey;
  } else {
    rawKey = fullPathKey === false ? pathname : fullPath ?? pathname;
  }
  try {
    return decodeURIComponent(rawKey);
  } catch {
    return rawKey;
  }
}

function getTabKeyFromTab(tab: TabDefinition): string {
  return tab.key ?? getTabKey(tab);
}

function equalTab(a: TabDefinition, b: TabDefinition) {
  return getTabKeyFromTab(a) === getTabKeyFromTab(b);
}

export { getTabKey };

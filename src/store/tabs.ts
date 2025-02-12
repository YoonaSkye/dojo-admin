import { getKeepaliveIns } from '@/utils/keepaliveIns';
import { isNil } from 'ramda';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  useLocation,
  useNavigate,
  type NavigateOptions,
} from 'react-router-dom';
import { findRouteByAbsolutePath } from '@/utils/route';
import { useAccessRoutes } from './access';

export interface TabPageItem {
  url: string;
  title: string;
  state?: unknown;
  // if custom is true, title will keep immutable
  custom?: boolean;
  icon?: string;
}

interface TabsStore {
  tabPages: TabPageItem[];
  getTabPages: () => TabPageItem[];
  setTabPages: (update: (prev: TabPageItem[]) => TabPageItem[]) => void;
  addTabPage: (tabPage: TabPageItem) => void;
  removeTabPage: (url: string) => void;
}

export const useTabsStore = create<TabsStore>()(
  persist(
    (set, get) => ({
      tabPages: [],
      getTabPages: () => get().tabPages,
      setTabPages: (update: (prev: TabPageItem[]) => TabPageItem[]) =>
        set({ tabPages: update(get().tabPages) }),
      addTabPage: (tabPage: TabPageItem) =>
        set((state) => ({ tabPages: [...state.tabPages, tabPage] })),
      removeTabPage: (url: string) =>
        set((state) => ({
          tabPages: state.tabPages.filter((tab) => tab.url !== url),
        })),
    }),
    { name: 'core-tabs' }
  )
);

export const tabsStore = {
  getTabPages: () => useTabsStore.getState().getTabPages(),
  setTabPages: (update: (prev: TabPageItem[]) => TabPageItem[]) =>
    useTabsStore.getState().setTabPages(update),
  addTabPage: (tabPage: TabPageItem) =>
    useTabsStore.getState().addTabPage(tabPage),
  removeTabPage: (url: string) => useTabsStore.getState().removeTabPage(url),
};

let lastActiveKey: string;

export const useTabPageActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authRoutes = useAccessRoutes();

  function openTabPage(tabPage: TabPageItem, options?: NavigateOptions) {
    const activeKey = location.pathname + location.search;
    const route = findRouteByAbsolutePath(activeKey, authRoutes);

    if (activeKey === '/') return;

    lastActiveKey = activeKey;
    const tabPages = tabsStore.getTabPages();
    if (!tabPages.some((tab) => tab.url === activeKey)) {
      // if route is not a layout, add it to tabPages
      if (isNil(route?.children)) {
        tabsStore.addTabPage(tabPage);
      }
    }
    if (activeKey === tabPage.url) {
      return;
    }
    navigate(tabPage.url, {
      state: tabPage.state,
      ...options,
    });
  }

  function closeTabPage(url: string) {
    let tabPages = tabsStore.getTabPages();
    const exist = tabPages.some((tab) => tab.url === url);
    if (!exist) {
      return;
    }
    if (tabPages.length <= 1) {
      // messageApi().warning("The last tab page cannot be closed")
      return;
    }
    getKeepaliveIns().destroy(url);
    tabPages = tabPages.filter((tab) => tab.url !== url);
    tabsStore.setTabPages(() => [...tabPages]);
    const nextActiveItem =
      tabPages.find((tab) => tab.url === lastActiveKey) ||
      tabPages[tabPages.length - 1];
    navigate(nextActiveItem.url, {
      state: nextActiveItem.state,
      replace: true,
    });
  }

  return {
    openTabPage,
    closeTabPage,
  };
};

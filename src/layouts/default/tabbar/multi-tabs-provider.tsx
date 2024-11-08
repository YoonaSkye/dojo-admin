import { useMatchRoute, useRouter } from '@/router/hooks';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface KeepAliveTab {
  title: string;
  pathname: string;
  icon?: any;
  children: any;
  hideTab?: boolean;
  timeStamp?: string;
  key?: string;
}

type MultiTabsContextType = {
  tabs: KeepAliveTab[];
  activeTabRoutePath?: string;
  setTabs: (tabs: KeepAliveTab[]) => void;
  closeTab: (path?: string) => void;
  closeOthersTab: (path?: string) => void;
  closeAll: () => void;
  closeLeft: (path: string) => void;
  closeRight: (path: string) => void;
  refreshTab: (path: string) => void;
};

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const MultiTabsContext = createContext<MultiTabsContextType>({
  tabs: [],
  activeTabRoutePath: '',
  setTabs: () => {},
  closeTab: () => {},
  closeOthersTab: () => {},
  closeAll: () => {},
  closeLeft: () => {},
  closeRight: () => {},
  refreshTab: () => {},
});

export function useMultiTabsContext() {
  return useContext(MultiTabsContext);
}

export default function MultiTabsProvider({ children }: PropsWithChildren) {
  const { push } = useRouter();
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  // current active tab path
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>('');
  // current match route
  const matchRoute = useMatchRoute();

  /**
   * Close specified tab
   */
  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      const tempTabs = [...tabs];
      if (tempTabs.length === 1) return;

      const deleteTabIndex = tempTabs.findIndex(
        (item) => item.pathname === path
      );
      if (deleteTabIndex === -1) return;

      if (deleteTabIndex > 0) {
        if (path === activeTabRoutePath) {
          push(tempTabs[deleteTabIndex - 1].pathname);
        }
      } else {
        if (path === activeTabRoutePath) {
          push(tempTabs[deleteTabIndex + 1].pathname);
        }
      }

      tempTabs.splice(deleteTabIndex, 1);
      setTabs(tempTabs);
    },
    [activeTabRoutePath, push, tabs]
  );

  /**
   * Close other tabs besides the specified tab
   */
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => prev.filter((item) => item.pathname === path));
      if (path !== activeTabRoutePath) {
        push(path);
      }
    },
    [activeTabRoutePath, push]
  );

  /**
   * Close all tabs then navigate to the home page
   */
  const closeAll = useCallback(() => {
    setTabs([]);
    push(HOMEPAGE);
  }, [push]);

  /**
   * Close all tabs in the left of specified tab
   */
  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.pathname === path);
      const newTabs = tabs.slice(currentTabIndex);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs]
  );

  /**
   * Close all tabs in the right of specified tab
   */
  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.pathname === path);
      const newTabs = tabs.slice(0, currentTabIndex + 1);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs]
  );

  /**
   * Refresh specified tab
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => {
        const index = prev.findIndex((item) => item.pathname === path);

        if (index >= 0) {
          prev[index].timeStamp = getTimeStamp();
        }

        return [...prev];
      });
    },
    [activeTabRoutePath]
  );

  useEffect(() => {
    setTabs((prev) => prev.filter((item) => !item.hideTab));

    if (!matchRoute) return;
    const existKeepAliveTab = tabs.find(
      (o) => o.pathname === matchRoute?.pathname
    );

    // 如果不存在则需要插入
    if (!existKeepAliveTab) {
      setTabs((prev) => [
        ...prev,
        {
          title: matchRoute.title,
          // pathname: getpathname(),
          // routePath: matchRoute.routePath,
          pathname: matchRoute.pathname,
          children: matchRoute.children,
          icon: matchRoute.icon,
          hideTab: matchRoute.hideTab,
        },
      ]);
    }

    setActiveTabRoutePath(matchRoute.pathname);
  }, [matchRoute]);

  const defaultValue: MultiTabsContextType = useMemo(
    () => ({
      tabs,
      activeTabRoutePath,
      setTabs,
      closeTab,
      closeOthersTab,
      closeLeft,
      closeRight,
      closeAll,
      refreshTab,
    }),
    [
      activeTabRoutePath,
      tabs,
      closeTab,
      closeOthersTab,
      closeLeft,
      closeRight,
      closeAll,
      refreshTab,
    ]
  );

  return (
    <MultiTabsContext.Provider value={defaultValue}>
      {children}
    </MultiTabsContext.Provider>
  );
}

function getTimeStamp() {
  return new Date().getTime().toString();
}

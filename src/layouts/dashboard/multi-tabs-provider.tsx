import { RouteMeta } from '#/router';
import { useCurrentRouteMeta, useRouter } from '@/router/hooks';
import { replaceDynamicParams } from '@/router/hooks/use-current-route-meta';
import { isEmpty } from 'ramda';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type KeepAliveTab = RouteMeta & {
  children: any;
};

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
  // current route meta
  const currentRouteMeta = useCurrentRouteMeta();
  console.log(currentRouteMeta?.key);

  // active tab
  const activeTabRoutePath = useMemo(() => {
    if (!currentRouteMeta) return '';

    const { key, params = {} } = currentRouteMeta;
    if (!isEmpty(params)) {
      return replaceDynamicParams(key, params);
    }
    return key;
  }, [currentRouteMeta]);

  /**
   * Close specified tab
   */
  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      const tempTabs = [...tabs];
      if (tempTabs.length === 1) return;

      const deleteTabIndex = tempTabs.findIndex((item) => item.key === path);
      if (deleteTabIndex === -1) return;

      if (deleteTabIndex > 0) {
        push(tempTabs[deleteTabIndex - 1].key);
      } else {
        push(tempTabs[deleteTabIndex + 1].key);
      }

      tempTabs.splice(deleteTabIndex, 1);
      setTabs(tempTabs);
    },
    [activeTabRoutePath, push, tabs]
  );

  /**
   * Close other tabs besides the specified tab
   */
  const closeOthersTab = useCallback(() => {}, []);

  /**
   * Close all tabs then navigate to the home page
   */
  const closeAll = useCallback(() => {}, []);

  /**
   * Close all tabs in the left of specified tab
   */
  const closeLeft = useCallback(() => {}, []);

  /**
   * Close all tabs in the right of specified tab
   */
  const closeRight = useCallback(() => {}, []);

  /**
   * Refresh specified tab
   */
  const refreshTab = useCallback(() => {}, []);

  useEffect(() => {
    setTabs((prev) => prev.filter((item) => !item.hideTab));

    if (!currentRouteMeta) return;
    let { key } = currentRouteMeta;
    const { outlet: children, params = {} } = currentRouteMeta;

    const isExisted = tabs.find((item) => item.key === key);

    if (!isExisted) {
      setTabs((prev) => [
        ...prev,
        { ...currentRouteMeta, key, children, timeStamp: getTimeStamp() },
      ]);
    }
  }, [currentRouteMeta]);

  const defaultValue: MultiTabsContextType = useMemo(
    () => ({
      tabs,
      activeTabRoutePath,
      setTabs,
      closeTab,
    }),
    [activeTabRoutePath, tabs, closeTab]
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

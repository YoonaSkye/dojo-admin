import { RouteMeta } from '#/router';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
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
  const [tabs, setTabs] = useState<KeepAliveTab[]>();
  const activeTabRoutePath = '';

  /**
   * Close specified tab
   */
  const closeTab = useCallback(() => {}, []);

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

  const defaultValue: MultiTabsContextType = useMemo(
    () => ({
      tabs,
      activeTabRoutePath,
      setTabs,
      closeTab,
      closeOthersTab,
      refreshTab,
      closeAll,
      closeLeft,
      closeRight,
    }),
    [
      activeTabRoutePath,
      closeAll,
      closeLeft,
      closeOthersTab,
      closeRight,
      closeTab,
      refreshTab,
      tabs,
    ]
  );

  return (
    <MultiTabsContext.Provider value={defaultValue}>
      {children}
    </MultiTabsContext.Provider>
  );
}

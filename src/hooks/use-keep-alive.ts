import { RouteMeta } from '#/router';
import { useMatchRouteMeta } from '@/router/hooks';
import { useEffect, useState } from 'react';

export type KeepAliveTab = RouteMeta & {
  children: any;
};

export default function useKeepAlive() {
  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);
  // active tab
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>();
  // current route meta
  const currentRouteMeta = useMatchRouteMeta();

  useEffect(() => {
    if (!currentRouteMeta) return;
    const exist = tabs.find((item) => item.key === currentRouteMeta.key);

    if (!exist) {
      setTabs((prev) => [
        ...prev,
        {
          ...currentRouteMeta,
          children: currentRouteMeta.outlet,
          timeStamp: getKey(),
        },
      ]);
    }

    setActiveTabRoutePath(currentRouteMeta.key);
    // eslint-disable-next-line
  }, [currentRouteMeta]);

  return {
    tabs,
    activeTabRoutePath,
    setTabs,
    setActiveTabRoutePath,
  };
}

function getKey() {
  return new Date().getTime().toString();
}

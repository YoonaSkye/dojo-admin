import { useAccessRoutes } from '@/store/access';
import { useTabPageActions } from '@/store/tabs';
import { setKeepaliveIns } from '@/utils/keepaliveIns';

import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';
import { Suspense, useEffect, useMemo } from 'react';
import {
  matchRoutes,
  RouteObject,
  useLocation,
  useOutlet,
} from 'react-router-dom';

// TODO: 要memo组件吗
function KeepLiveArea() {
  const location = useLocation();
  const outlet = useOutlet();
  const authRoutes = useAccessRoutes() as RouteObject[];

  const aliveRef = useKeepAliveRef();
  const { openTabPage } = useTabPageActions();

  const activeCacheKey = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  useEffect(() => {
    setKeepaliveIns(aliveRef.current);
    const absolutePath = location.pathname;
    const mathes = matchRoutes(authRoutes, { pathname: absolutePath });
    const route = mathes?.at(-1)?.route;

    if (route?.handle.hideTab) return;

    openTabPage({
      url: activeCacheKey,
      title: route?.handle?.title as string,
      icon: route?.handle?.icon,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCacheKey]);

  return (
    <KeepAlive
      transition
      aliveRef={aliveRef}
      activeCacheKey={activeCacheKey}
      max={18}
    >
      <Suspense fallback={<div>loading</div>}>{outlet}</Suspense>
    </KeepAlive>
  );
}

export default KeepLiveArea;

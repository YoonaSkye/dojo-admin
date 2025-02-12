import { useAccessRoutes } from '@/store/access';
import { useTabPageActions } from '@/store/tabs';
import { setKeepaliveIns } from '@/utils/keepaliveIns';
import { findRouteByAbsolutePath } from '@/utils/route';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';
import { memo, Suspense, useEffect, useMemo } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

// TODO: 要memo组件吗
function KeepLiveArea() {
  const location = useLocation();
  const outlet = useOutlet();
  const authRoutes = useAccessRoutes();

  const aliveRef = useKeepAliveRef();
  const { openTabPage } = useTabPageActions();
  //console.log('\x1b[36m%s\x1b[0m', 'location', location);

  const activeCacheKey = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  useEffect(() => {
    setKeepaliveIns(aliveRef.current);
    const absolutePath = location.pathname;
    //console.log('pathname', absolutePath);

    const route = findRouteByAbsolutePath(absolutePath, authRoutes);
    //console.log('keep route', route);

    openTabPage({
      url: activeCacheKey,
      title: route?.handle?.title as string,
      icon: route?.handle?.icon,
    });
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

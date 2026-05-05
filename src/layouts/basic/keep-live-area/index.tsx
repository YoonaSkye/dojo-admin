import { useUpdateEffect } from 'ahooks';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';
import { Suspense } from 'react';
import { useOutlet } from 'react-router-dom';

import { useRoute } from '@/router';
import { useTabbarStore } from '@/store/tabs';

function KeepLiveArea() {
  const route = useRoute();
  const outlet = useOutlet();
  const aliveRef = useKeepAliveRef();
  const reload = useTabbarStore((state) => state.renderRouteView);
  const cachedTabs = useTabbarStore((state) => state.cachedTabs);

  const activeCacheKey = route.fullPath;

  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reload]);

  return (
    <KeepAlive
      transition
      aliveRef={aliveRef}
      activeCacheKey={activeCacheKey}
      max={18}
      include={Array.from(cachedTabs)}
    >
      <Suspense>{!reload && outlet}</Suspense>
    </KeepAlive>
  );
}

export default KeepLiveArea;

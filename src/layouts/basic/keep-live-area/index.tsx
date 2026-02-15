import { useRoute } from '@/router';
import { useTabbarStore } from '@/store/tabs';

import { useUpdateEffect } from 'ahooks';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';
import { Suspense } from 'react';
import { useOutlet } from 'react-router-dom';

function KeepLiveArea() {
  const route = useRoute();
  const outlet = useOutlet();
  const aliveRef = useKeepAliveRef();
  const reload = useTabbarStore((state) => state.renderRouteView);
  // 把cacheRoutes 放到 useTabbarStore

  const activeCacheKey = route.fullPath;

  // TODO: 处理Keeplive 白名单 和 缓存名单移除，tabs数量上限问题？
  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reload]);

  return (
    <KeepAlive
      transition
      aliveRef={aliveRef}
      activeCacheKey={activeCacheKey}
      max={18}
      // include={cacheRoutes}
    >
      <Suspense fallback={<div>loading</div>}>{!reload && outlet}</Suspense>
    </KeepAlive>
  );
}

export default KeepLiveArea;

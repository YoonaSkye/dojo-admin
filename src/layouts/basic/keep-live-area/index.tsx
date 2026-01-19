import { useRoute } from '@/router';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';
import { Suspense } from 'react';
import { useOutlet } from 'react-router-dom';

// TODO: 要memo组件吗
function KeepLiveArea() {
  const route = useRoute();
  const outlet = useOutlet();
  const aliveRef = useKeepAliveRef();

  const activeCacheKey = route.fullPath;

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

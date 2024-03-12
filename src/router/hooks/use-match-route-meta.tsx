import { useMatches, useOutlet } from 'react-router-dom';
import { useFlattenedRoutes, useRouter } from '.';
import { useEffect, useState } from 'react';
import { RouteMeta } from '#/router';

/**
 * 返回当前匹配路由的Meta信息
 */
export function useMatchRouteMeta() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>();
  const matches = useMatches();
  // 获取扁平化后的路由数组
  const flattenedRoutes = useFlattenedRoutes();
  // 获取路由组件实例
  const children = useOutlet();
  const { push } = useRouter();

  useEffect(() => {
    const lastRoute = matches.at(-1);
    const currentRouteMeta = flattenedRoutes.find(
      (item) => item.key === lastRoute?.pathname
    );

    if (currentRouteMeta) {
      if (!currentRouteMeta.hideMenu) {
        currentRouteMeta.outlet = children;
        setMatchRouteMeta(currentRouteMeta);
      } else {
        push(HOMEPAGE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  return matchRouteMeta;
}

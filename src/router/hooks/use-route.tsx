import { useLocation, useMatches, useOutletContext } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';

import type { Route } from '@/types';

export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 *  获取 route meta
 */
export function useRoute<T = unknown>() {
  const matches = useMatches();
  const { hash, pathname, search } = useLocation();

  const routes = matches.at(-1) as Route<T>;
  const fullPath = pathname + search + hash;

  return useMemo(
    () =>
      ({
        ...routes,
        fullPath,
        hash,
        matched: matches.slice(1) as Route<T>[],
        pathname,
        redirect: null,
        search,
      }) as Route<T>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fullPath],
  );
}

export function usePreviousRoute() {
  return useOutletContext();
}

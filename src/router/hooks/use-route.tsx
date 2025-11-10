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

/** - get route meta */
export function useRoute<T = unknown>() {
  const matches = useMatches();

  const routes = matches.at(-1) as Route<T>;

  const { hash, pathname, search } = useLocation();

  const fullPath = pathname + search + hash;

  // const query = parseQuery(search);

  // const error = useRouteError() as Error | null;

  return useMemo(
    () =>
      ({
        ...routes,
        // error,
        fullPath,
        hash,
        matched: matches.slice(1) as Route<T>[],
        // params: getParams(routes.params, routes.id),
        pathname,
        // query,
        redirect: null,
        search,
      } as Route<T>),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fullPath]
  );
}

export function usePreviousRoute() {
  return useOutletContext();
}

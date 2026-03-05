import { useContext } from 'react';

import { RouterContext } from '../components/router-context';

import type { RouterContextType } from '../router';

export function useRouter(): RouterContextType {
  const navigator = useContext(RouterContext);

  if (!navigator) {
    throw new Error('RouterContext is not provided');
  }

  return navigator;
}

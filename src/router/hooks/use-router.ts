import { useContext } from 'react';

import type { RouterContextType } from '../router';
import { RouterContext } from '../components/router-context';

export function useRouter(): RouterContextType {
  const navigator = useContext(RouterContext);

  if (!navigator) {
    throw new Error('RouterContext is not provided');
  }

  return navigator;
}

// export function useRouter() {
//   const navigate = useNavigate();
//   const router = useMemo(
//     () => ({
//       back: () => navigate(-1),
//       forward: () => navigate(1),
//       reload: () => window.location.reload(),
//       push: (href: string) => navigate(href),
//       replace: (href: string) => navigate(href, { replace: true }),
//     }),
//     [navigate]
//   );

//   return router;
// }

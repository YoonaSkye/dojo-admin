import { useAccessToken } from '@/store/access';
import { useCallback, useEffect } from 'react';
import { useRouter } from '../hooks/use-router';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const accessToken = useAccessToken();
  const router = useRouter();

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check]);
  return children;
}

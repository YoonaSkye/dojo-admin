import { useUserToken } from '@/store/userStore';
import { useCallback, useEffect } from 'react';
import { useRouter } from '../hooks/use-router';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { accessToken } = useUserToken();
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

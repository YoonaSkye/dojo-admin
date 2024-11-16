import { useAccessToken } from '@/store/access';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const accessToken = useAccessToken();

  // BUG: 会首先进入dashboard 页面，然后再触发useEffect里的auth检查

  // access token检查
  if (!accessToken) return <Navigate to="/login" />;

  return children;
}

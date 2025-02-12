import { useAccessToken } from '@/store/access';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const accessToken = useAccessToken();

  // accessToken 检查
  if (!accessToken) return <Navigate to="/auth/login" />;

  return children;
}

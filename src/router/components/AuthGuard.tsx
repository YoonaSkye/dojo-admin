import Loading from '@/components/loading';
import { useUserDetail } from '@/hooks/use-user-detail';
import { useAccessToken } from '@/store/access';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
  const accessToken = useAccessToken();
  const { loading } = useUserDetail();

  // accessToken 检查
  if (!accessToken) return <Navigate to="/auth/login" />;
  // loading
  if (loading) return <Loading />;

  return <Outlet />;
}

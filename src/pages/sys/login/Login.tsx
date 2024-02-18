import { Layout, Typography } from 'antd';
import DojoImage from '@/assets/images/background/dojo.png';
import LoginForm from './LoginForm';
import { useUserToken } from '@/store/userStore';
import { Navigate } from 'react-router-dom';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
import { useTranslation } from 'react-i18next';

export default function Login() {
  const token = useUserToken();
  const { t } = useTranslation();

  // 判断用户是否有权限
  if (token.accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to={HOMEPAGE} replace />;
  }
  return (
    <Layout className="relative flex min-h-screen w-full flex-row">
      <div className="hidden md:flex grow flex-col items-center justify-center gap-[80px]">
        <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">
          Dojo Admin
        </div>
        <img
          className="max-w-[480px] xl:max-w-[560px] "
          src={DojoImage}
          alt="Dojo Image"
        />
        <Typography.Text className="flex flex-row gap-[16px] text-2xl">
          {/* 开箱即用的中后台管理系统 */}
          {t('sys.login.signInSecondTitle')}
        </Typography.Text>
      </div>
      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginForm />
      </div>
    </Layout>
  );
}

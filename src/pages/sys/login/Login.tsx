import { useAccessToken } from '@/store/access';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';

import logo from '@/assets/images/logo.png';
import Slogan from './Slogan';
import './login.css';

export default function Login() {
  const token = useAccessToken();
  const { t } = useTranslation();

  // 判断用户是否有权限
  if (token) {
    // 如果有授权，则跳转到首页
    return <Navigate to="/" />;
  }
  return (
    <div className="flex min-h-full flex-1 select-none overflow-hidden">
      {/* 工具栏 */}
      {/* 站点标志 */}
      <div className="absolute left-0 top-0 z-10 flex flex-1">
        <div className="text-foreground lg:text-foreground ml-4 mt-4 flex flex-1 items-center sm:left-6 sm:top-6">
          <img src={logo} alt="Vben admin" className="mr-2" width={42} />
          <p className="text-xl font-medium">Vben Admin</p>
        </div>
      </div>
      {/* left */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="bg-background-deep absolute inset-0 h-full w-full dark:bg-[#070709]">
          <div className="login-background absolute left-0 top-0 size-full"></div>
          <div className="flex flex-col items-center justify-center -enter-x mr-20 h-full">
            <Slogan />
            <div className="text-1xl text-foreground mt-6 font-sans lg:text-2xl">
              {/* 开箱即用的大型中后台管理系统 */}
              {t('authentication.pageTitle')}
            </div>
            <div className="dark:text-muted-foreground mt-2">
              {/* 工程化、高性能、跨组件库的前端模版 */}
              {t('authentication.pageDesc')}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 右侧认证面板 --> */}
      <div className="flex flex-col items-center justify-center dark:bg-background-deep bg-background relative px-6 py-10 lg:flex-initial lg:px-8 min-h-full w-[34%] flex-1">
        <div className="enter-x mt-6 w-full sm:mx-auto md:max-w-md">
          <div className="mb-7 sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
              {t('authentication.welcomeBack')} 👋🏻{' '}
            </h2>
            <p className="text-muted-foreground lg:text-md text-sm">
              <span className="text-muted-foreground">
                {t('authentication.loginSubtitle')}
              </span>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

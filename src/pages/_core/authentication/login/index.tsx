import logo from '@/assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import Slogan from './Slogan';
import AuthenticationToolbar from './toolbar';
import './login.css';

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-1 select-none overflow-hidden">
      {/* 工具栏 */}
      <AuthenticationToolbar />
      {/* 站点标志 */}
      <div className="absolute left-0 top-0 z-10 flex flex-1">
        <div className="ml-4 mt-4 flex flex-1 items-center text-foreground sm:left-6 sm:top-6 lg:text-foreground">
          <img src={logo} alt="Dojo admin" className="mr-2" width={42} />
          <p className="text-xl font-medium">Dojo Admin</p>
        </div>
      </div>
      {/* left */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-background-deep dark:bg-[#070709]">
          <div className="login-background absolute left-0 top-0 size-full"></div>
          <div className="-enter-x mr-20 flex h-full flex-col items-center justify-center">
            <Slogan />
            <div className="text-1xl mt-6 font-sans text-foreground lg:text-2xl">
              {/* 开箱即用的大型中后台管理系统 */}
              {t('authentication.pageTitle')}
            </div>
            <div className="mt-2 dark:text-muted-foreground">
              {/* 工程化、高性能、跨组件库的前端模版 */}
              {t('authentication.pageDesc')}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 右侧认证面板 --> */}
      <div className="relative flex min-h-full w-2/5 flex-1 flex-col items-center justify-center bg-background px-6 py-10 dark:bg-background-deep lg:flex-initial lg:px-8">
        <div className="enter-x mt-6 w-full sm:mx-auto md:max-w-md">
          <div className="mb-7 sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-3 text-3xl font-bold leading-9 tracking-tight text-foreground lg:text-4xl">
              {t('authentication.welcomeBack')} 👋🏻{' '}
            </h2>
            <p className="lg:text-md text-sm text-muted-foreground">
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

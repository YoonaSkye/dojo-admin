import { Typography } from 'antd';
import DojoImage from '@/assets/images/background/dojo.png';
import LoginForm from './LoginForm';
import { useUserToken } from '@/store/userStore';
import { Navigate } from 'react-router-dom';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
import { useTranslation } from 'react-i18next';
import LocalPicker from '@/components/local-picker';
import logo from '@/assets/images/logo.png';
import Slogan from './Slogan';
import './login.css';

export default function Login() {
  const token = useUserToken();
  const { t } = useTranslation();

  // 判断用户是否有权限
  if (token.accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to={HOMEPAGE} replace />;
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
              开箱即用的大型中后台管理系统
            </div>
            <div className="dark:text-muted-foreground mt-2">
              工程化、高性能、跨组件库的前端模版
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 右侧认证面板 --> */}
      <div className="flex flex-col items-center justify-center dark:bg-background-deep bg-background relative px-6 py-10 lg:flex-initial lg:px-8 min-h-full w-[34%] flex-1">
        <div className="enter-x mt-6 w-full sm:mx-auto md:max-w-md">
          <div className="mb-7 sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
              欢迎回来 👋🏻{' '}
            </h2>
            <p className="text-muted-foreground lg:text-md text-sm">
              <span className="text-muted-foreground">
                请输入您的帐户信息以开始管理您的项目
              </span>
            </p>
          </div>
          {/* <div className="relative mb-6">
            <input
              id="username"
              className="border-input bg-input-background ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-ring focus:border-primary flex h-10 w-full rounded-md border p-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              autoComplete="off"
              required
              placeholder="Vben"
            />
          </div>
          <div className="relative">
            <div className="relative mb-6">
              <input
                id="password"
                className="border-input bg-input-background ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-ring focus:border-primary flex h-10 w-full rounded-md border p-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                autoComplete="off"
                required
                placeholder="123456"
              />
            </div>
            <div className="hover:text-foreground text-foreground/60 absolute inset-y-0 right-0 top-3 flex cursor-pointer pr-3 text-lg leading-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-eye-off-icon size-4"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path>
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path>
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path>
                <path d="m2 2 20 20"></path>
              </svg>
            </div>
          </div>
          <div className="mb-6 mt-4 flex justify-between"></div> */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

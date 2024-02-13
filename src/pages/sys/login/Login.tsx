import { Layout, Typography } from 'antd';
import DojoImage from '@/assets/images/background/dojo.png';
import LoginForm from './LoginForm';

export default function Login() {
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
          开箱即用的中后台管理系统
        </Typography.Text>
      </div>
      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginForm />
      </div>
    </Layout>
  );
}

// m-auto flex flex-col !h-screen w-full max-w-[480px] px-[16px] lg:px-[64px]

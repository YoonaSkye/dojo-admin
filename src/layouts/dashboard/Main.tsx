import { useSettings } from '@/store/settingStore';
import { useCollapsed } from '@/store/userStore';
import { Content } from 'antd/es/layout/layout';
import { forwardRef } from 'react';
import { Outlet } from 'react-router-dom';
import MultiTabs from './multi-tabs';

type Props = {
  offsetTop?: boolean;
};

const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
  const collapsed = useCollapsed();
  const { multiTab } = useSettings();

  return (
    <Content
      ref={ref}
      className={`w-full h-full flex overflow-auto pt-[80px] ${
        collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-260px)]'
      }`}
    >
      <div className={`m-auto h-full w-full flex-grow sm:p-2`}>
        {multiTab ? <MultiTabs /> : <Outlet />}
      </div>
    </Content>
  );
});

export default Main;

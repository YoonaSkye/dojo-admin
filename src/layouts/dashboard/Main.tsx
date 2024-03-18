import { useSettings } from '@/store/settingStore';
import { useCollapsed } from '@/store/userStore';
import { Content } from 'antd/es/layout/layout';
import { forwardRef } from 'react';
import { Outlet } from 'react-router-dom';
import MultiTabs from './multi-tabs';

import { ThemeLayout } from '#/enum';

type Props = {
  offsetTop?: boolean;
};

const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
  const collapsed = useCollapsed();
  const { multiTab, themeLayout } = useSettings();

  const layout =
    themeLayout === ThemeLayout.Horizontal
      ? 'w-screen'
      : collapsed
      ? 'md:w-[calc(100%-90px)]'
      : 'md:w-[calc(100%-260px)]';
  const padding = themeLayout === ThemeLayout.Horizontal ? '' : 'pt-[80px]';

  return (
    <Content
      ref={ref}
      className={`w-full h-full flex overflow-auto ${padding} ${layout}`}
    >
      <div className={`m-auto h-full w-full flex-grow sm:p-2`}>
        {multiTab ? <MultiTabs /> : <Outlet />}
      </div>
    </Content>
  );
});

export default Main;

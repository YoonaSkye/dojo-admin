import { memo } from 'react';

import { IconButton } from '@/components/icon';
import Logo from '@/components/logo';
import { LangSwitch } from '@/features/lang';
import { Preferences } from '@/features/preferences';
import { ThemeModeSwitch, useTheme } from '@/features/theme';
import { Settings } from '@/icons';
import { cn } from '@/lib/utils';
import {
  useBreadCrumbSetting,
  useLayoutMode,
  usePreferencesStore,
} from '@/store/preferences';

import { HorizontalMenu } from '../menu';

import {
  AccountMenu,
  BreadCrumb,
  CommandMenu,
  FullScreenButton,
  Notification,
  RefreshButton,
} from './widgets';

interface LayoutHeaderProps {
  height: number;
}

const LayoutHeader = memo(({ height }: LayoutHeaderProps) => {
  const { isDark } = useTheme();
  const themeLayout = useLayoutMode();
  const { enable: breadcrumbVisible } = useBreadCrumbSetting();
  const themeSemiDarkHeader = usePreferencesStore(
    (state) => state.theme.semiDarkHeader,
  );

  // Menu 的主题色应该与 header 容器的深浅一致
  const menuTheme: 'dark' | 'light' =
    isDark || themeSemiDarkHeader ? 'dark' : 'light';

  const showHeaderLogo = themeLayout !== 'sidebar-nav';
  const showHeaderNav = themeLayout === 'header-nav';

  return (
    <header
      className={cn(
        themeSemiDarkHeader ? 'dark' : 'light',
        'top-0 flex w-full flex-[0_0_auto] items-center border-b border-border bg-header pl-2 transition-[margin-top] duration-200',
      )}
      style={{ height: `${height}px` }}
    >
      {/* 1. Logo 区域 */}
      {showHeaderLogo && (
        <div className="min-w-[224px]">
          <Logo />
        </div>
      )}

      {/* 2. 刷新页面按钮 */}
      <RefreshButton />

      {/* 3. 面包屑 */}
      <div className="flex-center hidden lg:block">
        {!showHeaderNav && breadcrumbVisible && <BreadCrumb />}
      </div>

      {/* 4. 水平布局 Header Nav */}
      <div className="flex h-full min-w-0 flex-1 items-center">
        {showHeaderNav && (
          <HorizontalMenu mode="horizontal" themeMode={menuTheme} />
        )}
      </div>

      {/* 5. 右侧功能区（保持原样） */}
      <div className="flex h-full min-w-0 flex-shrink-0 items-center">
        <div className="mr-1 sm:mr-4">{/* <CommandMenu /> */}</div>
        <div className="mr-1">
          <Preferences>
            <IconButton>
              <Settings className="size-4" />
            </IconButton>
          </Preferences>
        </div>
        <div className="mr-1 mt-[2px]">
          <ThemeModeSwitch />
        </div>
        <div className="mr-1">
          <LangSwitch />
        </div>
        <FullScreenButton className="mr-1" />
        <Notification />
        <AccountMenu />
      </div>
    </header>
  );
});

export default LayoutHeader;

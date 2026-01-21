import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { LangSwitch } from '@/features/lang';
import { Preferences } from '@/features/preferences';
import { ThemeModeSwitch, useTheme } from '@/features/theme';
import { Bell } from '@/icons';
import AccountMenu from '@/layouts/_common/account-menu';
import BreadCrumb from '@/layouts/_common/breadcrumb';
import CommandMenu from '@/layouts/_common/command-menu';
import FullScreenButton from '@/layouts/_common/full-screen';
import { useLayoutMode } from '@/store/preferences';
import { HorizontalMenu } from '../menu';

export default function LayoutHeader() {
  const themeLayout = useLayoutMode();
  const { isDark } = useTheme();

  return (
    <>
      {themeLayout !== 'vertical' && (
        <div style={{ minWidth: '224px' }}>
          <Logo />
        </div>
      )}

      {/* 面包屑 */}
      <div className="flex-center hidden lg:block">
        {themeLayout !== 'horizontal' && <BreadCrumb />}
      </div>

      {/* 水平布局 Header Nav */}
      <div className="flex h-full min-w-0 flex-1 items-center">
        {themeLayout === 'horizontal' && (
          <HorizontalMenu
            mode="horizontal"
            themeMode={isDark ? 'dark' : 'light'}
          />
        )}
      </div>

      {/* Right Setting */}
      <div className="flex h-full min-w-0 flex-shrink-0 items-center">
        {/* 搜索按钮 */}
        <div className="mr-1 sm:mr-4">
          <CommandMenu />
        </div>

        {/* theme设置按钮 */}
        <div className="mr-1">
          <Preferences />
        </div>

        {/* 亮暗模式切换按钮 */}
        <div className="mr-1 mt-[2px]">
          <ThemeModeSwitch />
        </div>

        {/* 国际化按钮 */}
        <div className="mr-1">
          <LangSwitch />
        </div>

        {/* 全屏按钮 */}
        <FullScreenButton className="mr-1" />

        {/* 消息通知 */}
        <Button variant="icon" size="icon" className="rounded-full mr-1">
          <Bell className="size-4" />
        </Button>

        {/* 个人信息按钮 */}
        <AccountMenu />
      </div>
    </>
  );
}

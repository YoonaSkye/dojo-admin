import { Button } from '@/components/ui/button';
import { Bell, Menu } from '@/icons';
import CommandMenu from '@/layouts//_common/command-menu';
import AccountMenu from '@/layouts/_common/account-menu';
import BreadCrumb from '@/layouts/_common/breadcrumb';
import LanguageToggle from '@/layouts/_common/language-toggle';
import Preference from '@/layouts/_common/preference';
import { useCollapsed, useSettingActions, useSettings } from '@/store/setting';
import { CSSProperties, useMemo } from 'react';
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';
import ModeToggle from '@/layouts/_common/mode-toggle';
import FullScreenButton from '@/layouts/_common/full-screen';
import { ThemeLayout } from '#/enum';
import HorizontalMenu from '../menu/horizontal-menu';
import Logo from '@/components/logo';

export default function LayoutHeader() {
  const { themeLayout } = useSettings();
  const collapsed = useCollapsed();
  const { setCollapsed } = useSettingActions();
  const isHeaderNav = useMemo(() => {
    return themeLayout === ThemeLayout.Horizontal;
  }, [themeLayout]);

  const headerStyle: CSSProperties = {
    height: '50px',
    left: isHeaderNav
      ? 'unset'
      : collapsed
      ? `{${NAV_COLLAPSED_WIDTH}}px`
      : `{${NAV_WIDTH}}`,
    position: 'fixed',
    top: '0px',
    width: isHeaderNav
      ? '100%'
      : collapsed
      ? `calc(100% - ${NAV_COLLAPSED_WIDTH}px)`
      : `calc(100% - ${NAV_WIDTH}px)`,
    zIndex: '200',
  };
  return (
    <div
      className="overflow-hidden transition-all duration-200"
      style={headerStyle}
    >
      <header
        className="light border-border bg-header top-0 flex w-full flex-[0_0_auto] items-center border-b transition-[margin-top] duration-200"
        style={{
          height: '50px',
          marginTop: '0px',
        }}
      >
        {isHeaderNav && (
          <div style={{ minWidth: '230px' }}>
            <Logo />
          </div>
        )}
        {!isHeaderNav && (
          <Button
            variant="icon"
            size="icon"
            className="my-0 ml-2 mr-1 rounded-md"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="size-4" />
          </Button>
        )}
        {/* 面包屑 */}
        <div className="flex-center hidden lg:block">
          {themeLayout === ThemeLayout.Vertical && <BreadCrumb />}
        </div>
        {/* Header Nav */}
        <div className="flex h-full min-w-0 flex-1 items-center">
          {themeLayout === ThemeLayout.Horizontal && <HorizontalMenu />}
        </div>
        <div className="flex h-full min-w-0 flex-shrink-0 items-center">
          {/* 搜索按钮 */}
          <div className="mr-1 sm:mr-4">
            <CommandMenu />
          </div>

          {/* theme设置按钮 */}
          <div className="mr-1">
            <Preference />
          </div>

          {/* 亮暗模式切换按钮 */}
          <div className="mr-1 mt-[2px]">
            <ModeToggle />
          </div>

          {/* 国际化按钮 */}
          <div className="mr-1">
            <LanguageToggle />
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
      </header>
    </div>
  );
}

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Bell, Maximize, Menu, MoonStar, Settings } from '@/icons';
import CommandMenu from '@/layouts//_common/command-menu';
import AccountMenu from '@/layouts/_common/account-menu';
import LanguageToggle from '@/layouts/_common/language-toggle';
import { useCollapsed, useSettingActions } from '@/store/setting';
import { CSSProperties } from 'react';
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';
import Preference from '@/layouts/_common/preference';

export default function LayoutHeader() {
  const collapsed = useCollapsed();
  const { setCollapsed } = useSettingActions();
  const headerStyle: CSSProperties = {
    height: '50px',
    left: collapsed ? `{${NAV_COLLAPSED_WIDTH}}px` : `{${NAV_WIDTH}}`,
    position: 'fixed',
    top: '0px',
    width: collapsed
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
        <Button
          variant="icon"
          size="icon"
          className="my-0 ml-2 mr-1 rounded-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="size-4" />
        </Button>
        {/* 面包屑 */}
        <div className="flex-center hidden lg:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">概览</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">分析页</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex h-full min-w-0 flex-1 items-center"></div>
        <div className="flex h-full min-w-0 flex-shrink-0 items-center">
          {/* 搜索按钮 */}
          <div className="mr-1 sm:mr-4">
            <CommandMenu />
          </div>

          {/* theme设置按钮 */}
          <div className="mr-2">
            {/* <Button variant="outline" size="icon" className="rounded-full mr-2">
              <Settings className="size-4" />
            </Button> */}
            <Preference />
          </div>

          {/* 亮暗模式切换按钮 */}
          <div className="mr-2 mt-[2px]">
            <Button
              variant="icon"
              size="icon"
              className="is-dark theme-toggle cursor-pointer border-none bg-none rounded-full"
            >
              <MoonStar className="size-4" />
            </Button>
          </div>

          {/* 国际化按钮 */}
          <div className="mr-2">
            <LanguageToggle />
          </div>

          {/* 全屏按钮 */}
          <Button variant="icon" size="icon" className="rounded-full mr-2">
            <Maximize className="size-4" />
          </Button>

          {/* 消息通知 */}
          <Button variant="icon" size="icon" className="rounded-full mr-2">
            <Bell className="size-4" />
          </Button>

          {/* 个人信息按钮 */}
          <AccountMenu />
        </div>
      </header>
    </div>
  );
}

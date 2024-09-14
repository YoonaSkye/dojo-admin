import LayoutMenu from './menu';
import { CSSProperties } from 'react';
import { Button } from '@/components/ui/button';
import { SearchIcon, MoonIcon, Languages, Maximize, Bell } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CommandMenu from '@/layouts//_common/command-menu';
import AccountMenu from '@/layouts/_common/account-menu';
import LanguageToggle from '@/layouts/_common/language-toggle';
import MultiTabs from '../dashboard/multi-tabs';

export default function DefaultLayout() {
  const asideStyle: CSSProperties = {
    // --scroll-shadow: "var(--sidebar)",
    flex: '0 0 230px',
    marginLeft: '0px',
    maxWidth: '230px',
    minWidth: '230px',
    width: '230px',
    height: 'calc(100% + 0px)',
    marginTop: '0px',
    paddingTop: '0px',
    zIndex: '201',
  };

  const headerStyle: CSSProperties = {
    // height: '88px',
    height: '50px',
    left: '230px',
    position: 'fixed',
    top: '0px',
    width: 'calc(100% - 230px)',
    zIndex: '200',
  };

  return (
    <div className="relative flex min-h-full w-full">
      <div
        className="dark h-full transition-all duration-150"
        style={{
          flex: '0 0 230px',
          marginLeft: '0px',
          maxWidth: '230px',
          minWidth: '230px',
          width: '230px',
        }}
      ></div>
      <aside
        className="dark bg-sidebar border-border border-r fixed left-0 top-0 h-full transition-all duration-150"
        style={asideStyle}
      >
        <LayoutMenu />
      </aside>
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in">
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
              variant="outline"
              size="icon"
              className="my-0 ml-2 mr-1 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-align-justify"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
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

              {/* 亮暗模式切换按钮 */}
              <div className="mr-2 mt-[2px]">
                <Button
                  variant="outline"
                  size="icon"
                  className="is-dark theme-toggle cursor-pointer border-none bg-none rounded-full"
                >
                  <MoonIcon className="size-4" />
                </Button>
              </div>

              {/* 国际化按钮 */}
              <div className="mr-2">
                <LanguageToggle />
              </div>

              {/* 全屏按钮 */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full mr-2"
              >
                <Maximize className="size-4" />
              </Button>

              {/* 消息通知 */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full mr-2"
              >
                <Bell className="size-4" />
              </Button>

              <AccountMenu />
            </div>
          </header>
          {/* <section
            className="border-border bg-background flex w-full border-b transition-all"
            style={{
              height: '38px',
              marginLeft: '0px',
              width: '100%',
            }}
          >
            <div className="flex h-full flex-1">
              <div className="pt-[3px] size-full flex-1"></div>
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
                <Bell className="size-4" />
              </div>
              <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
                <Bell className="size-4" />
              </div>
              <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
                <Bell className="size-4" />
              </div>
            </div>
          </section> */}
        </div>
        <main
          className="bg-background-deep transition-[margin-top] duration-200"
          style={{
            flex: '1 1 0%',
            padding: '0px',
            marginTop: '50px',
          }}
        >
          <MultiTabs />
        </main>
      </div>
    </div>
  );
}

import { ThemeLayout } from '#/enum';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Bell } from '@/icons';
import CommandMenu from '@/layouts//_common/command-menu';
import AccountMenu from '@/layouts/_common/account-menu';
import BreadCrumb from '@/layouts/_common/breadcrumb';
import FullScreenButton from '@/layouts/_common/full-screen';
import LanguageToggle from '@/layouts/_common/language-toggle';
import ModeToggle from '@/layouts/_common/mode-toggle';
import Preference from '@/layouts/_common/preference';
import { useLayoutMode } from '@/store/setting';
import HorizontalMenu from '../menu/horizontal-menu';

export default function LayoutHeader() {
  const themeLayout = useLayoutMode();
  // const isHeaderNav = useMemo(() => {
  //   return themeLayout === ThemeLayout.Horizontal;
  // }, [themeLayout]);

  return (
    <div className="relative flex items-center gap-2 my-0 mx-4 h-14">
      {<Logo />}

      {/* 面包屑 */}
      <div className="flex-center hidden lg:block">
        {themeLayout === ThemeLayout.Vertical && <BreadCrumb />}
      </div>

      {/* Mixed Layout Header nav */}
      {/* <div className="" style={{ flex: '1 1 0%' }}></div> */}

      {/* Horizontal Layout Header Nav */}
      <div className="flex h-full min-w-0 flex-1 items-center">
        {themeLayout === ThemeLayout.Horizontal && <HorizontalMenu />}
      </div>

      {/* Right Setting */}
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
    </div>
  );
}

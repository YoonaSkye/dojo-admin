import { IconButton, SvgIcon, Iconify } from '@/components/icon';
import { useCollapsed, useUserActions } from '@/store/userStore';
import SearchBar from '../_common/search-bar';
import LocalPicker from '@/components/local-picker';
import SettingButton from '../_common/setting-button';
import AccountDropdown from '../_common/account-dropdown';
import { useThemeToken } from '@/theme/hooks';
import { useSettings } from '@/store/settingStore';
import BreadCrumb from '../_common/bread-crumb';
import { ThemeLayout } from '#/enum';
import Logo from '@/components/logo';
import { Drawer } from 'antd';
import Nav from './Nav';
import { useState } from 'react';
import Color from 'color';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const collapsed = useCollapsed();
  const { setCollapsed } = useUserActions();
  const { colorBgElevated, colorPrimary } = useThemeToken();
  const { breadCrumb, themeLayout } = useSettings();

  const position =
    themeLayout === ThemeLayout.Horizontal ? 'relative' : 'fixed';
  const layout =
    themeLayout === ThemeLayout.Horizontal
      ? 'w-screen'
      : collapsed
      ? 'md:w-[calc(100%-90px)]'
      : 'md:w-[calc(100%-260px)]';
  const hoverColor = Color(colorPrimary).toString();

  return (
    <>
      <header
        className={`z-20 w-screen ${position} md:right-0 md:left-auto ${layout}`}
        style={{
          backgroundColor: Color(colorBgElevated).alpha(1).toString(),
        }}
      >
        {/* //TODO: 这里要考虑不同view point大小下的布局 web版: mobile版: */}
        <div
          className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
          style={{
            // height: offsetTop ? '64px' : '80px',
            height: '80px',
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-baseline">
            {themeLayout !== ThemeLayout.Horizontal ? (
              // 垂直布局 小屏幕布局
              <>
                <IconButton
                  className="h-10 w-10 md:hidden"
                  onClick={() => setDrawerOpen(true)}
                >
                  <SvgIcon icon="ic-menu" size="24" />
                </IconButton>
                <IconButton
                  className="h-10 w-10 rounded-none mr-2 hidden md:block"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <SvgIcon
                    icon="ic-menu"
                    size="24"
                    style={{ color: colorPrimary }}
                  />
                </IconButton>
              </>
            ) : (
              // 水平布局
              <Logo className="mr-2 text-xl" />
            )}

            <div className="hidden md:block">
              {breadCrumb ? <BreadCrumb /> : null}
            </div>
          </div>

          <div className="flex">
            {/* searchBar */}
            <SearchBar />
            {/* localPicker */}
            <LocalPicker />
            {/* github icon */}
            <IconButton
              onClick={() =>
                window.open('https://github.com/YoonaSkye/dojo-admin')
              }
            >
              <Iconify icon="mdi:github" size={24} />
            </IconButton>

            {/* setting button */}
            <SettingButton />
            {/* account button */}
            <AccountDropdown />
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        styles={{
          body: { padding: 0 },
        }}
        // headerStyle={{ display: 'none' }}
        // bodyStyle={{ padding: 0, overflow: 'hidden' }}
        width="auto"
      >
        <Nav closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}

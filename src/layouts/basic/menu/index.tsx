import { useSiderSetting } from '@/store/setting';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import './index.scss';
import { useAccessMenus } from '@/store/access';
import { useRouteToMenu } from '@/router/hooks';

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  closeSideBarDrawer?: () => void;
  mode?: 'vertical' | 'horizontal' | 'inline';
  themeMode: 'dark' | 'light';
};

export default function LayoutMenu({ mode, themeMode }: Props) {
  const { collapsed } = useSiderSetting();
  // const menus = useAccessMenus();
  const menus = useRouteToMenu();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const matches = useMatches();

  /** state */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);

  useEffect(() => {
    const openKeys = matches
      .filter((match) => match.pathname !== '/')
      .map((match) => match.pathname);

    setOpenKeys(openKeys);
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  // events
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys(keys);
    } else {
      setOpenKeys([]);
    }
  };
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <>
      {/* <div style={{ height: '50px' }}>
        <Logo />
      </div> */}

      {/* Sidebar menu */}

      {/* <ScrollArea
        style={{
          height: 'calc(100% - 92px)',
        }}
      > */}
      <div
        style={{
          flex: '1 1 0%',
          overflow: 'hidden auto',
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemBg: 'hsl(var(--menu))',
                darkItemColor: 'hsl(var(--foreground) / 80%)',
                darkItemHoverBg: 'hsl(var(--accent))',
                darkItemSelectedBg: 'hsl(var(--accent))',
                darkItemSelectedColor: 'hsl(var(--accent-foreground))',
                darkSubMenuItemBg: 'hsl(var(--menu))',
                itemBg: 'hsl(var(--menu))',
                itemColor: 'hsl(var(--foreground))',
                itemHoverBg: 'hsl(var(--accent))',
                itemSelectedBg: 'hsl(var(--primary) / 15%)',
                itemSelectedColor: 'hsl(var(--primary))',
                subMenuItemBg: 'hsl(var(--menu))',
                collapsedWidth: 59,
              },
            },
          }}
        >
          <Menu
            mode={mode}
            theme={themeMode}
            items={menus}
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={selectedKeys}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
            inlineCollapsed={collapsed}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '100%',
            }}
          />
        </ConfigProvider>
      </div>
      {/* </ScrollArea> */}
    </>
  );
}

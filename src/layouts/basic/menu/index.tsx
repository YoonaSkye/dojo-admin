import { useAccessMenus, useAccessRoutes } from '@/store/access';
import { useSiderSetting } from '@/store/preferences';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import {
  matchRoutes,
  RouteObject,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './index.scss';

type Props = {
  closeSideBarDrawer?: () => void;
  mode?: 'vertical' | 'horizontal' | 'inline';
  themeMode: 'dark' | 'light';
};

export default function LayoutMenu({ mode, themeMode }: Props) {
  const { collapsed } = useSiderSetting();
  const menus = useAccessMenus();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const authRoutes = useAccessRoutes() as RouteObject[];
  const matches = useMemo(
    () => matchRoutes(authRoutes, { pathname: pathname }),
    [pathname, authRoutes]
  );

  /** state */
  const [openKeys, setOpenKeys] = useState<string[] | undefined>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);

  useEffect(() => {
    const openKeys = matches?.map((match) => match.pathname);

    setOpenKeys(openKeys);
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  // events
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);
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
  );
}

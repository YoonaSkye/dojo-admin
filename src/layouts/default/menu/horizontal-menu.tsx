import { useRouteToMenu } from '@/router/hooks';
import { usePermission } from '@/router/hooks/use-permission';
import { menuFilter } from '@/router/utils';
import { useTheme } from '@/store/theme';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
// import './index.scss';

type MenuItem = Required<MenuProps>['items'][number];

export default function HorizontalMenu() {
  const themeMode = useTheme();
  const routeToMenuFn = useRouteToMenu();
  const permissionRoutes = usePermission();
  const { pathname } = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  /** state */
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const menus = routeToMenuFn(menuRoutes);
    setMenuList(menus);
  }, [permissionRoutes, routeToMenuFn]);

  useEffect(() => {
    const openKeys = matches
      .filter((match) => match.pathname !== '/')
      .map((match) => match.pathname);

    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };
  return (
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
          },
        },
      }}
    >
      <Menu
        mode="horizontal"
        className="w-full"
        theme={themeMode === 'light' ? 'light' : 'dark'}
        items={menuList}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        onClick={onClick}
      />
    </ConfigProvider>
  );
}

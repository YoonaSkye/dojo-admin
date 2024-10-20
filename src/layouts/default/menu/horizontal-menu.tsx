import { useRouteToMenu } from '@/router/hooks';
import { usePermission } from '@/router/hooks/use-permission';
import { menuFilter } from '@/router/utils';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
// import './index.scss';

type MenuItem = Required<MenuProps>['items'][number];

export default function HorizontalMenu() {
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
            darkItemBg: 'var(--sidebar)',
            darkSubMenuItemBg: 'var(--sidebar)',
            darkItemSelectedBg: '#2E3033',
            darkItemHoverBg: '#2E3033',
            darkItemSelectedColor: '#FAFAFA',
            darkItemColor: '#F2F2F2CC',
            collapsedWidth: 59,
          },
        },
      }}
    >
      <Menu
        mode="horizontal"
        className="w-full"
        theme="light"
        items={menuList}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        onClick={onClick}
      />
    </ConfigProvider>
  );
}

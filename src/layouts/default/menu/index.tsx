import { useState, useEffect } from 'react';
import { usePermissionRoutes, useRouteToMenu } from '@/router/hooks';
import { useCollapsed } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';
import { Link, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Menu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { menuFilter } from '@/router/utils';
import AppLogo from '@/assets/images/logo.png';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  closeSideBarDrawer?: () => void;
};

export default function LayoutMenu(props: Props) {
  const collapsed = useCollapsed();

  const routeToMenuFn = useRouteToMenu();
  const permissionRoutes = usePermissionRoutes();
  const { pathname } = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();
  const { colorBgElevated } = useThemeToken();

  /** state */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [menuList, setMenuList] = useState<ItemType[]>([]);

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const menus = routeToMenuFn(menuRoutes);
    setMenuList(menus);
  }, [permissionRoutes, routeToMenuFn]);

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
    props?.closeSideBarDrawer?.();
  };

  return (
    <>
      <div style={{ height: '50px' }}>
        <div className="light flex h-full items-center text-lg">
          <Link
            to="/"
            className="flex h-full items-center gap-2 overflow-hidden px-3 text-lg font-semibold leading-normal transition-all duration-500"
          >
            <img
              src={AppLogo}
              alt="Vben Admin"
              className="relative rounded-none bg-transparent"
              width={32}
            />
            <span className="text-primary dark:text-foreground truncate text-nowrap">
              Vben Admin
            </span>
          </Link>
        </div>
      </div>

      {/* Sidebar menu */}

      <ScrollArea
        style={{
          height: 'calc(100% - 92px)',
        }}
      >
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
              },
            },
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            items={menuList}
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={selectedKeys}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
            inlineCollapsed={collapsed}
          />
        </ConfigProvider>
      </ScrollArea>
      <div style={{ height: '42px' }}></div>
    </>
  );
}

import Logo from '@/components/logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouteToMenu } from '@/router/hooks';
import { usePermission } from '@/router/hooks/use-permission';
import { menuFilter } from '@/router/utils';
import { useCollapsed } from '@/store/setting';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import './index.scss';

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  closeSideBarDrawer?: () => void;
  mode?: 'vertical' | 'horizontal' | 'inline';
};

export default function LayoutMenu({ mode }: Props) {
  const collapsed = useCollapsed();

  const routeToMenuFn = useRouteToMenu();
  // const permissionRoutes = usePermissionRoutes();
  const permissionRoutes = usePermission();
  const { pathname } = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  /** state */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
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
    // props?.closeSideBarDrawer?.();
  };

  return (
    <>
      <div style={{ height: '50px' }}>
        <Logo />
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
                collapsedWidth: 59,
              },
            },
          }}
        >
          <Menu
            mode={mode}
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
    </>
  );
}

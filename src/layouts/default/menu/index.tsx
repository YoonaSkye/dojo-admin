import { useState, useEffect } from 'react';
import { usePermissionRoutes, useRouteToMenu } from '@/router/hooks';
import { useCollapsed } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { menuFilter } from '@/router/utils';
import Logo from '@/components/logo';

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
    // <
    //   className={`flex h-full flex-col overflow-x-hidden ${
    //     collapsed ? 'w-[90px]' : 'w-[260px]'
    //   }`}
    // >
    <>
      <div
        className="relative flex h-20 items-center justify-center py-4"
        style={{ background: colorBgElevated }}
      >
        <Logo />
      </div>

      {/* Sidebar menu */}

      <Menu
        mode="inline"
        items={menuList}
        className="h-full !border-none"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={{ background: colorBgElevated }}
        inlineCollapsed={collapsed}
      />
    </>
  );
}

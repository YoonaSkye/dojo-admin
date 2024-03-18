import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import { usePermissionRoutes } from '@/router/hooks/use-permission-routes';
import { useRouteToMenu } from '@/router/hooks/';
import { useCollapsed } from '@/store/userStore';
import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { menuFilter } from '@/router/utils';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useThemeToken } from '@/theme/hooks';

export default function Nav() {
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
  };

  return (
    <div
      className={`flex h-full flex-col overflow-x-hidden ${
        collapsed ? 'w-[90px]' : 'w-[260px]'
      }`}
    >
      <div className="relative flex h-20 items-center justify-center py-4">
        {collapsed ? (
          <Logo className="text-lg" />
        ) : (
          <Logo className="text-4xl" />
        )}
        {/* <button
          className="absolute right-0 top-7 z-50 hidden md:block h-6 w-6 translate-x-1/2"
          onClick={() => setCollapsed(!collapsed)}
          style={{
            color: colorTextBase,
            borderColor: colorTextBase,
            fontSize: 16,
          }}
        >
          {collapsed ? (
            <BsArrowRightCircle size={20} />
          ) : (
            <BsArrowLeftCircle size={20} />
          )}
        </button> */}
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
    </div>
  );
}

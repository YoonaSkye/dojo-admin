import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';
import { usePermissionRoutes } from '@/router/hooks/use-permission-routes';
import { useRouteToMenu } from '@/router/hooks/use-route-menu';
import { useCollapsed, useUserActions } from '@/store/userStore';
import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';
import { menuFilter } from '@/router/utils';

export default function Nav() {
  const collapsed = useCollapsed();
  const { setCollapsed } = useUserActions();
  const routeToMenuFn = useRouteToMenu();
  const permissionRoutes = usePermissionRoutes();

  /** state */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [menuList, setMenuList] = useState<ItemType[]>([]);
  const [menuMode, setMenuMode] = useState<MenuProps['mode']>('inline');

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const menus = routeToMenuFn(menuRoutes);
    setMenuList(menus);
    console.log(menus);
  }, [permissionRoutes, routeToMenuFn]);

  return (
    <div className={`flex flex-col ${collapsed ? 'w-[90px]' : 'w-[260px]'}`}>
      <div className="relative flex h-20 items-center justify-center py-4">
        {collapsed ? (
          <Logo classname="text-lg" />
        ) : (
          <Logo classname="text-4xl" />
        )}
        <button
          className="absolute right-0 top-7 z-50 hidden md:block h-6 w-6 translate-x-1/2"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <BsArrowRightCircle size={20} />
          ) : (
            <BsArrowLeftCircle size={20} />
          )}
        </button>
      </div>

      <Scrollbar
        style={{
          height: 'calc(100vh-70px)',
        }}
      >
        {/* Sidebar menu */}
        <Menu
          mode={menuMode}
          items={menuList}
          className="h-full !border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          // onOpenChange={onOpenChange}
          // onClick={onClick}
          // style={menuStyle}
          inlineCollapsed={collapsed}
        />
      </Scrollbar>
    </div>
  );
}

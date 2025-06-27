import { useRouteToMenu } from '@/router/hooks';
import { useTheme } from '@/store/theme';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

export default function HorizontalMenu() {
  const themeMode = useTheme();

  const { pathname } = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  /** state */
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const menus = useRouteToMenu();

  useEffect(() => {
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
            darkPopupBg: 'hsl(var(--menu))',
            horizontalItemBorderRadius: 10,
            horizontalLineHeight: '40px',
            itemPaddingInline: 10,
            itemMarginInline: 8,
          },
        },
      }}
    >
      <Menu
        mode="horizontal"
        className="w-full border-none"
        theme={themeMode === 'light' ? 'light' : 'dark'}
        items={menus}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        onClick={onClick}
      />
    </ConfigProvider>
  );
}

import { useRoute, useRouter } from '@/router';
import { useAccessMenus } from '@/store/access';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useMemo } from 'react';
import './index.scss';

type Props = {
  closeSideBarDrawer?: () => void;
  mode?: 'vertical' | 'horizontal' | 'inline';
  themeMode: 'dark' | 'light';
};

export default function HorizontalMenu({ mode, themeMode }: Props) {
  // 参考Tabs实现，封装一个use-menus hook来处理相关逻辑，
  const menus = useAccessMenus();

  const route = useRoute();
  const router = useRouter();

  /** state */
  const selectedKeys = useMemo(() => {
    return [route.pathname];
  }, [route]);

  // events
  const onClick: MenuProps['onClick'] = ({ key }) => {
    router.navigate(key);
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
              darkPopupBg: 'hsl(var(--menu))',
              horizontalItemBorderRadius: 6,
              horizontalLineHeight: 40,
              horizontalItemSelectedBg: 'hsl(var(--primary) / 15%)',
              horizontalItemSelectedColor: 'hsl(var(--primary))',
              horizontalItemHoverBg: 'hsl(var(--accent))',
              // horizontalItemHoverColor: 'hsl(var(--primary))',
            },
          },
        }}
      >
        <Menu
          mode={mode}
          theme={themeMode}
          items={menus}
          selectedKeys={selectedKeys}
          onClick={onClick}
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

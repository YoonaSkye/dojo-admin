import { useRoute, useRouter } from '@/router';
import { useAccessMenus } from '@/store/access';
import { useSiderSetting } from '@/store/preferences';
import { Route } from '@/types';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import './index.scss';

type Props = {
  closeSideBarDrawer?: () => void;
  mode?: 'vertical' | 'horizontal' | 'inline';
  themeMode: 'dark' | 'light';
};
interface LevelKeysProps {
  children?: LevelKeysProps[];
  key?: string;
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const getSelectedMenuKeyPath = (matches: Route['matched']) => {
  const result = matches.reduce((acc: string[], match, index) => {
    if (index < matches.length - 1 && match.pathname) {
      acc.push(match.pathname);
    }
    return acc;
  }, []);

  return result;
};

export default function VerticalMenu({ mode, themeMode }: Props) {
  const { collapsed } = useSiderSetting();
  // 参考Tabs实现，封装一个use-menus hook来处理相关逻辑，
  const menus = useAccessMenus();
  const levelKeys = useMemo(
    () => getLevelKeys(menus as LevelKeysProps[]),
    [menus],
  );

  const route = useRoute();
  const router = useRouter();

  /** state */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const selectedKeys = useMemo(() => {
    return [route.pathname];
  }, [route]);

  useEffect(() => {
    if (collapsed) return;
    setOpenKeys(getSelectedMenuKeyPath(route.matched));
  }, [route, collapsed]);

  // events
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    if (keys.includes('rc-menu-more')) {
      setOpenKeys(keys);
      return;
    }

    const currentOpenKey = keys.find((key) => !openKeys.includes(key));

    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = keys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setOpenKeys(
        keys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // // close
      setOpenKeys(keys);
    }
  };
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
              itemBg: 'hsl(var(--menu))',
              itemColor: 'hsl(var(--foreground))',
              itemHoverBg: 'hsl(var(--accent))',
              // itemHoverColor: 'hsl(var(--primary))',
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
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClick={onClick}
          onOpenChange={onOpenChange}
          inlineCollapsed={collapsed}
        />
      </ConfigProvider>
    </div>
  );
}

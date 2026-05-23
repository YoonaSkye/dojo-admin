import {
  useHeaderSetting,
  useLayoutMode,
  usePreferencesStore,
  useSiderSetting,
} from '@packages/stores';
import { CSSProperties } from 'react';

import Logo from '@/components/logo';
import { useTheme } from '@/features/theme';
import { cn } from '@/lib/utils';

import { VerticalMenu } from '../menu';

import { SidebarCollapseButton } from './widgets';

function calcMenuWidth(widthValue: number): CSSProperties {
  return {
    flex: `0 0 ${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue,
  };
}

export default function LayoutSidebar() {
  const layoutMode = useLayoutMode();
  const { isDark } = useTheme();

  const {
    collapsed,
    collapseWidth,
    width,
    enable: siderEnabled,
  } = useSiderSetting();
  const { height: headerHeight } = useHeaderSetting();
  const themeSemiDarkSidebar = usePreferencesStore(
    (state) => state.theme.semiDarkSidebar,
  );

  // Menu 的主题色应该与 sidebar 容器的深浅一致
  const menuTheme: 'dark' | 'light' =
    isDark || themeSemiDarkSidebar ? 'dark' : 'light';

  const currentWidth = collapsed ? collapseWidth : width;

  // 🌟 1：判定是否为混合通顶模式
  const isMixedNav = layoutMode === 'header-sidebar-nav';
  const isHeaderNav = layoutMode === 'header-nav';

  const sidebarEnableState = !isHeaderNav && siderEnabled;

  if (!sidebarEnableState) return null;

  // 🌟 2：如果是混合模式，侧边栏顶边距下移 headerHeight，高度相应减去顶栏高度
  const marginTop = isMixedNav ? headerHeight : 0;

  const hiddenSideStyle: CSSProperties = calcMenuWidth(currentWidth);

  const asideStyle: CSSProperties = {
    ...hiddenSideStyle,
    height: `calc(100% - ${marginTop}px)`,
    marginTop: `${marginTop}px`,
    zIndex: 202,
  };

  return (
    <>
      {/* 1. 文档流占位块 */}
      <div
        className={cn(
          'h-full transition-all duration-150',
          themeSemiDarkSidebar ? 'dark' : 'light',
        )}
        style={hiddenSideStyle}
      />

      {/* 2. 实际固定定位的侧边栏 */}
      <aside
        className={cn(
          'fixed left-0 top-0 border-r border-border bg-sidebar',
          themeSemiDarkSidebar ? 'dark' : 'light',
        )}
        style={asideStyle}
      >
        <div className="relative -mr-[1px] flex h-full flex-col border-r border-border py-0">
          {/* 只有常规侧边栏模式才在左侧显示 Logo */}
          {layoutMode === 'sidebar-nav' && (
            <div style={{ height: '49px' }}>
              <Logo />
            </div>
          )}

          <VerticalMenu mode="inline" themeMode={menuTheme} />
          <SidebarCollapseButton />
        </div>
      </aside>
    </>
  );
}

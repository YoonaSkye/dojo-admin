import { CSSProperties, useMemo } from 'react';

import type { AdminLayoutProps } from '@/layouts/types';
import { useLayoutMode } from '@/store/preferences';

import KeepLiveArea from '../keep-live-area';
import Tabs from '../tabs';

// constant config
export const NAV_WIDTH = 224;
export const NAV_COLLAPSED_WIDTH = 60;
export const Collapse_Height = 42;
export const HEADER_HEIGHT = 50;
export const TABBAR_HEIGHT = 38;

function calcMenuWidth(collapsed: boolean): CSSProperties {
  const widthValue = collapsed ? `${NAV_COLLAPSED_WIDTH}px` : `${NAV_WIDTH}px`;
  return {
    flex: `0 0 ${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue,
  };
}

export default function AdminLayout(props: AdminLayoutProps) {
  const {
    // mode = 'vertical',
    isMobile,
    Header,
    // headerClass,
    // headerHeight = 56,
    headerVisible = true,
    Sider,
    // siderClass,
    siderCollapse = false,
    // siderCollapsedWidth = 64,
    // siderWidth = 220,
    siderVisible = true,
    Footer,
    // Tab,
    // children,
  } = props;

  const layoutMode = useLayoutMode();

  // config visible
  const showHeader = Boolean(Header) && headerVisible;
  const showSider =
    !isMobile && Boolean(Sider) && siderVisible && layoutMode !== 'horizontal';
  const showTab = true;
  const showFooter = false;

  // computed styles
  const marginTop = layoutMode === 'header-sidebar-nav' ? HEADER_HEIGHT : 0;

  const menuWidthStyle = useMemo(() => calcMenuWidth(siderCollapse), [siderCollapse]);

  const headerStyle: CSSProperties = useMemo(() => ({ height: `${HEADER_HEIGHT}px` }), []);

  const headerWrapperStyle: CSSProperties = useMemo(() => {
    const leftOffset =
      layoutMode !== 'vertical'
        ? 0
        : siderCollapse
          ? NAV_COLLAPSED_WIDTH
          : NAV_WIDTH;
    const widthValue =
      layoutMode === 'vertical'
        ? `calc(100% - ${siderCollapse ? NAV_COLLAPSED_WIDTH : NAV_WIDTH}px)`
        : '100%';

    return {
      height: `${HEADER_HEIGHT + TABBAR_HEIGHT}px`,
      left: `${leftOffset}px`,
      position: 'fixed',
      top: 0,
      width: widthValue,
      zIndex: 20,
    };
  }, [layoutMode, siderCollapse]);

  const asideStyle: CSSProperties = useMemo(
    () => ({
      ...menuWidthStyle,
      height: `calc(100% - ${marginTop}px)`,
      marginTop: `${marginTop}px`,
    }),
    [menuWidthStyle, marginTop]
  );

  const mainStyle: CSSProperties = useMemo(() => ({}), []);

  return (
    <div className="relative flex h-full w-full">
      {/* Sider */}
      {showSider && (
        <>
          {/* TODO: 根据theme mode来改变 class='light' / 'dark' */}
          <div
            className="dark h-full transition-all duration-150"
            style={menuWidthStyle}
          ></div>
          <aside
            className="z-100 fixed left-0 top-0 border-r border-border bg-sidebar"
            style={asideStyle}
          >
            {/* layout-menu */}
            {Sider}
          </aside>
        </>
      )}

      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in">
        <div
          style={{
            height: `${HEADER_HEIGHT + TABBAR_HEIGHT}px`,
          }}
        />
        <div
          className="overflow-hidden transition-all duration-200"
          style={headerWrapperStyle}
        >
          {/* Header */}
          {showHeader && (
            <header
              className="top-0 flex w-full flex-[0_0_auto] items-center border-b border-border bg-header pl-2 transition-[margin-top] duration-200"
              style={headerStyle}
            >
              {/* header content */}
              {Header}
            </header>
          )}

          {/* Tab */}
          {showTab && (
            <Tabs
              siderCollapse={siderCollapse}
              navCollapsedWidth={NAV_COLLAPSED_WIDTH}
              navWidth={NAV_WIDTH}
            />
          )}
        </div>

        {/* Main Content */}
        <main
          className="flex w-full flex-1 flex-col overflow-auto bg-background-deep"
          style={mainStyle}
        >
          {/* TODO: 考虑重新封装一个ScrollWrapper,自定义滚动样式 */}
          <KeepLiveArea />
        </main>

        {/* Footer */}
        {showFooter && <footer>{Footer}</footer>}
      </div>
    </div>
  );
}

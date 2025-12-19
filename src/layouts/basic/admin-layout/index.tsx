import type { AdminLayoutProps } from '@/layouts/types';
import { useLayoutMode } from '@/store/setting';
import { CSSProperties } from 'react';
import KeepLiveArea from '../keep-live-area';
import Tabs from '../tabs';

// constant config
export const NAV_WIDTH = 224;
export const NAV_COLLAPSED_WIDTH = 60;
export const Collapse_Height = 42;
export const HEADER_HEIGHT = 50;
export const TABBAR_HEIGHT = 38;

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
  // const showMobileSider = isMobile && Boolean(Sider) && siderVisible;
  const showTab = true;
  const showFooter = false;

  // computed styles
  const marginTop = layoutMode === 'header-sidebar-nav' ? HEADER_HEIGHT : 0;

  const headerStyle: CSSProperties = {
    height: `${HEADER_HEIGHT}px`,
  };
  const headerWrapperStyle: CSSProperties = {
    height: `${HEADER_HEIGHT + TABBAR_HEIGHT}px`,
    left: `${
      layoutMode !== 'vertical'
        ? 0
        : siderCollapse
        ? NAV_COLLAPSED_WIDTH
        : NAV_WIDTH
    }px`,
    position: 'fixed',
    top: 0,
    width: `${
      layoutMode === 'vertical'
        ? `calc(100% - ${siderCollapse ? NAV_COLLAPSED_WIDTH : NAV_WIDTH}px)`
        : '100%'
    }`,
    zIndex: 20,
  };

  const hiddenSiderStyle: CSSProperties = {
    ...calcMenuWidthStyle(siderCollapse),
  };
  const asideStyle: CSSProperties = {
    ...calcMenuWidthStyle(siderCollapse),
    height: `calc(100% - ${marginTop}px)`,
    marginTop: `${marginTop}px`,
  };

  const mainStyle: CSSProperties = {
    // flex: '1 1 0%',
  };

  function calcMenuWidthStyle(collapsed: boolean) {
    const widthValue = collapsed
      ? `${NAV_COLLAPSED_WIDTH}px`
      : `${NAV_WIDTH}px`;

    return {
      flex: `0 0 ${widthValue}`,
      maxWidth: widthValue,
      minWidth: widthValue,
      width: widthValue,
    };
  }

  return (
    <div className="relative flex h-full w-full">
      {/* Sider */}
      {showSider && (
        <>
          {/* TODO: 根据theme mode来改变 class='light' / 'dark' */}
          <div
            className="dark h-full transition-all duration-150"
            style={hiddenSiderStyle}
          ></div>
          <aside
            className="fixed z-100 top-0 left-0 bg-sidebar border-border border-r"
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
              className="border-border bg-header top-0 flex w-full flex-[0_0_auto] items-center border-b pl-2 transition-[margin-top] duration-200"
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
          className="flex flex-col flex-1 w-full bg-background-deep overflow-auto"
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

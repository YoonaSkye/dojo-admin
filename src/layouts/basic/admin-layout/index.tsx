import type { AdminLayoutProps } from '@/layouts/types';
import { CSSProperties, useEffect } from 'react';
import KeepLiveArea from '../keep-live-area';
import Tabs from '../tabs';

// constant config
export const NAV_WIDTH = 256;
export const NAV_COLLAPSED_WIDTH = 64;
export const Collapse_Height = 42;
export const HEADER_HEIGHT = 56;

export default function AdminLayout(props: AdminLayoutProps) {
  const {
    mode = 'vertical',
    isMobile,
    Header,
    headerClass,
    headerHeight = 56,
    headerVisible = true,
    Sider,
    siderClass,
    siderCollapse = false,
    siderCollapsedWidth = 64,
    siderWidth = 220,
    siderVisible = true,
    Footer,
    Tab,
    children,
  } = props;

  // config visible
  const showHeader = Boolean(Header) && headerVisible;
  const showSider = !isMobile && Boolean(Sider) && siderVisible;
  const showMobileSider = isMobile && Boolean(Sider) && siderVisible;
  const showTab = true;
  const showFooter = false;

  // layout direction
  const isVertical = mode === 'vertical';
  const isHorizontal = mode === 'horizontal';
  //  const fixedHeaderAndTab = fixedTop || (isHorizontal && isWrapperScroll);

  // display
  const headerDisplay = true;
  const siderDisplay = true;
  const mobileSider = true;
  const footerDisplay = true;

  // computed styles
  const hiddenHeaderStyle: CSSProperties = {
    height: `${HEADER_HEIGHT}px`,
    lineHeight: `${HEADER_HEIGHT}px`,
    backgroundColor: 'transparent',
    // zIndex: 19,
  };
  const hiddenSiderStyle: CSSProperties = {
    ...calcMenuWidthStyle(siderCollapse),
    overflow: 'hidden',
    transition: '0.2s',
  };
  const asideStyle: CSSProperties = {
    ...calcMenuWidthStyle(siderCollapse),
  };

  const hiddenTabsStyle: CSSProperties = {
    height: '38px',
    width: '100%',
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

  useEffect(() => {}, []);

  return (
    <div className="relative flex min-h-full w-full overflow-hidden">
      {/* Sider */}
      {showSider && (
        <>
          {/* TODO: 根据theme mode来改变 class='light' / 'dark' */}
          <div className="dark" style={hiddenSiderStyle}></div>
          <aside
            className="fixed z-100 top-[56px] left-0 h-[calc(100%-56px)] bg-sidebar border-border border-r"
            style={asideStyle}
          >
            {/* layout-menu */}
            {Sider}
          </aside>
        </>
      )}

      <div className="flex flex-col w-full min-w-0 min-h-0 bg-transparent overflow-hidden">
        {/* Header */}
        {showHeader && (
          <>
            <header style={hiddenHeaderStyle}></header>
            <header
              className="fixed left-0 top-0 z-[100] w-full p-0 border-border border-b bg-header/60 backdrop-blur"
              style={{
                height: '56px',
                lineHeight: '56px',
                transition:
                  'background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
              }}
            >
              {/* header content */}
              {Header}
            </header>
          </>
        )}

        {/* Tab */}
        {showTab && (
          <>
            <div className="" style={hiddenTabsStyle}></div>
            <Tabs />
          </>
        )}

        {/* Main Content */}
        <main className="flex flex-col w-full h-[calc(-94px+100vh)] bg-transparent p-4 overflow-auto">
          {/* TODO: 考虑重新封装一个ScrollWrapper,自定义滚动样式 */}
          <KeepLiveArea />
        </main>

        {/* Footer */}
        {showFooter && <footer>{Footer}</footer>}
      </div>
    </div>
  );
}

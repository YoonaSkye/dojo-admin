import {
  useHeaderSetting,
  useLayoutMode,
  useSiderSetting,
  useTabSetting,
} from '@packages/stores';
import { CSSProperties, useMemo } from 'react';


import Tabs from '../tabs';

import LayoutHeader from './layout-header';

export default function LayoutHeaderWrapper() {
  const layoutMode = useLayoutMode();
  const { enable: headerVisible, height: headerHeight } = useHeaderSetting();
  const { enable: tabVisible, height: tabHeight } = useTabSetting();
  const {
    enable: siderVisible,
    collapsed: siderCollapse,
    collapseWidth: siderCollapseWidth,
    width: siderWidth,
  } = useSiderSetting();

  // 🌟 1. 只有常规 sidebar-nav 模式，整个顶栏大容器才需要向右偏移并缩减宽度
  const isSidebarNav = layoutMode === 'sidebar-nav';
  // 🌟 2. 仅在混合通顶模式 'header-sidebar-nav' 下，由于父容器是 100% 全屏，Tabs 需要单独切出左边距和缩减宽度
  const isMixedNav = layoutMode === 'header-sidebar-nav';
  const effectiveWidth = siderCollapse ? siderCollapseWidth : siderWidth;

  const leftOffset = siderVisible && isSidebarNav ? effectiveWidth : 0;
  const widthValue =
    siderVisible && isSidebarNav ? `calc(100% - ${effectiveWidth}px)` : '100%';

  const headerWrapperHeight =
    (headerVisible ? headerHeight : 0) + (tabVisible ? tabHeight : 0);

  const wrapperStyle: CSSProperties = {
    height: `${headerWrapperHeight}px`,
    left: `${leftOffset}px`,
    width: widthValue,
    position: 'fixed',
    top: 0,
    zIndex: 20,
  };

  const tabbarStyle: CSSProperties = useMemo(() => {
    return {
      height: '38px',
      marginLeft: siderVisible && isMixedNav ? `${effectiveWidth}px` : '0px',
      width:
        siderVisible && isMixedNav
          ? `calc(100% - ${effectiveWidth}px)`
          : '100%',
    };
  }, [isMixedNav, effectiveWidth, siderVisible]);

  return (
    <>
      <div style={{ height: `${headerWrapperHeight}px` }} />
      <div
        className="overflow-hidden bg-background transition-all duration-200"
        style={wrapperStyle}
      >
        {headerVisible && <LayoutHeader height={headerHeight} />}

        {tabVisible && <Tabs style={tabbarStyle} />}
      </div>
    </>
  );
}

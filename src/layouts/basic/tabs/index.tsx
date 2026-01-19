import type { CSSProperties } from 'react';
// Components
import { useLayoutMode } from '@/store/preferences';
import TabsView from './tabs-view';
import { useTabbar } from './use-tabbar';

type TabsProps = {
  siderCollapse?: boolean;
  navCollapsedWidth?: number;
  navWidth?: number;
};

function Tabs({ siderCollapse, navCollapsedWidth, navWidth }: TabsProps) {
  const {
    createContextMenus,
    currentActive,
    currentTabs,
    handleClick,
    handleClose,
  } = useTabbar();

  const layoutMode = useLayoutMode();

  const tabbarStyle: CSSProperties = {
    height: '38px',
    marginLeft: `${
      layoutMode === 'header-sidebar-nav'
        ? siderCollapse
          ? navCollapsedWidth
          : navWidth
        : 0
    }px`,
    width: `${
      layoutMode === 'header-sidebar-nav'
        ? `calc(100% - ${siderCollapse ? navCollapsedWidth : navWidth}px)`
        : '100%'
    }`,
  };

  return (
    <div
      className="border-border bg-background flex w-full border-b transition-all"
      style={tabbarStyle}
    >
      <TabsView
        active={currentActive}
        tabs={currentTabs}
        contextMenus={createContextMenus}
        onActiveChange={handleClick}
        onClose={handleClose}
      />
      <div className="flex-center h-full"></div>
    </div>
  );
}

export default Tabs;

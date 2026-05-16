import { memo, type CSSProperties } from 'react';

import TabsView from './tabs-view';
import { useTabbar } from './use-tabbar';

type TabsProps = {
  style?: CSSProperties;
};

const Tabs = memo(({ style }: TabsProps) => {
  const {
    createContextMenus,
    currentActive,
    currentTabs,
    handleClick,
    handleClose,
  } = useTabbar();

  return (
    <div
      className="flex w-full border-b border-border bg-background transition-all"
      style={style}
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
});

Tabs.displayName = 'Tabs';

export default Tabs;

import { useCollapsed } from '@/store/setting';
import { CSSProperties } from 'react';
import LayoutMenu from '../menu';
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH, Collapse_Height } from './config';
import SidebarCollapseButton from '../widgets/sidebar-collapse-button';

export default function LayoutSidebar() {
  const collapsed = useCollapsed();
  const hiddenSideStyle: CSSProperties = calcMenuWidthStyle(collapsed);
  const asideStyle: CSSProperties = {
    // '--scroll-shadow': 'var(--sidebar)',
    ...calcMenuWidthStyle(collapsed),
    height: 'calc(100% + 0px)',
    marginTop: '0px',
    paddingTop: '0px',
    zIndex: '201',
  };

  const collapseStyle: CSSProperties = {
    height: `${Collapse_Height}px`,
  };

  function calcMenuWidthStyle(collapsed: boolean) {
    const widthValue = collapsed
      ? `${NAV_COLLAPSED_WIDTH}px`
      : `${NAV_WIDTH}px`;

    return {
      // ...(widthValue === '0px' ? { overflow: 'hidden' } : {}),
      flex: `0 0 ${widthValue}`,
      // marginLeft: show ? 0 : `-${widthValue}`,
      marginLeft: 0,
      maxWidth: widthValue,
      minWidth: widthValue,
      width: widthValue,
    };
  }

  return (
    <>
      <div
        className="dark h-full transition-all duration-150"
        style={hiddenSideStyle}
      ></div>
      <aside
        className="dark bg-sidebar border-border border-r fixed left-0 top-0 h-full transition-all duration-150"
        style={asideStyle}
      >
        <LayoutMenu mode="inline" />
        <div style={collapseStyle}></div>
        <SidebarCollapseButton />
      </aside>
    </>
  );
}

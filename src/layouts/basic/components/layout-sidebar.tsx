import Logo from '@/components/logo';
import LayoutMenu from '../menu';
import SidebarCollapseButton from '../widgets/sidebar-collapse-button';
import { useLayoutMode } from '@/store/setting';

export default function LayoutSidebar() {
  const layoutMode = useLayoutMode();
  return (
    <div className="relative flex flex-col h-full py-0 border-border border-r -mr-[1px]">
      {layoutMode === 'vertical' && (
        <div style={{ height: `${49}px` }}>
          <Logo />
        </div>
      )}
      <LayoutMenu mode="inline" themeMode={'light'} />
      <SidebarCollapseButton />
    </div>
  );
}

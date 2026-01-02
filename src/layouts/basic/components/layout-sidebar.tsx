import Logo from '@/components/logo';
import LayoutMenu from '../menu';
import SidebarCollapseButton from '../widgets/sidebar-collapse-button';
import { useLayoutMode } from '@/store/preferences';
import { useTheme } from '@/features/theme';

export default function LayoutSidebar() {
  const layoutMode = useLayoutMode();
  const { isDark } = useTheme();
  return (
    <div className="relative flex flex-col h-full py-0 border-border border-r -mr-[1px]">
      {layoutMode === 'vertical' && (
        <div style={{ height: `${49}px` }}>
          <Logo />
        </div>
      )}
      <LayoutMenu mode="inline" themeMode={isDark ? 'dark' : 'light'} />
      <SidebarCollapseButton />
    </div>
  );
}

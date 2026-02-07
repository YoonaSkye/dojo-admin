import Logo from '@/components/logo';
import { VerticalMenu } from '../menu';
import SidebarCollapseButton from '../widgets/sidebar-collapse-button';
import { useLayoutMode } from '@/store/preferences';
import { useTheme } from '@/features/theme';

export default function LayoutSidebar() {
  const layoutMode = useLayoutMode();
  const { isDark } = useTheme();
  return (
    <div className="relative -mr-[1px] flex h-full flex-col border-r border-border py-0">
      {layoutMode === 'vertical' && (
        <div style={{ height: `${49}px` }}>
          <Logo />
        </div>
      )}
      <VerticalMenu mode="inline" themeMode={isDark ? 'dark' : 'light'} />
      <SidebarCollapseButton />
    </div>
  );
}

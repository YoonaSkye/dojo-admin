import LayoutMenu from '../menu';
import SidebarCollapseButton from '../widgets/sidebar-collapse-button';
import { useTheme } from '@/store/theme';

export default function LayoutSidebar() {
  const themeMode = useTheme();

  return (
    <div className="relative flex flex-col h-full px-2 py-0 border-border border-r -mr-[1px]">
      <LayoutMenu mode="inline" themeMode={'light'} />
      <SidebarCollapseButton />
    </div>
  );
}

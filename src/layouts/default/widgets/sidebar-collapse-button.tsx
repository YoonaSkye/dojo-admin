import { ChevronsLeft, ChevronsRight } from '@/icons';
import { useCollapsed, useSettingActions } from '@/store/setting';

export default function SidebarCollapseButton() {
  const { setCollapsed } = useSettingActions();
  const collapsed = useCollapsed();

  return (
    <div
      className="flex-center hover:text-foreground text-foreground/60 hover:bg-accent-hover bg-accent absolute bottom-2 left-3 z-10 cursor-pointer rounded-sm p-1"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? (
        <ChevronsRight className="size-4" />
      ) : (
        <ChevronsLeft className="size-4" />
      )}
    </div>
  );
}

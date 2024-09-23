import { ChevronsLeft, ChevronsRight } from '@/icons';
import { useCollapsed, useUserActions } from '@/store/userStore';

export default function SidebarCollapseButton() {
  const { setCollapsed } = useUserActions();
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

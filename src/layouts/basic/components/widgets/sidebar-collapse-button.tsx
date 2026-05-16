import { ChevronsLeft, ChevronsRight } from '@/icons';
import { usePreferencesStore, useSiderSetting } from '@/store/preferences';

export default function SidebarCollapseButton() {
  const setSider = usePreferencesStore((state) => state.setSider);
  const { collapsed } = useSiderSetting();

  return (
    <div
      className="flex-center absolute bottom-2 left-3 z-10 cursor-pointer rounded-sm bg-accent p-1 text-foreground/60 hover:bg-accent-hover hover:text-foreground"
      onClick={() => setSider({ collapsed: !collapsed })}
    >
      {collapsed ? (
        <ChevronsRight className="size-4" />
      ) : (
        <ChevronsLeft className="size-4" />
      )}
    </div>
  );
}

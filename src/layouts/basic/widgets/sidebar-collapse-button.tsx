import { ChevronsLeft, ChevronsRight } from '@/icons';
import { useSettingActions, useSiderSetting } from '@/store/setting';

export default function SidebarCollapseButton() {
  const { setSider } = useSettingActions();
  const { collapsed } = useSiderSetting();

  return (
    <div
      // className="absolute top-[18px] right-[-13px] z-[101] flex-center hover:text-foreground text-foreground/60 hover:bg-accent-hover bg-accent cursor-pointer rounded-full p-1"
      className="flex-center hover:text-foreground text-foreground/60 hover:bg-accent-hover bg-accent absolute bottom-2 left-3 z-10 cursor-pointer rounded-sm p-1"
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

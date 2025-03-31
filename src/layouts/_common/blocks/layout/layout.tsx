import { ThemeLayout } from '@/types';
import { CircleHelp } from '@/icons';
import { useSettingActions } from '@/store/setting';
import clsx from 'clsx';
import { HeaderNav, SidebarNav } from '../../icons';

// type LayoutType = 'header-nav' | 'sidebar-nav';
type LayoutType = ThemeLayout;

interface PresetItem {
  name: string;
  tip: string;
  type: LayoutType;
}

const components: Record<LayoutType, React.FC> = {
  horizontal: HeaderNav,
  vertical: SidebarNav,
};

const PRESET: PresetItem[] = [
  {
    name: '垂直',
    tip: '侧边垂直菜单模式',
    type: ThemeLayout.Vertical,
  },
  {
    name: '水平',
    tip: '水平菜单模式，菜单全部显示在顶部',
    type: ThemeLayout.Horizontal,
  },
];

export default function Layout() {
  const { setLayoutMode } = useSettingActions();

  return (
    <div className="flex w-full justify-center gap-10">
      {PRESET.map((preset) => {
        const Component = components[preset.type];
        return (
          <div
            key={preset.name}
            className="flex w-[100px] cursor-pointer flex-col"
            onClick={() => setLayoutMode(preset.type)}
          >
            <div className={clsx('outline-box flex-center')}>
              <Component />
            </div>
            <div className="text-muted-foreground flex-center hover:text-foreground mt-2 text-center text-xs">
              {preset.name}
              <CircleHelp className="ml-1 size-3 cursor-help" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

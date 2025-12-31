import { CircleHelp } from '@/icons';
import { useLayoutMode, useSettingActions } from '@/store/preferences';
import type { LayoutType } from '@/types';
import clsx from 'clsx';
import { useRef } from 'react';
import { HeaderNav, HeaderSidebarNav, SidebarNav } from '../../icons';

interface PresetItem {
  name: string;
  tip: string;
  type: LayoutType;
}

const components: Record<LayoutType, React.FC> = {
  horizontal: HeaderNav,
  vertical: SidebarNav,
  'header-sidebar-nav': HeaderSidebarNav,
};

const PRESET: PresetItem[] = [
  {
    name: '垂直',
    tip: '侧边垂直菜单模式',
    type: 'vertical',
  },
  {
    name: '水平',
    tip: '水平菜单模式，菜单全部显示在顶部',
    type: 'horizontal',
  },
  {
    name: '侧边导航',
    tip: '顶部通栏，侧边导航模式',
    type: 'header-sidebar-nav',
  },
];

export function Layout() {
  const layoutMode = useLayoutMode();
  const { setLayoutMode } = useSettingActions();

  const modelValue = useRef<LayoutType>(layoutMode);

  const handleSelect = (type: LayoutType) => {
    modelValue.current = type;
    setLayoutMode(type);
  };

  return (
    <div className="flex w-full justify-center gap-5">
      {PRESET.map((preset) => {
        const Component = components[preset.type];
        return (
          <div
            key={preset.name}
            className="flex w-[100px] cursor-pointer flex-col"
            onClick={() => handleSelect(preset.type)}
          >
            <div
              className={clsx(
                preset.type === modelValue.current && 'outline-box-active',
                'outline-box flex-center'
              )}
            >
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

import {
  useSetThemeMode,
  useThemeMode,
  type ThemeModeType,
} from '@/store/theme';

import { Iconify } from '@/components/icon';
import SwitchItem from '@/layouts/_common/blocks/switch-item';

import clsx from 'clsx';

const THEME_PRESET: Array<{
  icon: string;
  name: ThemeModeType;
}> = [
  {
    icon: 'material-symbols:sunny',
    name: 'light',
  },
  {
    icon: 'material-symbols:nightlight-rounded',
    name: 'dark',
  },
  {
    icon: 'material-symbols:hdr-auto',
    name: 'system',
  },
];
export default function ThemeModeSegmented() {
  const themeValue = useThemeMode();
  const setTheme = useSetThemeMode();

  const nameView = (name: string) => {
    switch (name) {
      case 'light': {
        // return t('preferences.theme.light');
        return '浅色';
      }
      case 'dark': {
        // return t('preferences.theme.dark');
        return '深色';
      }
      case 'system': {
        // return t('preferences.followSystem');
        return '跟随系统';
      }
    }
  };

  return (
    <div className="flex w-full flex-wrap justify-between">
      {THEME_PRESET.map((theme) => (
        <div
          className="flex cursor-pointer flex-col"
          key={theme.name}
          onClick={() => {
            setTheme(theme.name);
          }}
        >
          <div
            className={clsx(
              theme.name === themeValue && 'outline-box-active',
              'outline-box flex-center py-4'
            )}
          >
            <Iconify icon={theme.icon} className="mx-9 size-5" />
          </div>
          <div className="text-muted-foreground mt-2 text-center text-xs">
            {nameView(theme.name)}
          </div>
        </div>
      ))}
      <SwitchItem className="mt-6" title="深色侧边栏" />
      <SwitchItem title="深色顶栏" />
    </div>
  );
}

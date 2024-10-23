import { MoonStar, Sun, SunMoon } from '@/icons';
import { useSetTheme, useTheme, type Theme } from '@/store/theme';
import clsx from 'clsx';
import type { LucideProps } from 'lucide-react';
import { useRef } from 'react';
import SwitchItem from '../switch-item';

type ThemeModeType = Theme;

const THEME_PRESET: Array<{
  icon: React.FC<LucideProps>;
  name: ThemeModeType;
}> = [
  {
    icon: Sun,
    name: 'light',
  },
  {
    icon: MoonStar,
    name: 'dark',
  },
  {
    icon: SunMoon,
    name: 'auto',
  },
];
export default function Theme() {
  const themeValue = useTheme();
  const setTheme = useSetTheme();
  const modelValue = useRef<ThemeModeType>(themeValue);

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
      case 'auto': {
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
            // setModelValue(theme.name);
            modelValue.current = theme.name;
            setTheme(theme.name);
          }}
        >
          <div
            className={clsx(
              theme.name === modelValue.current && 'outline-box-active',
              'outline-box flex-center py-4'
            )}
          >
            <theme.icon className="mx-9 size-5" />
          </div>
          <div className="text-muted-foreground mt-2 text-center text-xs">
            {nameView(theme.name)}
          </div>
        </div>
      ))}
      <SwitchItem className="mt-6" title="深色侧边栏" />
      {/* <SwitchItem title="深色顶栏" /> */}
    </div>
  );
}

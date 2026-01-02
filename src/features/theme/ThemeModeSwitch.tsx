import { type MouseEvent } from 'react';

import { Iconify } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useSettingActions, useThemeMode } from '@/store/preferences';
import { icons, useTheme } from './theme-context';

type ThemeModeType = 'dark' | 'light' | 'system';
const ThemeModes: ThemeModeType[] = ['light', 'dark', 'system'];

const ThemeModeSwitch = () => {
  const themeMode = useThemeMode();
  const { setTheme } = useSettingActions();
  const { isDark } = useTheme();

  function toggleThemeMode() {
    const index = ThemeModes.findIndex((item) => item === themeMode);
    const nextIndex = index === ThemeModes.length - 1 ? 0 : index + 1;
    console.log('theme mode', ThemeModes[nextIndex]);

    setTheme({ mode: ThemeModes[nextIndex] });
  }

  const toggleDark = (event: MouseEvent<HTMLButtonElement>) => {
    const isAppearanceTransition = !window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!isAppearanceTransition) {
      toggleThemeMode();
      return;
    }

    const transition = document.startViewTransition(() => {
      toggleThemeMode();
    });

    if (themeMode === 'system') return;

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <Button
      variant="icon"
      size="icon"
      className="is-dark theme-toggle cursor-pointer border-none bg-none rounded-full"
      onClick={toggleDark}
    >
      <Iconify icon={icons[themeMode]} />
    </Button>
  );
};

export default ThemeModeSwitch;

import { type MouseEvent } from 'react';

import { Iconify } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { usePreferencesStore } from '@/store/preferences';
import type { ThemeModeType } from '@/types';

import { THEME_MODE_ICONS, useTheme } from './theme-context';

const THEME_MODES: ThemeModeType[] = ['light', 'dark', 'system'];

const ThemeModeSwitch = () => {
  const { mode: themeMode, isDark } = useTheme();
  const setTheme = usePreferencesStore((state) => state.setTheme);

  function toggleThemeMode() {
    const index = THEME_MODES.findIndex((item) => item === themeMode);
    const nextIndex = index === THEME_MODES.length - 1 ? 0 : index + 1;

    setTheme({ mode: THEME_MODES[nextIndex] });
  }

  const toggleDark = (event: MouseEvent<HTMLButtonElement>) => {
    const isAppearanceTransition = !window.matchMedia(
      '(prefers-reduced-motion: reduce)',
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
      Math.max(y, innerHeight - y),
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
        },
      );
    });
  };

  return (
    <Button
      variant="icon"
      size="icon"
      className="rounded-full"
      onClick={toggleDark}
    >
      <Iconify icon={THEME_MODE_ICONS[themeMode]} />
    </Button>
  );
};

export default ThemeModeSwitch;

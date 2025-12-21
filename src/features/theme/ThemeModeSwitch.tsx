import { useThemeStore } from '@/store/theme';
import { type MouseEvent } from 'react';

import { Iconify } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { icons, useTheme } from './theme-context';

const ThemeModeSwitch = () => {
  const themeMode = useThemeStore((state) => state.themeMode);
  const toggleThemeMode = useThemeStore((state) => state.toggleThemeMode);
  const { darkMode } = useTheme();

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
          clipPath: darkMode ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: darkMode
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

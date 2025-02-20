import { type MouseEvent } from 'react';
import { useTheme, useThemeStore } from '@/store/theme';

import { Button } from '@/components/ui/button';
import darkToggle from '@/lib/darkToggle';
import { Iconify } from '@/components/icon';

export default function ModeToggle() {
  const themeMode = useTheme();
  const setTheme = useThemeStore((state) => state.setTheme);
  const isDark = themeMode === 'dark';

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { clientX: x, clientY: y } = event;

    darkToggle({
      isDark,
      setTheme,
      coordinates: { x, y },
    });
  };

  return (
    <Button
      variant="icon"
      size="icon"
      className="is-dark theme-toggle cursor-pointer border-none bg-none rounded-full"
      onClick={onClick}
    >
      {isDark ? (
        <Iconify icon="material-symbols:nightlight-rounded" />
      ) : (
        <Iconify icon="material-symbols:sunny-rounded" />
      )}
    </Button>
  );
}

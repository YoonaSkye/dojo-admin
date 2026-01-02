import { useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { ThemeContext, ThemeMode, ThemeType } from './theme-context';

import { useThemeMode } from '@/store/preferences';

const useCurrentTheme = () => {
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<ThemeType>(() => {
    return matchMedia?.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
  });

  useEffect(() => {
    const onThemeChange: MediaQueryList['onchange'] = (event) => {
      if (event.matches) {
        setTheme(ThemeMode.DARK);
      } else {
        setTheme(ThemeMode.LIGHT);
      }
    };

    matchMedia?.addEventListener('change', onThemeChange);

    return () => {
      matchMedia?.removeEventListener('change', onThemeChange);
    };
  }, []);

  return theme;
};

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const themeMode = useThemeMode();

  const currentTheme = useCurrentTheme();
  const theme = themeMode === ThemeMode.SYSTEM ? currentTheme : themeMode;
  const darkMode = theme === ThemeMode.DARK;

  const themeContext = useMemo(
    () => ({
      isDark: darkMode,
    }),
    [darkMode]
  );
  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

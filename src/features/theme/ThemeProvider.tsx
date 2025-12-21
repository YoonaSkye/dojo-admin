import { useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import {
  ThemeContext,
  ThemeMode,
  ThemeType,
  toggleCssDarkMode,
} from './theme-context';
import { useThemeStore } from '@/store/theme';

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
  const themeMode = useThemeStore((state) => state.themeMode);

  const currentTheme = useCurrentTheme();
  const theme = themeMode === ThemeMode.SYSTEM ? currentTheme : themeMode;
  const darkMode = theme === ThemeMode.DARK;

  useEffect(() => {
    toggleCssDarkMode(darkMode);
  }, [darkMode]);

  const themeContext = useMemo(
    () => ({
      darkMode,
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

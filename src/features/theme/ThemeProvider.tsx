import { useThemeMode } from '@packages/stores';
import { useEffect, useMemo, useState, type PropsWithChildren } from 'react';


import { ThemeContext } from './theme-context';

const useCurrentTheme = () => {
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return matchMedia?.matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const onThemeChange: MediaQueryList['onchange'] = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    matchMedia?.addEventListener('change', onThemeChange);

    return () => {
      matchMedia?.removeEventListener('change', onThemeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return theme;
};

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const themeMode = useThemeMode();

  const currentTheme = useCurrentTheme();
  const resolvedTheme = themeMode === 'system' ? currentTheme : themeMode;
  const isDark = resolvedTheme === 'dark';

  const themeContext = useMemo(
    () => ({
      isDark,
      mode: themeMode,
    }),
    [isDark, themeMode],
  );
  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

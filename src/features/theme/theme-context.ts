import { createContext, useContext } from 'react';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type ThemeModeType = `${ThemeMode}`;

export type ThemeType = 'light' | 'dark';

export type ThemeContextType = {
  darkMode: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
});

export const icons: Record<ThemeModeType, string> = {
  dark: 'material-symbols:nightlight-rounded',
  light: 'material-symbols:sunny',
  system: 'material-symbols:hdr-auto',
};

/**
 * Toggle css dark mode
 *
 * @param darkMode Is dark mode
 */
export function toggleCssDarkMode(darkMode = false) {
  const htmlElementClassList = document.documentElement.classList;

  if (darkMode) {
    htmlElementClassList.add('dark');
  } else {
    htmlElementClassList.remove('dark');
  }
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}

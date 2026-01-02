import { createContext, useContext } from 'react';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type ThemeModeType = `${ThemeMode}`;

export type ThemeType = 'light' | 'dark';

export type ThemeContextType = {
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
});

export const icons: Record<ThemeModeType, string> = {
  dark: 'material-symbols:nightlight-rounded',
  light: 'material-symbols:sunny',
  system: 'material-symbols:hdr-auto',
};

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}

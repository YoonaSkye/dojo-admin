import { createContext, useContext } from 'react';

import type { ThemeModeType } from '@/types';

export type ThemeContextType = {
  isDark: boolean;
  mode: ThemeModeType;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  mode: 'light',
});

export const THEME_MODE_ICONS: Record<ThemeModeType, string> = {
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

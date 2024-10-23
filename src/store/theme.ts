import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'dark' | 'light' | 'auto';

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'auto',
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: 'theme-mode',
      partialize: ({ theme }) => ({ theme }),
    }
  )
);

export const useTheme = () => useThemeStore((state) => state.theme);
export const useSetTheme = () => useThemeStore((state) => state.setTheme);

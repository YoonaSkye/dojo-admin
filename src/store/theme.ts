import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
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

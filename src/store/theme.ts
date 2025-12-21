import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeModeType = 'dark' | 'light' | 'system';

type ThemeState = {
  themeMode: ThemeModeType;
  setThemeMode: (theme: ThemeModeType) => void;
  toggleThemeMode: () => void;
};
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      setThemeMode: (theme: ThemeModeType) => {
        set({ themeMode: theme });
      },
      toggleThemeMode: () => {
        set((state) => {
          const themeModes: ThemeModeType[] = ['light', 'dark', 'system'];
          const index = themeModes.findIndex(
            (item) => item === state.themeMode
          );
          const nextIndex = index === themeModes.length - 1 ? 0 : index + 1;

          return { themeMode: themeModes[nextIndex] };
        });
      },
    }),
    {
      name: 'theme-mode',
    }
  )
);

export const useThemeMode = () => useThemeStore((state) => state.themeMode);
export const useSetThemeMode = () =>
  useThemeStore((state) => state.setThemeMode);

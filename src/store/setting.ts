import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeColorPresets, ThemeLayout } from '#/enum';

type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeLayout: ThemeLayout;
  breadCrumb: boolean;
  multiTab: boolean;
};
type SettingStore = {
  collapsed: boolean;
  settings: SettingsType;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setSettings: (settings: SettingsType) => void;
    clearSettings: () => void;
    setCollapsed: (collapsed: boolean) => void;
  };
};

const initialStates = {
  themeColorPresets: ThemeColorPresets.Default,
  themeLayout: ThemeLayout.Vertical,
  breadCrumb: true,
  multiTab: true,
};

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      collapsed: false,
      settings: {
        themeColorPresets: ThemeColorPresets.Default,
        themeLayout: ThemeLayout.Vertical,
        breadCrumb: true,
        multiTab: true,
      },
      actions: {
        setCollapsed: (collapsed: boolean) => {
          set({ collapsed });
        },
        setSettings: (settings) => {
          set({ settings });
        },
        clearSettings() {
          set({ settings: initialStates });
        },
      },
    }),
    {
      name: 'settings',
      partialize: ({ settings, collapsed }) => ({ settings, collapsed }),
    }
  )
);

export const useCollapsed = () => useSettingStore((state) => state.collapsed);
export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () =>
  useSettingStore((state) => state.actions);

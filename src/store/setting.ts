import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeColorPresets, ThemeLayout } from '#/enum';

type SettingStore = {
  collapsed: boolean;
  // settings: SettingsType;
  themeColorPresets: ThemeColorPresets;
  themeLayout: ThemeLayout;
  breadCrumb: boolean;
  multiTab: boolean;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    clearSettings: () => void;
    setCollapsed: (collapsed: boolean) => void;
    setThemeColorPresets: (themeColorPresets: ThemeColorPresets) => void;
    setThemeLayout: (themeLayout: ThemeLayout) => void;
    setBreadCrumb: (isEnable: boolean) => void;
    setMultiTab: (isEnable: boolean) => void;
  };
};

const initialStates = {
  collapsed: false,
  themeColorPresets: ThemeColorPresets.Default,
  themeLayout: ThemeLayout.Vertical,
  breadCrumb: true,
  multiTab: true,
};

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      collapsed: false,
      themeColorPresets: ThemeColorPresets.Default,
      themeLayout: ThemeLayout.Vertical,
      breadCrumb: true,
      multiTab: true,

      actions: {
        setCollapsed: (collapsed: boolean) => {
          set({ collapsed });
        },
        setThemeColorPresets: (themeColorPresets: ThemeColorPresets) => {
          set({ themeColorPresets });
        },
        setThemeLayout: (themeLayout: ThemeLayout) => {
          set({ themeLayout });
        },
        setBreadCrumb: (isEnable: boolean) => {
          set({ breadCrumb: isEnable });
        },
        setMultiTab: (isEnable: boolean) => {
          set({ multiTab: isEnable });
        },
        clearSettings() {
          set({ ...initialStates });
        },
      },
    }),
    {
      name: 'settings',
      partialize: ({
        collapsed,
        themeColorPresets,
        themeLayout,
        breadCrumb,
        multiTab,
      }) => ({
        collapsed,
        themeColorPresets,
        themeLayout,
        breadCrumb,
        multiTab,
      }),
    }
  )
);

export const useCollapsed = () => useSettingStore((state) => state.collapsed);
export const useThemeColorPresets = () =>
  useSettingStore((state) => state.themeColorPresets);
export const useThemeLayout = () =>
  useSettingStore((state) => state.themeLayout);
export const useBreadCrumb = () => useSettingStore((state) => state.breadCrumb);
export const useMultiTab = () => useSettingStore((state) => state.multiTab);

export const useSettingActions = () =>
  useSettingStore((state) => state.actions);

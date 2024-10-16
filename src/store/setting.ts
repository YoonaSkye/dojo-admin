import { create } from 'zustand';

import { getItem, removeItem, setItem } from '@/utils/storage';

import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum';

type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
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

const useSettingStore = create<SettingStore>((set) => ({
  collapsed: false,
  settings: getItem<SettingsType>(StorageEnum.Settings) || {
    themeColorPresets: ThemeColorPresets.Default,
    themeMode: ThemeMode.Light,
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
      setItem(StorageEnum.Settings, settings);
    },
    clearSettings() {
      removeItem(StorageEnum.Settings);
    },
  },
}));

export const useCollapsed = () => useSettingStore((state) => state.collapsed);
export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () =>
  useSettingStore((state) => state.actions);

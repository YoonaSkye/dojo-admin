import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mergeDeepLeft } from 'ramda';
import { ThemeLayout, ThemeSetting } from '@/types';

type SettingsState = { settings: ThemeSetting };

type Actions = {
  actions: {
    setLayoutMode: (mode: ThemeLayout) => void;
    setHeader: (header: Partial<ThemeSetting['header']>) => void;
    setSider: (sider: Partial<ThemeSetting['sider']>) => void;
    setFooter: (footer: Partial<ThemeSetting['footer']>) => void;
    setTab: (tab: Partial<ThemeSetting['tab']>) => void;
    setBreadCrumb: (breadcrumb: Partial<ThemeSetting['breadcrumb']>) => void;
    setThemeColor: (color: string) => void;
  };
};

const initialSettings: ThemeSetting = {
  layout: {
    mode: 'vertical',
  },
  header: {
    fixed: true,
    visible: true,
    height: 48,
  },
  breadcrumb: {
    showIcon: true,
    visible: true,
  },
  sider: {
    collapsed: false,
    collapsedWidth: 80,
    visible: true,
    width: 208,
  },
  footer: {
    fixed: true,
    height: 48,
    visible: true,
  },
  tab: {
    cache: true,
    height: 40,
    visible: true,
  },
  themeColor: 'default',
};

const useSettingStore = create<SettingsState & Actions>()(
  persist(
    immer((set) => ({
      settings: initialSettings,
      actions: {
        setLayoutMode: (mode: ThemeLayout) => {
          set((state) => {
            state.settings.layout.mode = mode;
          });
        },
        setHeader: (header: Partial<ThemeSetting['header']>) => {
          set((state) => {
            state.settings.header = { ...state.settings.header, ...header };
          });
        },
        setBreadCrumb: (breadcrumb: Partial<ThemeSetting['breadcrumb']>) => {
          set((state) => {
            state.settings.breadcrumb = {
              ...state.settings.breadcrumb,
              ...breadcrumb,
            };
          });
        },
        setSider: (sider: Partial<ThemeSetting['sider']>) => {
          set((state) => {
            state.settings.sider = { ...state.settings.sider, ...sider };
          });
        },
        setFooter: (footer: Partial<ThemeSetting['footer']>) => {
          set((state) => {
            state.settings.footer = { ...state.settings.footer, ...footer };
          });
        },
        setTab: (tab: Partial<ThemeSetting['tab']>) => {
          set((state) => {
            state.settings.tab = { ...state.settings.tab, ...tab };
          });
        },
        setThemeColor: (color: string) => {
          set((state) => {
            state.settings.themeColor = color;
          });
        },
      },
    })),
    {
      name: 'core-settings',
      // getStorage: () => localStorage,
      merge: (persistedState, currentState) => {
        // @ts-ignore
        return mergeDeepLeft(persistedState, currentState);
      },
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);

export const useHeaderSetting = () =>
  useSettingStore((state) => state.settings.header);
export const useBreadCrumbSetting = () =>
  useSettingStore((state) => state.settings.breadcrumb);
export const useSiderSetting = () =>
  useSettingStore((state) => state.settings.sider);
export const useFooterSetting = () =>
  useSettingStore((state) => state.settings.footer);
export const useTabSetting = () =>
  useSettingStore((state) => state.settings.tab);
export const useThemeColor = () =>
  useSettingStore((state) => state.settings.themeColor);
export const useLayoutMode = () =>
  useSettingStore((state) => state.settings.layout.mode);

export const useSettingActions = () =>
  useSettingStore((state) => state.actions);

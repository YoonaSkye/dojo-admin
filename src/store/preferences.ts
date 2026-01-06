import type {
  BreadcrumbPreferences,
  FooterPreferences,
  HeaderPreferences,
  LayoutType,
  Preferences,
  SidebarPreferences,
  TabbarPreferences,
  ThemePreferences,
} from '@/types';
import { mergeDeepLeft, omit } from 'ramda';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import {
  BUILT_IN_THEME_PRESETS,
  isDarkTheme,
  updateCSSVariables,
} from '@/features/preferences';

type Actions = {
  actions: {
    setLayoutMode: (mode: LayoutType) => void;
    setHeader: (header: Partial<HeaderPreferences>) => void;
    setSider: (sider: Partial<SidebarPreferences>) => void;
    setFooter: (footer: Partial<FooterPreferences>) => void;
    setTab: (tab: Partial<TabbarPreferences>) => void;
    setBreadCrumb: (breadcrumb: Partial<BreadcrumbPreferences>) => void;
    setTheme: (theme: Partial<ThemePreferences>) => void;
  };
};

const defaultPreferences: Preferences = {
  app: {
    accessMode: 'backend',
    colorGrayMode: false,
    colorWeakMode: false,
    defaultHomePath: '/dashboard/analysis',
    dynamicTitle: true,
    enablePreferences: true,
    isMobile: false,
    layout: 'vertical',
    locale: 'zh-CN',
    name: 'Dojo Admin',
  },
  header: {
    enable: true,
    hidden: false,
    height: 48,
  },
  breadcrumb: {
    enable: true,
    showIcon: true,
  },
  sider: {
    collapsed: false,
    collapseWidth: 80,
    enable: true,
    hidden: false,
    width: 208,
  },
  footer: {
    enable: true,
    fixed: false,
    height: 48,
  },
  tabbar: {
    enable: true,
    height: 40,
    keepAlive: true,
    maxCount: 10,
  },
  theme: {
    builtinType: 'default',
    colorDestructive: 'hsl(348 100% 61%)',
    colorPrimary: 'hsl(212 100% 45%)',
    colorSuccess: 'hsl(144 57% 58%)',
    colorWarning: 'hsl(42 84% 61%)',
    mode: 'light',
    radius: '0.5',
    semiDarkHeader: false,
    semiDarkSidebar: false,
  },
};

export const useSettingStore = create<Preferences & Actions>()(
  persist(
    immer((set) => ({
      ...defaultPreferences,
      actions: {
        setLayoutMode: (mode: LayoutType) => {
          set((state) => {
            state.app.layout = mode;
          });
        },
        setHeader: (header) => {
          set((state) => {
            state.header = { ...state.header, ...header };
          });
        },
        setBreadCrumb: (breadcrumb) => {
          set((state) => {
            state.breadcrumb = {
              ...state.breadcrumb,
              ...breadcrumb,
            };
          });
        },
        setSider: (sider) => {
          set((state) => {
            state.sider = { ...state.sider, ...sider };
          });
        },
        setFooter: (footer) => {
          set((state) => {
            state.footer = { ...state.footer, ...footer };
          });
        },
        setTab: (tabbar) => {
          set((state) => {
            state.tabbar = { ...state.tabbar, ...tabbar };
          });
        },
        setTheme: (theme) => {
          set((state) => {
            let colorPrimary = {};
            let isDark = null;
            let builtinTheme = null;
            // 只修改 mode 情况
            if (Reflect.has(theme, 'mode')) {
              builtinTheme = BUILT_IN_THEME_PRESETS.find(
                (item) => item.type === state.theme.builtinType
              );
              isDark = isDarkTheme(theme.mode!);
            }
            // 只修改 builtinType 情况
            if (Reflect.has(theme, 'builtinType')) {
              builtinTheme = BUILT_IN_THEME_PRESETS.find(
                (item) => item.type === theme.builtinType
              );
              isDark = isDarkTheme(state.theme.mode!);
            }
            if (builtinTheme) {
              const primaryColor = isDark
                ? builtinTheme.darkPrimaryColor || builtinTheme.primaryColor
                : builtinTheme.primaryColor;

              colorPrimary = {
                colorPrimary: primaryColor || builtinTheme.color,
              };
            }

            state.theme = { ...state.theme, ...theme, ...colorPrimary };

            updateCSSVariables(state.theme as ThemePreferences);
          });
        },
      },
    })),
    {
      name: 'core-preferences',
      merge: (persistedState, currentState) => {
        const mergedSettings = mergeDeepLeft(
          persistedState as Preferences,
          currentState
        );

        return mergedSettings as Preferences & Actions;
      },
      onRehydrateStorage: () => {
        return (state) => {
          const themeUpdates = state?.theme || {};
          if (themeUpdates && Object.keys(themeUpdates).length > 0) {
            updateCSSVariables(state?.theme as ThemePreferences);
          }
        };
      },
      partialize: (state) => ({ ...omit(['actions'], state) }),
    }
  )
);

const useHeaderSetting = () =>
  useSettingStore(useShallow((state) => state.header));

const useBreadCrumbSetting = () =>
  useSettingStore(useShallow((state) => state.breadcrumb));

const useSiderSetting = () =>
  useSettingStore(useShallow((state) => state.sider));

const useFooterSetting = () =>
  useSettingStore(useShallow((state) => state.footer));

const useTabSetting = () =>
  useSettingStore(useShallow((state) => state.tabbar));

const useBuiltinType = () =>
  useSettingStore((state) => state.theme.builtinType);

const useThemeMode = () => useSettingStore((state) => state.theme.mode);

const useLayoutMode = () => useSettingStore((state) => state.app.layout);

const useSettingActions = () => useSettingStore((state) => state.actions);

export {
  useHeaderSetting,
  useBreadCrumbSetting,
  useSiderSetting,
  useFooterSetting,
  useTabSetting,
  useBuiltinType,
  useThemeMode,
  useLayoutMode,
  useSettingActions,
};

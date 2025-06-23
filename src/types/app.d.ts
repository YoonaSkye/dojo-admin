export type ThemeMode = 'light' | 'dark' | 'auto';

export type ThemeLayout = 'vertical' | 'horizontal' | 'header-sidebar-nav';

/** Theme setting */
export interface ThemeSetting {
  /** Layout */
  layout: {
    /** Layout mode */
    mode: ThemeLayout;
  };
  /** Header */
  header: {
    /** Whether fixed the header */
    fixed: boolean;
    /** Whether to show the header */
    visible: boolean;
    /** Header height */
    height: number;
  };
  /** Header breadcrumb */
  breadcrumb: {
    /** Whether to show the breadcrumb icon */
    showIcon: boolean;
    /** Whether to show the breadcrumb */
    visible: boolean;
  };
  /** Sider */
  sider: {
    /** Whether to collapse sider */
    collapsed: boolean;
    /** Collapsed sider width */
    collapsedWidth: number;
    /** Whether to show the sider */
    visible: boolean;
    /** Sider width */
    width: number;
  };
  /** Footer */
  footer: {
    /** Whether fixed the footer */
    fixed: boolean;
    /** Footer height */
    height: number;
    /** Whether to show the footer */
    visible: boolean;
  };
  /** Tab */
  tab: {
    /**
     * Whether to cache the tab
     *
     * If cache, the tabs will get from the local storage when the page is refreshed
     */
    cache: boolean;
    /** Tab height */
    height: number;
    /** Whether to show the tab */
    visible: boolean;
  };
  /** Theme color */
  themeColor: string;
}

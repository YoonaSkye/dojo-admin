import type React from 'react';

/** Header config */
interface AdminLayoutHeaderConfig {
  /**
   * Header class
   *
   * @default ''
   */
  headerClass?: string;
  /**
   * Header height
   *
   * @default 56px
   */
  headerHeight?: number;
  /**
   * Whether header is visible
   *
   * @default true
   */
  headerVisible?: boolean;
}

/** Tab config */
interface AdminLayoutTabConfig {
  /**
   * Tab class
   *
   * @default ''
   */
  tabClass?: string;
  /**
   * Tab height
   *
   * @default 48px
   */
  tabHeight?: number;
  /**
   * Whether tab is visible
   *
   * @default true
   */
  tabVisible?: boolean;
  /** Update siderCollapse */
  updateSiderCollapse?: () => void;
}

/** Sider config */
interface AdminLayoutSiderConfig {
  /**
   * Mobile sider class
   *
   * @default ''
   */
  mobileSiderClass?: string;
  /**
   * Sider class
   *
   * @default ''
   */
  siderClass?: string;
  /**
   * Sider collapse status
   *
   * @default false
   */
  siderCollapse?: boolean;
  /**
   * Sider width when collapse is true
   *
   * @default '64px'
   */
  siderCollapsedWidth?: number;
  /**
   * Whether sider is visible
   *
   * @default true
   */
  siderVisible?: boolean;
  /**
   * Sider width when collapse is false
   *
   * @default '220px'
   */
  siderWidth?: number;
}

/** Content config */
export interface AdminLayoutContentConfig {
  /**
   * Content class
   *
   * @default ''
   */
  contentClass?: string;
  /**
   * Whether content is full the page
   *
   * If true, other elements will be hidden by `display: none`
   */
  fullContent?: boolean;
}

/** Footer config */
export interface AdminLayoutFooterConfig {
  /**
   * Whether footer is fixed
   *
   * @default true
   */
  fixedFooter?: boolean;
  /**
   * Footer class
   *
   * @default ''
   */
  footerClass?: string;
  /**
   * Footer height
   *
   * @default 48px
   */
  footerHeight?: number;
  /**
   * Whether footer is visible
   *
   * @default true
   */
  footerVisible?: boolean;
  /**
   * Whether footer is on the right side
   *
   * When the layout is vertical, the footer is on the right side
   */
  rightFooter?: boolean;
}

/**
 * Layout mode
 *
 * - Horizontal
 * - Vertical
 */
export type LayoutMode = 'horizontal' | 'vertical';

export type Slots = {
  /** Main */
  children?: React.ReactNode;
  /** Footer */
  Footer?: React.ReactNode;
  /** Header */
  Header?: React.ReactNode;
  /** Sider */
  Sider?: React.ReactNode;
  /** Tab */
  Tab?: React.ReactNode;
};

/** Admin layout props */
export interface AdminLayoutProps
  extends AdminLayoutHeaderConfig,
    AdminLayoutTabConfig,
    AdminLayoutSiderConfig,
    // AdminLayoutContentConfig,
    // AdminLayoutFooterConfig,
    Slots {
  /**
   * Whether fix the header and tab
   *
   * @default true
   */
  fixedTop?: boolean;
  /** Is mobile layout */
  isMobile?: boolean;
  /**
   * Layout mode
   *
   * - {@link LayoutMode}
   */
  mode?: LayoutMode;
}

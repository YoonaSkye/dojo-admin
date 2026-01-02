export type LayoutType = 'vertical' | 'horizontal' | 'header-sidebar-nav';

export type ThemeModeType = 'system' | 'dark' | 'light';

/**
 * 权限模式
 * backend 后端权限模式
 * frontend 前端权限模式
 */
type AccessModeType = 'backend' | 'frontend';

type SupportedLanguagesType = 'en-US' | 'zh-CN';

type BuiltinThemeType =
  | 'custom'
  | 'deep-blue'
  | 'deep-green'
  | 'default'
  | 'gray'
  | 'green'
  | 'neutral'
  | 'orange'
  | 'pink'
  | 'red'
  | 'rose'
  | 'sky-blue'
  | 'slate'
  | 'stone'
  | 'violet'
  | 'yellow'
  | 'zinc'
  | (Record<never, never> & string);

export interface AppPreferences {
  /** 权限模式 */
  accessMode: AccessModeType;
  /** 是否开启灰色模式 */
  colorGrayMode: boolean;
  /** 是否开启色弱模式 */
  colorWeakMode: boolean;
  /** 默认首页地址 */
  defaultHomePath: string;
  /** 开启动态标题 */
  dynamicTitle: boolean;
  /** 是否显示偏好设置 */
  enablePreferences: boolean;
  /** 是否移动端 */
  isMobile: boolean;
  /** 布局方式 */
  layout: LayoutType;
  /** 支持的语言 */
  locale: SupportedLanguagesType;
  /** 应用名 */
  name: string;
}

export interface BreadcrumbPreferences {
  /** 面包屑是否启用 */
  enable: boolean;
  /** 面包屑图标是否可见 */
  showIcon: boolean;
}

export interface FooterPreferences {
  /** 底栏是否可见 */
  enable: boolean;
  /** 底栏是否固定 */
  fixed: boolean;
  /** 底栏高度 */
  height: number;
}

export interface HeaderPreferences {
  /** 顶栏是否启用 */
  enable: boolean;
  /** 顶栏高度 */
  height: number;
  /** 顶栏是否隐藏,css-隐藏 */
  hidden: boolean;
}

export interface SidebarPreferences {
  /** 侧边栏是否折叠 */
  collapsed: boolean;
  /** 侧边栏折叠宽度 */
  collapseWidth: number;
  /** 侧边栏是否可见 */
  enable: boolean;
  /** 侧边栏是否隐藏 - css */
  hidden: boolean;
  /** 侧边栏宽度 */
  width: number;
}

export interface TabbarPreferences {
  /** 是否开启多标签页 */
  enable: boolean;
  /** 标签页高度 */
  height: number;
  /** 开启标签页缓存功能 */
  keepAlive: boolean;
  /** 限制最大数量 */
  maxCount: number;
}

export interface ThemePreferences {
  /** 内置主题名 */
  builtinType: BuiltinThemeType;
  /** 错误色 */
  colorDestructive: string;
  /** 主题色 */
  colorPrimary: string;
  /** 成功色 */
  colorSuccess: string;
  /** 警告色 */
  colorWarning: string;
  /** 当前主题 */
  mode: ThemeModeType;
  /** 圆角 */
  radius: string;
  /** 是否开启半深色header（只在theme='light'时生效） */
  semiDarkHeader: boolean;
  /** 是否开启半深色菜单（只在theme='light'时生效） */
  semiDarkSidebar: boolean;
}

export interface Preferences {
  /** 全剧配置 */
  app: AppPreferences;
  /** 顶栏配置 */
  header: HeaderPreferences;
  /** 面包屑配置 */
  breadcrumb: BreadcrumbPreferences;
  /** 侧边栏配置 */
  sider: SidebarPreferences;
  /** 底栏配置 */
  footer: FooterPreferences;
  /** 标签页配置 */
  tabbar: TabbarPreferences;
  /** 主题配置 */
  theme: ThemePreferences;
}

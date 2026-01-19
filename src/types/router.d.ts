import type { RouteObject, UIMatch } from 'react-router-dom';

// meta元信息接口
export interface RouteMeta {
  /**
   * 是否固定标签页
   * @default false
   */
  affixTab?: boolean;
  /**
   * 固定标签页的顺序
   * @default 0
   */
  affixTabOrder?: number;
  /**
   * 需要特定的角色标识才可以访问
   * @default []
   */
  authority?: string[];
  /**
   * 当前路由的子级在菜单中不展现
   * @default false
   */
  hideChildrenInMenu?: boolean;
  /**
   * 当前路由在面包屑中不展现
   * @default false
   */
  hideInBreadcrumb?: boolean;
  /**
   * 当前路由在菜单中不展现
   * @default false
   */
  hideInMenu?: boolean;
  /**
   * 当前路由在标签页不展现
   * @default false
   */
  hideInTab?: boolean;
  /**
   * 图标（菜单/tab）
   */
  icon?: string;
  /**
   * iframe 地址
   */
  iframeSrc?: string;
  /**
   * 忽略权限，直接可以访问
   * @default false
   */
  ignoreAccess?: boolean;
  /**
   * 开启KeepAlive缓存
   */
  keepAlive?: boolean;
  /**
   * 外链-跳转路径
   */
  link?: string;
  /**
   * 路由是否已经加载过
   */
  loaded?: boolean;
  /**
   * 用于路由->菜单排序
   */
  order?: number;
  /**
   * 菜单所携带的参数
   */
  // query?: Recordable;
  /**
   * 标题名称
   */
  title?: string;
  /**
   * 路由名称
   */
  name?: string;
  /**
   * 是否为常驻路由（登录状态下可访问）
   * @default false
   */
  constant?: boolean;
}

export type AppRouteObject = {
  redirect?: string;
  handle?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;

export interface Route<
  T = unknown,
  Q extends Record<string, string> | null = Record<string, string>,
  P extends Record<string, string | string[]> = Record<
    string,
    string | string[]
  >
> extends Omit<UIMatch<T, RouteMeta>, 'params'> {
  error: Error | null;
  fullPath: string;
  hash: string;
  matched: UIMatch<T, RouteMeta>[];
  params: P;
  pathname: string;
  query: Q;
  search: string;
}

import { Params, RouteObject } from 'react-router-dom';

// 扩展meta元信息接口
export interface RouteMeta {
  /**
   * antd menu selectedKeys
   */
  key: string;
  /**
   * menu label, i18n
   */
  label: string;
  /**
   * menu prefix icon
   */
  icon?: React.ReactNode;
  /**
   * menu suffix icon
   */
  suffix?: React.ReactNode;
  /**
   * hide in menu
   */
  hideMenu?: boolean;
  /**
   * hide in multi tab
   */
  hideTab?: boolean;
  /**
   * disable in menu
   */
  disabled?: boolean;
  /**
   * react router outlet
   */
  outlet?: any;
  /**
   * use to refresh tab
   */
  timeStamp?: string;
  /**
   * external link and iframe need
   */
  frameSrc?: string;
  /**
   * dynamic route params
   *
   * @example /user/:id
   */
  params?: Params<string>;
}

export type RouteHandle = {
  name: string;
  title: string;
  icon?: string;
};

export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;

// 扩展meta元信息接口 另一种写法
// 如何全局暴露出去？
declare module 'react-router' {
  interface IndexRouteObject {
    handle?: RouteObject['handle'] & RouteHandle;
  }
  interface NonIndexRouteObject {
    handle?: RouteObject['handle'] & RouteHandle;
  }
}

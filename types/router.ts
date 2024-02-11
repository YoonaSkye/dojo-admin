import { RouteObject } from 'react-router-dom';

// 扩展meta元信息接口
export interface RouteMeta {}

export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;

// 扩展meta元信息接口 另一种写法
// 如何全局暴露出去？
// declare module 'react-router' {
//   interface IndexRouteObject {
//     meta?: {
//       menu?: boolean;
//       title?: string;
//       icon?: React.ReactNode;
//       auth?: boolean;
//     };
//     name?: string;
//   }
//   interface NonIndexRouteObject {
//     meta?: {
//       menu?: boolean;
//       title?: string;
//       icon?: React.ReactNode;
//       auth?: boolean;
//     };
//     name?: string;
//   }
// }

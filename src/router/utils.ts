import { AppRouteObject, RouteMeta } from '#/router';
import { ascend } from 'ramda';
import { RouteObject } from 'react-router-dom';

/**
 * return menu routes
 */
export const menuFilter = (items: RouteObject[]) => {
  return items.filter((item) => {
    // 过滤掉重定向路由
    const show = item.handle;
    if (show && item.children) {
      item.children = menuFilter(item.children);
    }
    return show;
  });
  // .sort(ascend((item) => item.order || Infinity));
};

/**
 * return flattened routes
 */
export const flattenMenuRoutes = (routes: AppRouteObject[]) => {
  return routes.reduce<RouteMeta[]>((prev, item) => {
    const { meta, children } = item;
    if (meta) prev.push(meta);
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
};

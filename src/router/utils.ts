import { RouteMeta } from '#/router';

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
export const flattenMenuRoutes = (routes: RouteObject[]) => {
  return routes.reduce<RouteMeta[]>((prev, item) => {
    const { handle, children, path } = item;
    if (handle) prev.push({ ...handle, key: path, label: handle.title });
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
};

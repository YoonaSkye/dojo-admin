import { useEffect, useState } from 'react';
import {
  useLocation,
  useMatches,
  useNavigate,
  useOutlet,
} from 'react-router-dom';
import { useFlattenedRoutes } from './use-flattened-routes';

interface MatchRouteType {
  // 菜单名称
  title: string;
  // tab对应的url
  pathname: string;
  // 要渲染的组件
  children: any;
  // 路由，和pathname区别是，详情页 pathname是 /:id，routePath是 /1
  // routePath: string;
  // 图标
  icon?: string;
  hideTab?: boolean;
}
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export function useMatchRoute(): MatchRouteType | undefined {
  // 获取路由组件实例
  const children = useOutlet();
  // 获取所有路由
  const matches = useMatches();
  // 获取当前url
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // 扁平化的路由meta信息
  const flattenedRoutes = useFlattenedRoutes();

  const [matchRoute, setMatchRoute] = useState<MatchRouteType | undefined>();

  // 监听pathname变了，说明路由有变化，重新匹配，返回新路由信息
  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matches.at(-1);
    if (!lastRoute) return;
    //BUG: 首次渲染，遇见<Navigate />组件， matches命中的是重定向路由，handle = null
    // 在遇见/dashboard 重定向到/dashboard/analytics 也会遇见handle = null

    const matchedRoute = flattenedRoutes.find(
      (item) =>
        lastRoute?.pathname === item.key ||
        lastRoute.pathname === `${item.key}/`
    );

    if (matchedRoute) {
      setMatchRoute({
        title: matchedRoute.label,
        pathname: matchedRoute.key,
        children: children,
        icon: matchedRoute.icon,
        hideTab: matchedRoute.hideTab,
      });
    } else {
      // 针对访问 / 路由
      //TODO: 解决初次登陆路由跳转问题
      navigate(HOMEPAGE);
    }
  }, [pathname]);

  return matchRoute;
}

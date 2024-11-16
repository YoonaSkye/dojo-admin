import { Permission } from '#/entity';
import { BasicStatus, PermissionType } from '#/enum';
import { AppRouteObject } from '#/router';
import { getAccessCodesApi, getAllMenusApi, getUserInfoApi } from '@/api/core';
import Loading from '@/components/loading';
import { useAccessActions } from '@/store/access';
import { useUserActions } from '@/store/user';
import { flattenTrees } from '@/utils';
import { useRequest } from 'ahooks';
import { isEmpty } from 'ramda';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ENTRY_PATH = '/src/pages';
const PAGES = import.meta.glob('/src/pages/**/*.tsx');
const loadComponentFromPath = (path: string) => PAGES[`${ENTRY_PATH}${path}`];

/**
 * Build complete route path by traversing from current permission to root
 * @param {Permission} permission - current permission
 * @param {Permission[]} flattenedPermissions - flattened permission array
 * @param {string[]} segments - route segments accumulator
 * @returns {string} normalized complete route path
 */
function buildCompleteRoute(
  permission: Permission,
  flattenedPermissions: Permission[],
  segments: string[] = []
): string {
  // Add current route segment
  segments.unshift(permission.route);

  // Base case: reached root permission
  if (!permission.parentId) {
    return `/${segments.join('/')}`;
  }

  // Find parent and continue recursion
  const parent = flattenedPermissions.find((p) => p.id === permission.parentId);
  if (!parent) {
    console.warn(`Parent permission not found for ID: ${permission.parentId}`);
    return `/${segments.join('/')}`;
  }

  return buildCompleteRoute(parent, flattenedPermissions, segments);
}

// Components
// function NewFeatureTag() {
//   return (
//     <ProTag color="cyan" icon={<Iconify icon="solar:bell-bing-bold-duotone" size={14} />}>
//       NEW
//     </ProTag>
//   );
// }

function RouteWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

// Route Transformers
const createBaseRoute = (
  permission: Permission,
  completeRoute: string
): AppRouteObject => {
  const {
    route,
    label,
    icon,
    order,
    hide,
    hideTab,
    status,
    frameSrc,
    newFeature,
  } = permission;

  const baseRoute: AppRouteObject = {
    path: route,
    meta: {
      label,
      key: completeRoute,
      hideMenu: !!hide,
      hideTab,
      disabled: status === BasicStatus.DISABLE,
    },
  };

  if (order) baseRoute.order = order;
  if (icon) baseRoute.meta!.icon = icon;
  // if (frameSrc) baseRoute.meta!.frameSrc = frameSrc;
  // if (newFeature) baseRoute.meta!.suffix = <NewFeatureTag />;

  return baseRoute;
};

const createCatalogueRoute = (
  permission: Permission,
  flattenedPermissions: Permission[]
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions)
  );

  baseRoute.meta!.hideTab = true;

  const { parentId, children = [] } = permission;
  if (!parentId) {
    baseRoute.element = (
      <RouteWrapper>
        <Outlet />
      </RouteWrapper>
    );
  }

  baseRoute.children = transformPermissionsToRoutes(
    children,
    flattenedPermissions
  );

  if (!isEmpty(children)) {
    baseRoute.children.unshift({
      index: true,
      element: <Navigate to={children[0].route} replace />,
    });
  }

  return baseRoute;
};

const createMenuRoute = (
  permission: Permission,
  flattenedPermissions: Permission[]
): AppRouteObject => {
  const baseRoute = createBaseRoute(
    permission,
    buildCompleteRoute(permission, flattenedPermissions)
  );

  const Element = lazy(loadComponentFromPath(permission.component!) as any);

  baseRoute.element = permission.frameSrc ? (
    <Element src={permission.frameSrc} />
  ) : (
    <RouteWrapper>
      <Element />
    </RouteWrapper>
  );

  return baseRoute;
};

// Main Functions
function transformPermissionsToRoutes(
  permissions: Permission[],
  flattenedPermissions: Permission[]
): AppRouteObject[] {
  return permissions.map((permission) => {
    if (permission.type === PermissionType.CATALOGUE) {
      return createCatalogueRoute(permission, flattenedPermissions);
    }
    return createMenuRoute(permission, flattenedPermissions);
  });
}

export const useUserDetail = () => {
  const [loading, setLoading] = useState(true);

  const { setUserInfo } = useUserActions();
  const { setAccessCodes, setAccessMenus } = useAccessActions();

  const { data: menus, loading: requestLoading } = useRequest(getAllMenusApi);

  const { data: info } = useRequest(getUserInfoApi);
  const { data: codes } = useRequest(getAccessCodesApi);

  useEffect(() => {
    if (info) setUserInfo(info);

    if (codes) setAccessCodes(codes);
  }, [info, codes]);

  useEffect(() => {
    if (!menus) return;
    setLoading(true);
    const flattenedPermissions = flattenTrees(menus);
    // const asyncRoutes = generateRoutesByBackend(menus);
    const asyncRoutes = transformPermissionsToRoutes(
      menus,
      flattenedPermissions
    );
    setAccessMenus([...asyncRoutes]);

    setLoading(false);
    // 构建路由
  }, [menus]);

  return { loading: requestLoading || loading };
};

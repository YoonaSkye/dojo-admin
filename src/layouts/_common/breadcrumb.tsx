import { Iconify } from '@/components/icon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useAccessRoutes } from '@/store/access';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { matchRoutes, RouteObject, useLocation } from 'react-router-dom';

type Crumbs = {
  icon: string;
  title: string;
  path: string;
};

//BUG: 面包屑更新时，太突兀，速度太快
export default function BreadCrumb() {
  const { t } = useTranslation();

  const location = useLocation();
  const authRoutes = useAccessRoutes() as RouteObject[];
  const matches = useMemo(
    () => matchRoutes(authRoutes, { pathname: location.pathname }),
    [location.pathname, authRoutes]
  );

  const [breadCrumbs, setBreadCrumbs] = useState<Crumbs[] | undefined>([]);

  useEffect(() => {
    const crumbs = matches?.map((match) => {
      const { icon, title } = match.route.handle;
      return { icon, title, path: match.pathname };
    });
    setBreadCrumbs(crumbs);
  }, [matches]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbs?.map((crumb, index) => (
          <Fragment key={crumb.path}>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <div className="flex-center">
                  <Iconify icon={crumb.icon} className="mr-1 size-4" />
                  {t(crumb.title)}
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index === breadCrumbs.length - 1 ? null : <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

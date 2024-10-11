import { Iconify } from '@/components/icon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useMatches, useNavigate } from 'react-router-dom';

type Crumbs = {
  icon: string;
  title: string;
  path: string;
};

export default function BreadCrumb() {
  const { t } = useTranslation();
  const matches = useMatches();
  const navigate = useNavigate();
  const [breadCrumbs, setBreadCrumbs] = useState<Crumbs[]>([]);

  useEffect(() => {
    const crumbs = matches
      .filter((match) => Boolean(match.handle))
      .map((match) => {
        const { icon, title } = match.handle as any;
        return { icon, title, path: match.pathname };
      });
    setBreadCrumbs(crumbs);
  }, [matches]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbs.map((crumb, index) => (
          <Fragment key={crumb.path}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="javascript:void 0"
                onClick={() => navigate(crumb.path)}
              >
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

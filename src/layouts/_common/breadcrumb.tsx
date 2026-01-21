import { Iconify } from '@/components/icon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useRoute } from '@/router';

import { AnimatePresence, motion as m } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Crumbs = {
  icon: string;
  title: string;
  path: string;
};

export default function BreadCrumb() {
  const { t } = useTranslation();
  const route = useRoute();

  const [breadCrumbs, setBreadCrumbs] = useState<Crumbs[] | undefined>([]);

  useEffect(() => {
    // FIX: 防止添加目录路由，如/dashboard
    if (!route.handle || route.handle.hideInTab) return;

    const crumbs = route.matched
      ?.map((match) => {
        if (!match.handle) return null;
        const { icon, title } = match.handle;
        return { icon, title, path: match.pathname } as Crumbs;
      })
      .filter(Boolean) as Crumbs[];

    setBreadCrumbs(crumbs);
  }, [route.matched]);

  return (
    // 面包屑更新时，添加Framer Motion动画
    <Breadcrumb>
      <BreadcrumbList className="bg-muted px-4 py-2 rounded-md">
        <AnimatePresence mode="popLayout">
          {breadCrumbs?.map((crumb, index) => (
            <m.div
              key={crumb.path}
              className="flex items-center"
              initial={{
                opacity: 0,
                x: 30,
                skewX: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
                skewX: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              exit={{
                opacity: 0,
                display: 'none',
              }}
            >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <div className="flex-center">
                    <Iconify icon={crumb.icon} className="mr-1 size-4" />
                    {t(crumb.title)}
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== breadCrumbs.length - 1 && <BreadcrumbSeparator />}
            </m.div>
          ))}
        </AnimatePresence>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

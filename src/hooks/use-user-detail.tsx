import { getAccessCodesApi, getAllMenusApi, getUserInfoApi } from '@/api/core';
import { accessRoutes } from '@/router/routes';
import { generateRoutesByFrontend } from '@/router/utils/access';
import { generateRoutesByBackend } from '@/router/utils/generate-routes-backend';
import { useAccessActions } from '@/store/access';
import { useUserActions } from '@/store/user';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

type AccessModeType = 'backend' | 'frontend';
const mode = import.meta.env.VITE_ACCESS_MODE as AccessModeType;

export const useUserDetail = () => {
  const [loading, setLoading] = useState(true);

  const { setUserInfo } = useUserActions();
  const { setAccessCodes, setAccessRoutes, setIsAccessChecked } =
    useAccessActions();

  const { runAsync, loading: requestLoading } = useRequest(getAllMenusApi, {
    manual: true,
  });
  // const { data: menus, loading: requestLoading } = useRequest(getAllMenusApi);

  const { data: info } = useRequest(getUserInfoApi);
  const { data: codes } = useRequest(getAccessCodesApi);

  useEffect(() => {
    if (info) setUserInfo(info);

    if (codes) setAccessCodes(codes);
  }, [info, codes]);

  useEffect(() => {
    // TODO: 根据权限模式 mode = 'backend' | 'frontend', 来生成权限路由
    if (!info) return;
    // if (isAccessChecked) return;

    setLoading(true);
    switch (mode) {
      case 'backend': {
        runAsync().then((data) => {
          const authRoutes = generateRoutesByBackend(data);

          setAccessRoutes([...authRoutes]);
          setIsAccessChecked(true);

          setLoading(false);
        });

        break;
      }
      case 'frontend': {
        const authRoutes = generateRoutesByFrontend(accessRoutes, info.roles);

        setAccessRoutes(authRoutes);
        setIsAccessChecked(true);

        setLoading(false);
        break;
      }
    }
  }, [info]);

  return { loading: requestLoading || loading };
};

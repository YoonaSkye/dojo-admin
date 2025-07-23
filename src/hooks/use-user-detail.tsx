import { getAccessCodesApi, getAllMenusApi, getUserInfoApi } from '@/api/core';
import { generateRoutesByBackend } from '@/router/utils/generate-routes-backend';
import {
  useAccessActions,
  useAccessToken,
  useIsAccessChecked,
} from '@/store/access';
import { useUserActions } from '@/store/user';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

type AccessModeType = 'backend' | 'frontend';
const mode = import.meta.env.VITE_ACCESS_MODE as AccessModeType;

export const useUserDetail = () => {
  const [loading, setLoading] = useState(false);

  const isAccessChecked = useIsAccessChecked();
  const accessToken = useAccessToken();

  const { setUserInfo } = useUserActions();
  const { setAccessCodes, setAccessRoutes, setIsAccessChecked } =
    useAccessActions();

  const { runAsync, loading: requestLoading } = useRequest(getAllMenusApi, {
    manual: true,
  });

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const [info, codes] = await Promise.all([
          getUserInfoApi(),
          getAccessCodesApi(),
        ]);
        setUserInfo(info);
        setAccessCodes(codes);
      } catch (error) {
        console.log(error);
      }
    }

    if (accessToken) {
      fetchUserInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    // TODO: 根据权限模式 mode = 'backend' | 'frontend', 来生成权限路由
    if (!accessToken) return;
    if (isAccessChecked) return;

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
        // TODO:待开发
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return { loading: requestLoading || loading };
};

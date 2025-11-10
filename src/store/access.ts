import { getAccessCodesApi, getUserInfoApi, loginApi } from '@/api/core';
import { AppRouteObject } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useRouter } from '@/router';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserStore } from './user';

const HOME_PAGE = import.meta.env.VITE_APP_HOMEPAGE || '/dashboard/analytics';

type MenuItem = Required<MenuProps>['items'][number];

interface LoginAndRegisterParams {
  password: string;
  username: string;
}
type AccessToken = null | string;
interface AccessState {
  /**
   * 权限码
   */
  accessCodes: string[];
  /**
   * 可访问的菜单列表
   */
  accessMenus: MenuItem[];
  /**
   * 可访问的路由列表
   */
  accessRoutes: AppRouteObject[];
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken;
  /**
   * 是否已经检查过权限
   */
  isAccessChecked: boolean;
  /**
   * 登录是否过期
   */
  loginExpired: boolean;
  /**
   * 登录 accessToken
   */
  refreshToken: AccessToken;
}

interface AccessActions {
  actions: {
    setAccessCodes: (codes: string[]) => void;
    setAccessMenus: (menus: MenuItem[]) => void;
    setAccessRoutes: (routes: AppRouteObject[]) => void;
    setAccessToken: (token: AccessToken) => void;
    setIsAccessChecked: (isAccessChecked: boolean) => void;
    setLoginExpired: (loginExpired: boolean) => void;
    setRefreshToken: (token: AccessToken) => void;
    reset: () => void;
  };
}

export const useAccessStore = create<AccessState & AccessActions>()(
  persist(
    (set, get, store) => ({
      accessCodes: [],
      accessMenus: [],
      accessRoutes: [],
      accessToken: null,
      isAccessChecked: false,
      loginExpired: false,
      refreshToken: null,
      actions: {
        setAccessCodes: (codes: string[]) => {
          set({ accessCodes: codes });
        },
        setAccessMenus: (menus: MenuItem[]) => {
          set({ accessMenus: menus });
        },
        setAccessRoutes: (routes: AppRouteObject[]) => {
          set({ accessRoutes: routes });
        },
        setAccessToken: (token: AccessToken) => {
          set({ accessToken: token });
        },
        setIsAccessChecked: (isAccessChecked: boolean) => {
          set({ isAccessChecked });
        },
        setLoginExpired: (loginExpired: boolean) => {
          set({ loginExpired });
        },
        setRefreshToken: (token: AccessToken) => {
          set({ refreshToken: token });
        },
        reset: () => {
          set(store.getInitialState());
        },
      },
    }),
    {
      name: 'core-access',
      partialize: ({ accessCodes, accessToken, refreshToken }) => ({
        accessCodes,
        accessToken,
        refreshToken,
      }),
    }
  )
);

export const useAccessCodes = () =>
  useAccessStore((store) => store.accessCodes);
export const useAccessMenus = () =>
  useAccessStore((store) => store.accessMenus);
export const useAccessRoutes = () =>
  useAccessStore((store) => store.accessRoutes);
export const useAccessToken = () =>
  useAccessStore((store) => store.accessToken);
export const useAccessRefreshToken = () =>
  useAccessStore((store) => store.refreshToken);
export const useIsAccessChecked = () =>
  useAccessStore((store) => store.isAccessChecked);
export const useAccessActions = () => useAccessStore((store) => store.actions);

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   * @param onSuccess 成功之后的回调函数
   */
  const signIn = async (params: LoginAndRegisterParams) => {
    // 异步处理用户登录操作并获取 accessToken

    try {
      setLoading(true);

      const res = await loginApi(params);
      const { accessToken, refreshToken } = res;
      // 如果成功获取到 accessToken
      if (accessToken) {
        useAccessStore.setState({ accessToken, refreshToken });

        // 获取用户信息并存储到 accessStore 中
        const [fetchUserInfoResult, accessCodes] = await Promise.all([
          getUserInfoApi(),
          getAccessCodesApi(),
        ]);

        useUserStore.setState({ userInfo: fetchUserInfoResult });
        useAccessStore.setState({ accessCodes });

        if (redirectUrl) {
          replace(redirectUrl);
        } else {
          replace(HOME_PAGE);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};

export const useSignOut = () => {
  const { reset } = useAccessActions();
  const { replace, resetRoutes } = useRouter();
  // const currentRoute = useRoute();

  function signOut(redirect: boolean = true) {
    // reset所有zustand store 和 路由
    try {
      // TODO: 调用logout api
    } catch (error) {
      // 不做任何处理
    }

    replace('/auth/login');
    // 回登录页带上当前路由地址
    // if (currentRoute?.fullPath) {
    //   const fullPath = `/auth/login?redirect=${currentRoute.fullPath}`;
    //   await replace(fullPath);
    // } else {
    //   await replace('/auth/login');
    // }

    resetRoutes();
    // 重置Access Store
    reset();
    // 清除 Access Store 和 User Store 的持久化存储
    useAccessStore.persist.clearStorage();
    useUserStore.persist.clearStorage();
    // useTabsStore.persist.clearStorage();
  }

  return { signOut };
};

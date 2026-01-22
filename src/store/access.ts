import { getAccessCodesApi, getUserInfoApi, loginApi } from '@/api/core';
import { useRouter } from '@/router';
import { AppRouteObject } from '@/types';
import type { MenuProps } from 'antd';
import { startTransition, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { persist } from 'zustand/middleware';
import { useUserStore } from './user';
import { create, resetAllStores } from './utils';

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
  setAccessCodes: (codes: string[]) => void;
  setAccessMenus: (menus: MenuItem[]) => void;
  setAccessRoutes: (routes: AppRouteObject[]) => void;
  setAccessToken: (token: AccessToken) => void;
  setIsAccessChecked: (isAccessChecked: boolean) => void;
  setLoginExpired: (loginExpired: boolean) => void;
  setRefreshToken: (token: AccessToken) => void;
  reset: () => void;
}

export const useAccessStore = create<AccessState & AccessActions>()(
  persist(
    (set, _, store) => ({
      accessCodes: [],
      accessMenus: [],
      accessRoutes: [],
      accessToken: null,
      isAccessChecked: false,
      loginExpired: false,
      refreshToken: null,
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
    }),
    {
      name: 'core-access',
      partialize: ({ accessCodes, accessToken, refreshToken }) => ({
        accessCodes,
        accessToken,
        refreshToken,
      }),
    },
  ),
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
  const { replace, resetRoutes } = useRouter();

  function signOut() {
    // reset所有zustand store 和 路由
    try {
      // TODO: 调用logout api
    } catch (error) {
      // 不做任何处理
    }

    // 从同步事件处理器中直接触发的 suspend，React 不知道如何处理
    // 同步事件处理器中的路由变更会导致suspend信号无法被处理
    // startTransition + Suspense 才是完整方案
    startTransition(() => {
      // 1. 先清除持久化缓存，防止 store 重新初始化时读到旧数据
      useAccessStore.persist.clearStorage();
      useUserStore.persist.clearStorage();
      // preferences 不清除持久化

      // 2. 重置内存中的 store 状态
      resetAllStores();

      // 3. 重置路由配置（移除受保护的路由）
      resetRoutes();

      // 4. 最后跳转到登录页
      replace('/auth/login');
    });
  }

  return { signOut };
};

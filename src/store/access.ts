import { AppRouteObject } from '#/router';
import { loginApi } from '@/api/core';
import { useRequest } from 'ahooks';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  accessMenus: AppRouteObject[];
  /**
   * 可访问的路由列表
   */
  accessRoutes: [];
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
    setAccessMenus: (menus: AppRouteObject[]) => void;
    setAccessRoutes: (routes: []) => void;
    setAccessToken: (token: AccessToken) => void;
    setIsAccessChecked: (isAccessChecked: boolean) => void;
    setLoginExpired: (loginExpired: boolean) => void;
    setRefreshToken: (token: AccessToken) => void;
  };
}

export const useAccessStore = create<AccessState & AccessActions>()(
  persist(
    (set) => ({
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
        setAccessMenus: (menus: AppRouteObject[]) => {
          set({ accessMenus: menus });
        },
        setAccessRoutes: (routes: []) => {
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
      },
    }),
    {
      name: 'core-access',
      partialize: ({
        accessCodes,
        accessMenus,
        accessRoutes,
        accessToken,
        isAccessChecked,
        loginExpired,
        refreshToken,
      }) => ({
        accessCodes,
        accessMenus,
        accessRoutes,
        accessToken,
        isAccessChecked,
        loginExpired,
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
  const { setAccessToken, setRefreshToken } = useAccessActions();

  const { loading: loginLoading, runAsync: loginHandle } = useRequest(
    loginApi,
    { manual: true }
  );

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   * @param onSuccess 成功之后的回调函数
   */
  const signIn = async (params: LoginAndRegisterParams) => {
    // 异步处理用户登录操作并获取 accessToken

    try {
      const res = await loginHandle(params);
      const { accessToken, refreshToken } = res;
      // 如果成功获取到 accessToken
      if (accessToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { signIn, loading: loginLoading };
};

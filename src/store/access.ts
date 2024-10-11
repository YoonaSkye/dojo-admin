import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from './types';
import {
  getAccessCodesApi,
  getAllMenusApi,
  getUserInfoApi,
  loginApi,
} from '@/api/core';
import { useUserActions } from './user';
import { useNavigate } from 'react-router-dom';

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
  accessMenus: [];
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
    setAccessMenus: (menus: []) => void;
    setAccessRoutes: (routes: []) => void;
    setAccessToken: (token: AccessToken) => void;
    setIsAccessChecked: (isAccessChecked: boolean) => void;
    setLoginExpired: (loginExpired: boolean) => void;
    setRefreshToken: (token: AccessToken) => void;
  };
}
// const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const HOMEPAGE = '/dashboard/analytics';

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
        setAccessMenus: (menus: []) => {
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
export const useAccessActions = () => useAccessStore((store) => store.actions);

export const useSignIn = () => {
  const { setAccessToken, setRefreshToken, setAccessCodes, setAccessMenus } =
    useAccessActions();
  const { setUserInfo } = useUserActions();
  const navigate = useNavigate();

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   * @param onSuccess 成功之后的回调函数
   */
  const signIn = async (params: LoginAndRegisterParams) => {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | UserInfo = null;

    try {
      const res = await loginApi(params);
      const { accessToken, refreshToken } = res;
      // 如果成功获取到 accessToken
      if (accessToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        // 获取用户信息并存储到 accessStore 中
        const [fetchUserInfoResult, accessCodes, menus] = await Promise.all([
          getUserInfoApi(),
          getAccessCodesApi(),
          getAllMenusApi(),
        ]);

        userInfo = fetchUserInfoResult;
        setUserInfo(userInfo);
        setAccessCodes(accessCodes);
        setAccessMenus(menus);

        navigate(HOMEPAGE, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return signIn;
};

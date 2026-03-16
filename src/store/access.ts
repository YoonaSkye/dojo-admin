import { persist } from 'zustand/middleware';

import { create } from './utils';

import type { MenuProps } from 'antd';

import { AppRouteObject } from '@/types';

type MenuItem = Required<MenuProps>['items'][number];

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

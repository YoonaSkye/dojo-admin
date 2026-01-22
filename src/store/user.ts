import { persist } from 'zustand/middleware';
import type { BasicUserInfo } from './types';
import { create } from './utils';

interface UserState {
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo | null;
  /**
   * 用户角色
   */
  userRoles: string[];
}

interface Actions {
  setUserInfo: (userInfo: BasicUserInfo | null) => void;
  setUserRoles: (roles: string[]) => void;
  reset: () => void;
}

export const useUserStore = create<UserState & Actions>()(
  persist(
    (set, _, store) => ({
      userInfo: null,
      userRoles: [],
      setUserInfo: (userInfo: BasicUserInfo | null) => {
        // 设置用户信息
        set({ userInfo });
        // 设置角色信息
        const roles = userInfo?.roles ?? [];
        set({ userRoles: roles });
      },
      setUserRoles: (roles: string[]) => {
        set({ userRoles: roles });
      },
      reset: () => {
        set(store.getInitialState());
      },
    }),
    {
      name: 'core-user',
      partialize: (store) => ({
        userInfo: store.userInfo,
        userRoles: store.userRoles,
      }),
    },
  ),
);

export const useUserInfo = () => useUserStore((store) => store.userInfo);
export const useUserRoles = () => useUserStore((store) => store.userRoles);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BasicUserInfo } from './types';

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
  actions: {
    setUserInfo: (userInfo: BasicUserInfo | null) => void;
    setUserRoles: (roles: string[]) => void;
  };
}

export const useUserStore = create<UserState & Actions>()(
  persist(
    (set) => ({
      userInfo: null,
      userRoles: [],
      actions: {
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
      },
    }),
    {
      name: 'core-user',
      partialize: (store) => ({
        userInfo: store.userInfo,
        userRoles: store.userRoles,
      }),
    }
  )
);

export const useUserInfo = () => useUserStore((store) => store.userInfo);
export const useUserRoles = () => useUserStore((store) => store.userRoles);
export const useUserActions = () => useUserStore((store) => store.actions);

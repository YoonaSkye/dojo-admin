import { create } from 'zustand';
import { UserToken, UserInfo } from '@/types/entity';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { StorageEnum } from '@/types/enum';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (userToken: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken: () => {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((store) => store.userInfo);
export const useUserToken = () => useUserStore((store) => store.userToken);
export const useUserPermissions = () =>
  useUserStore((store) => store.userInfo.permissions);
export const useUserActions = () => useUserStore((store) => store.actions);

export const useSignIn = () => {};

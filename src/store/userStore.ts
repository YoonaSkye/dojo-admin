import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';
import userService, { SignInReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  collapsed: boolean;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (userToken: UserToken) => void;
    clearUserInfoAndToken: () => void;
    setCollapsed: (collapsed: boolean) => void;
  };
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: getItem<UserInfo>(StorageEnum.User) || {},
      userToken: getItem<UserToken>(StorageEnum.Token) || {},
      collapsed: false,
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
        setCollapsed: (collapsed: boolean) => {
          set({ collapsed });
        },
      },
    }),
    {
      name: 'global',
      // storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ collapsed: state.collapsed }),
    }
  )
);

export const useUserInfo = () => useUserStore((store) => store.userInfo);
export const useUserToken = () => useUserStore((store) => store.userToken);
export const useCollapsed = () => useUserStore((store) => store.collapsed);
export const useUserPermission = () =>
  useUserStore((store) => store.userInfo.permissions);
export const useUserActions = () => useUserStore((store) => store.actions);

export const useSignIn = () => {
  const navigate = useNavigate();
  const { setUserInfo, setUserToken } = useUserActions();

  const signIn = async (data: SignInReq) => {
    const res = await userService.signin(data);
    if (res[0].data) {
      const { user, accessToken, refreshToken } = res[0].data;
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
      navigate(HOMEPAGE);
    }
  };

  return signIn;
};

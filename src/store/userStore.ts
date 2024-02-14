import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';
import userService, { SignInReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

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

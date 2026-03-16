import { startTransition, useState } from 'react';

import { getAccessCodesApi, getUserInfoApi, loginApi } from '@/api/core';
import { useRouter } from '@/router';
import { useAccessStore } from '@/store/access';
import { useUserStore } from '@/store/user';
import { resetAllStores } from '@/store/utils';
import { Recordable, UserInfo } from '@/types';
import { antdUtils } from '@/utils';

const LOGIN_PATH = '/auth/login';
const HOME_PAGE = import.meta.env.VITE_APP_HOMEPAGE || '/dashboard/analytics';

const useAuthLogin = () => {
  const setUserInfo = useUserStore((store) => store.setUserInfo);
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   * @param onSuccess 成功之后的回调函数
   */
  const authLogin = async (
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) => {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | UserInfo = null;

    try {
      setLoading(true);

      const res = await loginApi(params);
      const { accessToken } = res;
      // 如果成功获取到 accessToken
      if (accessToken) {
        useAccessStore.setState({ accessToken });

        // 获取用户信息并存储到 accessStore 中
        const [fetchUserInfoResult, accessCodes] = await Promise.all([
          getUserInfoApi(),
          getAccessCodesApi(),
        ]);

        userInfo = fetchUserInfoResult;

        setUserInfo(userInfo);
        useAccessStore.setState({ accessCodes });

        onSuccess
          ? await onSuccess?.()
          : replace(userInfo.homePath || HOME_PAGE);

        if (userInfo?.realName) {
          antdUtils.notification.success({
            description: `登录成功，欢迎 ${userInfo.realName}!`,
            duration: 3,
            message: `登录成功`,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { authLogin, loading };
};

const useSignOut = () => {
  const { replace, resetRoutes } = useRouter();

  function logout() {
    try {
      // await logoutApi();
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
      replace(LOGIN_PATH);
    });
  }

  return { logout };
};

export { useAuthLogin, useSignOut };

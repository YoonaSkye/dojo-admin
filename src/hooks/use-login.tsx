import { useRequest } from 'ahooks';
import { AuthApi, loginApi } from '@/api/core';
import { useAccessStore } from '@/store/access';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const { runAsync: login, loading: loginLoading } = useRequest(loginApi, {
    manual: true,
  });

  async function loginHandle(params: AuthApi.LoginParams) {
    try {
      const data = await login(params);
      useAccessStore.setState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      navigate('/');
    } catch (error) {
      // antd message tip
    }
  }
  return { login: loginHandle, loginLoading };
};

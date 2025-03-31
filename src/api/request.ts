import { useAccessStore } from '@/store/access';
import { mergeDeepLeft as merge } from 'ramda';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

export type Response<T> = Promise<[T, AxiosResponse<T>]>;

class RequestClient {
  private axiosInstance;
  /**
   * 构造函数，用于创建Axios实例
   * @param config - Axios请求配置，可选
   */
  constructor(config: CreateAxiosDefaults = {}) {
    // 合并默认配置和传入的配置
    const defaultConfig: CreateAxiosDefaults = {
      baseURL: import.meta.env.VITE_APP_BASE_API,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      // 默认超时时间
      timeout: 10_000,
    };
    const { ...axiosConfig } = config;
    const requestConfig = merge(
      axiosConfig,
      defaultConfig
    ) as CreateAxiosDefaults;
    this.axiosInstance = axios.create(requestConfig);

    this.axiosInstance.interceptors.request.use((axiosConfig) =>
      this.requestInterceptor(axiosConfig)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => this.responseSuccessInterceptor(response),
      (error) => this.responseErrorInterceptor(error)
    );
  }

  private async requestInterceptor(
    axiosConfig: InternalAxiosRequestConfig
  ): Promise<any> {
    const { accessToken } = useAccessStore.getState() || {};
    if (accessToken) {
      axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return Promise.resolve(axiosConfig);
  }

  private async responseSuccessInterceptor(
    response: AxiosResponse<any, any>
  ): Promise<any> {
    const { data: responseData, status } = response;
    const { code, data, message: msg } = responseData;
    if (status >= 200 && status < 400 && code === 0) {
      return data;
    }
    throw new Error(`Error ${status}: ${msg}`);
    // return Promise.resolve([response.data, response]);
  }

  private async responseErrorInterceptor(error: any): Promise<any> {
    return error;
  }

  /**
   * 通用的请求方法
   */
  public async request<T = any>(
    url: string,
    config: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance({
        url,
        ...config,
      });
      return response as T;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  }

  /**
   * GET请求方法
   */
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * POST请求方法
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'POST' });
  }

  /**
   * PUT请求方法
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'PUT' });
  }

  /**
   * DELETE请求方法
   */
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }
}

const requestClient = new RequestClient();
export const baseRequestClient = new RequestClient();

export default requestClient;

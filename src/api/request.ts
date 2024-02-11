import { UserToken } from '#/entity';
import { StorageEnum } from '#/enum';
import { getItem } from '@/utils/storage';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

export type Response<T> = Promise<[T, AxiosResponse<T>]>;

class Request {
  private axiosInstance;
  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);

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
    const { accessToken } = getItem<UserToken>(StorageEnum.Token) || {};
    if (accessToken) {
      axiosConfig.headers.Authorization = `Bear ${accessToken}`;
    }

    return Promise.resolve(axiosConfig);
  }

  private async responseSuccessInterceptor(
    response: AxiosResponse<any, any>
  ): Promise<any> {
    return Promise.resolve([response.data, response]);
  }

  private async responseErrorInterceptor(error: any): Promise<any> {}

  request<T, D = any>(config: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance(config);
  }

  get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Response<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Response<T> {
    return this.axiosInstance.put(url, data, config);
  }

  delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.delete(url, config);
  }
}

const request = new Request({ timeout: 60 * 1000 * 5 });

export default request;

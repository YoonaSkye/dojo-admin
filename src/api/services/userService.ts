import { UserInfo, UserToken } from '#/entity';
import request from '../request';

export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}

export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
  SignIn = '/auth/login',
  SignUp = '/auth/signup',
  Logout = '/auth/logout',
  Refresh = 'auth/refresh',
  User = '/user',
}

const signin = (data: SignInReq) =>
  request.post<SignInRes>(UserApi.SignIn, data);
const signup = (data: SignInReq) =>
  request.post<SignInRes>(UserApi.SignUp, data);
const logout = () => request.get(UserApi.Logout);
const findById = (id: string) =>
  request.get<UserInfo[]>(`${UserApi.User}/${id}`);

export default { signin, signup, logout, findById };

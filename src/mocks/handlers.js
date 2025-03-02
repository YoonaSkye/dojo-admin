import { http, HttpResponse } from 'msw';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} from './utils/jwt-utils';
import { MOCK_CODES, MOCK_MENUS, MOCK_USERS } from './utils/mock-data';
import {
  responseError,
  responseSuccess,
  unAuthorizedResponse,
} from './utils/response';

export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.

  http.post('/auth/login', async ({ request }) => {
    const { username, password } = await request.json();
    const user = MOCK_USERS.find((item) => item.username === username);
    if (!password || !username) {
      return new HttpResponse(
        responseError(
          'BadRequestException',
          'Username and password are required'
        ),
        {
          status: 400,
        }
      );
    }

    const findUser = MOCK_USERS.find(
      (item) => item.username === username && item.password === password
    );
    const accessToken = generateAccessToken(findUser);
    const refreshToken = generateRefreshToken(findUser);
    const cookie = `jwt=${refreshToken}`;

    return HttpResponse.json(
      responseSuccess({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
  }),

  http.post('/auth/logout', async ({ resquest }) => {
    return HttpResponse.json(responseSuccess(''));
  }),

  http.get('/auth/codes', async ({ request }) => {
    const userinfo = verifyAccessToken(request);
    if (!userinfo) {
      return HttpResponse.json(unAuthorizedResponse(), {
        status: 401,
      });
    }
    const codes =
      MOCK_CODES.find((item) => item.username === userinfo.username)?.codes ??
      [];

    return HttpResponse.json(responseSuccess(codes));
  }),

  http.get('/user/info', async ({ request }) => {
    const userinfo = verifyAccessToken(request);
    if (!userinfo) {
      return HttpResponse.json(unAuthorizedResponse(), {
        status: 401,
      });
    }

    return HttpResponse.json(responseSuccess(userinfo));
  }),

  http.get('/menu/all', async ({ request }) => {
    const userinfo = verifyAccessToken(request);
    if (!userinfo) {
      return HttpResponse.json(unAuthorizedResponse(), {
        status: 401,
      });
    }
    const user = MOCK_USERS.find((item) => item.username === userinfo.username);

    const menus =
      MOCK_MENUS.find((item) => item.username === userinfo.username)?.menus ??
      [];

    // const menus = user.permissions;

    return HttpResponse.json(responseSuccess(menus));
  }),
];

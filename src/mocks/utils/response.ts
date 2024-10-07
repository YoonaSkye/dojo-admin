export function responseSuccess<T = any>(data: T) {
  return {
    code: 0,
    data,
    error: null,
    message: 'ok',
  };
}

export function responseError(message: string, error: any = null) {
  return {
    code: -1,
    data: null,
    error,
    message,
  };
}

export function forbiddenResponse() {
  return responseError('ForbiddenException', 'Forbidden Exception');
}

export function unAuthorizedResponse() {
  return responseError('UnauthorizedException', 'Unauthorized Exception');
}

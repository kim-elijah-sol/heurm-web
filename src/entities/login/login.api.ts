import { https } from '~/shared/lib';
import { loginSchema, type LoginType } from '.';

export const postLogin = async (request: LoginType.PostLoginRequest) =>
  https
    .post<LoginType.PostLoginResponse>('/user/login', request)
    .then(https.validateResponse(loginSchema.postLoginResponseSchema));

import { toastAtError } from '~/shared/fx';
import { https } from '~/shared/lib';
import { loginFormValidator } from '~/shared/validator';
import { LoginRequest, LoginResponse } from '../model';
import { loginResponseSchema } from '../validator';

export const postLogin = async (request: LoginRequest) => {
  const loginRequestParse = loginFormValidator.safeParse(request);

  if (loginRequestParse.success === false) {
    toastAtError(loginRequestParse.error);

    throw loginRequestParse.error;
  }

  return https
    .post<LoginResponse>('/user/login', request)
    .then(https.validateResponse(loginResponseSchema))
    .catch((error) => {
      toastAtError(error);

      throw error;
    });
};

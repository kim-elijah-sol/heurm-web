import { https } from '~/shared/lib';
import { postLoginResponseSchema } from './login.schema';
import { PostLoginRequest, PostLoginResponse } from './login.type';

export const postLogin = async (request: PostLoginRequest) =>
  https
    .post<PostLoginResponse>('/user/login', request)
    .then(https.validateResponse(postLoginResponseSchema));

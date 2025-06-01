import { https } from '~/shared/lib';
import { ProfileResponse } from './user.type';
import { profileResponseSchema } from './user.validator';

export const getProfile = () =>
  https.get<ProfileResponse>('/user/profile').then((response) => {
    const profileResponseParse = profileResponseSchema.safeParse(response.data);

    if (profileResponseParse.success === false) {
      throw profileResponseParse.error;
    }

    return response.data;
  });

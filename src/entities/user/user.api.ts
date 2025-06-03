import { https } from '~/shared/lib';
import { ProfileResponse, UserSettingForm } from './user.type';
import { profileResponseSchema } from './user.validator';

export const getProfile = () =>
  https.get<ProfileResponse>('/user/profile').then((response) => {
    const profileResponseParse = profileResponseSchema.safeParse(response.data);

    if (profileResponseParse.success === false) {
      throw profileResponseParse.error;
    }

    return response.data;
  });

export const updateProfile = async (data: UserSettingForm) => {
  const formData = new FormData();

  for (const _key of Object.keys(data)) {
    const key = _key as keyof UserSettingForm;

    if (data[key] !== undefined) {
      formData.append(key, data[key] as any);
    }
  }

  return https.patch('/user/profile', formData).then((response) => {
    return response.data;
  });
};

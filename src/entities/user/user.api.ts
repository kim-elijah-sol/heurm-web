import { https } from '~/shared/lib';
import {
  LogoutRequest,
  LogoutResponse,
  ProfileResponse,
  UserSettingForm,
} from './user.type';
import { logoutResponseSchema, profileResponseSchema } from './user.validator';

export const getProfile = () =>
  https
    .get<ProfileResponse>('/user/profile')
    .then(https.validateResponse(profileResponseSchema));

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

export const deleteLogout = (data: LogoutRequest) =>
  https
    .delete<LogoutResponse>('/user/logout', {
      data,
    })
    .then(https.validateResponse(logoutResponseSchema));

import { https } from '~/shared/lib';
import { userSchema, type UserType } from '.';

export const getUserProfile = () =>
  https
    .get<UserType.GetUserProfileResponse>('/user/profile')
    .then(https.validateResponse(userSchema.getUserProfileResponseSchema));

export const patchUserProfile = async (
  data: UserType.PatchUserProfileRequest
) => {
  const formData = new FormData();

  for (const _key of Object.keys(data)) {
    const key = _key as keyof UserType.PatchUserProfileRequest;

    if (data[key] !== undefined) {
      formData.append(key, data[key] as any);
    }
  }

  return https
    .patch<UserType.PatchUserProfileResponse>('/user/profile', formData)
    .then(https.validateResponse(userSchema.patchUserProfileResponseSchema));
};

export const deleteLogout = (data: UserType.DeleteLogoutRequest) =>
  https
    .delete<UserType.DeleteLogoutResponse>('/user/logout', {
      data,
    })
    .then(https.validateResponse(userSchema.deleteLogoutResponseSchema));

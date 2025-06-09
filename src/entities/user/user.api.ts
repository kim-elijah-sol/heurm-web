import { https } from '~/shared/lib';
import {
  deleteLogoutResponseSchema,
  getUserProfileResponseSchema,
  patchUserProfileResponseSchema,
} from './user.schema';
import {
  DeleteLogoutRequest,
  DeleteLogoutResponse,
  GetUserProfileResponse,
  PatchUserProfileRequest,
  PatchUserProfileResponse,
} from './user.type';

export const getUserProfile = () =>
  https
    .get<GetUserProfileResponse>('/user/profile')
    .then(https.validateResponse(getUserProfileResponseSchema));

export const patchUserProfile = async (data: PatchUserProfileRequest) => {
  const formData = new FormData();

  for (const _key of Object.keys(data)) {
    const key = _key as keyof PatchUserProfileRequest;

    if (data[key] !== undefined) {
      formData.append(key, data[key] as any);
    }
  }

  return https
    .patch<PatchUserProfileResponse>('/user/profile', formData)
    .then(https.validateResponse(patchUserProfileResponseSchema));
};

export const deleteLogout = (data: DeleteLogoutRequest) =>
  https
    .delete<DeleteLogoutResponse>('/user/logout', {
      data,
    })
    .then(https.validateResponse(deleteLogoutResponseSchema));

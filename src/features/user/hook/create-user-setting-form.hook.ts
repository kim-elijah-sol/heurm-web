import { createEffect, createSignal, JSX } from 'solid-js';
import { userQueries, userSchema } from '~/entities/user';
import { toast } from '~/shared/lib';
import { passwordSchema } from '~/shared/schema';
import { Nullable } from '~/shared/types';

export const createUserSettingForm = () => {
  const profile = userQueries.getUserProfileQuery();

  const updateProfile = userQueries.patchUserProfileMutation(() => {
    profile.refetch();

    toast.open('Success to update your profile!');
  });

  const [name, setName] = createSignal('');

  const [profileImage, setProfileImage] = createSignal<Nullable<string>>(null);

  const [profileFile, setProfileFile] = createSignal<Nullable<File>>(null);

  const [currentPassword, setCurrentPassword] = createSignal('');

  const [newPassword, setNewPassword] = createSignal('');

  const [isProfileImageRemove, setIsProfileImageRemove] = createSignal(false);

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileFile(null);
    setIsProfileImageRemove(true);
  };

  const submitDisalbed = () => {
    return !(() => {
      if (
        userSchema.patchUserProfileRequestSchema.safeParse({
          name: name(),
          profileFile: profileFile(),
          currentPassword: currentPassword(),
          newPassword: newPassword(),
          isProfileImageRemove: isProfileImageRemove(),
        }).success === true
      ) {
        if (currentPassword().length > 0) {
          return (
            passwordSchema.safeParse(currentPassword()).success === true &&
            passwordSchema.safeParse(newPassword()).success === true
          );
        } else {
          return currentPassword().length + newPassword().length === 0;
        }
      }

      return false;
    })();
  };

  const handleSubmit = () => {
    if (!submitDisalbed()) {
      updateProfile.mutate({
        name: name(),
        profileFile: profileFile() ?? undefined,
        currentPassword: currentPassword() || undefined,
        newPassword: newPassword() || undefined,
        isProfileImageRemove: isProfileImageRemove() || undefined,
      });
    }
  };

  const handleUploadProfileImage: JSX.ChangeEventHandlerUnion<
    HTMLInputElement,
    Event
  > = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileFile(file);
      setProfileImage(URL.createObjectURL(file));
      setIsProfileImageRemove(false);
    }
  };

  createEffect(() => {
    if (profile.data) {
      setName(profile.data.name);
      setProfileImage(profile.data.profileImage);
      setIsProfileImageRemove(false);
      setProfileFile(null);
      setCurrentPassword('');
      setNewPassword('');
    }
  });

  return {
    name,
    setName,
    profileImage,
    handleUploadProfileImage,
    handleRemoveProfileImage,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    submitDisalbed,
    handleSubmit,
  };
};

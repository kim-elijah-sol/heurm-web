import { createEffect, createSignal, JSX } from 'solid-js';
import { userQueries, userValidator } from '~/entities/user';
import { toast } from '~/shared/lib';
import { Nullable } from '~/shared/model';
import { passwordValidator } from '~/shared/validator';

export const createUserSettingForm = () => {
  const profile = userQueries.useProfileQuery();

  const updateProfile = userQueries.useProfileMutation(() => {
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
        userValidator.userSettingFormSchema.safeParse({
          name: name(),
          profileFile: profileFile(),
          currentPassword: currentPassword(),
          newPassword: newPassword(),
          isProfileImageRemove: isProfileImageRemove(),
        }).success === true
      ) {
        if (currentPassword().length > 0) {
          return (
            passwordValidator.safeParse(currentPassword()).success === true &&
            passwordValidator.safeParse(newPassword()).success === true
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

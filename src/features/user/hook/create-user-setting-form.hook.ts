import { createEffect, createSignal, JSX } from 'solid-js';
import { userQueries, userValidator } from '~/entities/user';
import { Nullable } from '~/shared/model';
import { passwordValidator } from '~/shared/validator';

export const createUserSettingForm = () => {
  const profile = userQueries.useProfileQuery();

  const [name, setName] = createSignal('');

  const [profileImage, setProfileImage] = createSignal<Nullable<string>>(null);

  const [profileFile, setProfileFile] = createSignal<Nullable<File>>(null);

  const [currentPassword, setCurrentPassword] = createSignal('');

  const [newPassword, setNewPassword] = createSignal('');

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileFile(null);
  };

  const submitDisalbed = () => {
    return !(() => {
      if (
        userValidator.userSettingFormSchema.safeParse({
          name: name(),
          profileFile: profileFile(),
          currentPassword: currentPassword(),
          newPassword: newPassword(),
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

  const handleUploadProfileImage: JSX.ChangeEventHandlerUnion<
    HTMLInputElement,
    Event
  > = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  createEffect(() => {
    if (profile.data) {
      setName(profile.data.name);
      setProfileImage(profile.data.profileImage);
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
  };
};

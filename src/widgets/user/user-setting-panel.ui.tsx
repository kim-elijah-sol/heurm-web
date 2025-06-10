import { type Component } from 'solid-js';
import { createUserSettingForm } from '~/features/user/hook';
import {
  UserSettingCancelAccountButton,
  UserSettingForm,
  UserSettingProfile,
} from '~/features/user/ui';
import { Panel, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const UserSettingPanel: Component<Props> = (props) => {
  const {
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
  } = createUserSettingForm();

  return (
    <Panel.Slide close={props.close}>
      {(close) => (
        <div class='flex-1 pb-20'>
          <div class='w-full min-h-full flex flex-col justify-between'>
            <div class='flex flex-col gap-4 items-center'>
              <button
                onClick={close}
                class='p-[10px] rounded-[35%] transition-all bg-red-400 active:bg-red-500 active:scale-95 self-end'
              >
                <X size={24} />
              </button>

              <UserSettingProfile
                profileImage={profileImage}
                onRemoveProfileImage={handleRemoveProfileImage}
                onUploadProfileImage={handleUploadProfileImage}
              />

              <UserSettingForm>
                <UserSettingForm.Label>Your Name</UserSettingForm.Label>
                <UserSettingForm.Input
                  type='text'
                  value={name()}
                  onInput={(e) => setName(e.target.value)}
                />
              </UserSettingForm>

              <UserSettingForm>
                <UserSettingForm.Label>New Password</UserSettingForm.Label>
                <UserSettingForm.Input
                  type='password'
                  maxlength={16}
                  placeholder='current password'
                  class='mb-2'
                  value={currentPassword()}
                  onInput={(e) => setCurrentPassword(e.target.value)}
                />
                <UserSettingForm.Input
                  type='password'
                  maxlength={16}
                  placeholder='new password'
                  value={newPassword()}
                  onInput={(e) => setNewPassword(e.target.value)}
                />
              </UserSettingForm>
            </div>

            <UserSettingCancelAccountButton />
          </div>

          <Panel.CTAButton
            onClick={handleSubmit}
            disabled={submitDisalbed()}
            color={() => 'green'}
          >
            Save
          </Panel.CTAButton>
        </div>
      )}
    </Panel.Slide>
  );
};

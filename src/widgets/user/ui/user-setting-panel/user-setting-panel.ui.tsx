import { Component } from 'solid-js';
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

              <UserSettingProfile />

              <UserSettingForm>
                <UserSettingForm.Label>Your Name</UserSettingForm.Label>
                <UserSettingForm.Input type='text' />
              </UserSettingForm>

              <UserSettingForm>
                <UserSettingForm.Label>New Password</UserSettingForm.Label>
                <UserSettingForm.Input
                  type='password'
                  maxlength={16}
                  placeholder='current password'
                  class='mb-2'
                />
                <UserSettingForm.Input
                  type='password'
                  maxlength={16}
                  placeholder='new password'
                />
              </UserSettingForm>
            </div>

            <UserSettingCancelAccountButton />
          </div>

          <Panel.CTAButton color={() => 'green'}>Save</Panel.CTAButton>
        </div>
      )}
    </Panel.Slide>
  );
};

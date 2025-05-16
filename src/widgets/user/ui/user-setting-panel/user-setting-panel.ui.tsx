import { Component } from 'solid-js';
import { Panel, Trash2, X } from '~/shared/ui';

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

              <div
                class='relative'
                onClick={() => console.log('profile update')}
              >
                <img
                  class='rounded-[35%] w-20 h-20 transition-all duration-300 active:scale-95'
                  src='https://avatars.githubusercontent.com/u/86874556?v=4'
                  alt=''
                />

                <button
                  class='absolute -right-1 -top-1 p-1 rounded-full bg-gray-400 transition-all duration-300 active:scale-90'
                  onClick={(e) => {
                    e.stopPropagation();

                    console.log('profile remove');
                  }}
                >
                  <Trash2 />
                </button>
              </div>

              <div class='w-full'>
                <p class='mb-3 ml-1 font-semibold text-gray-500'>Your Name</p>
                <input
                  type='text'
                  class='font-semibold text-md py-3 px-4 rounded-[12px] bg-slate-100 transition-all duration-300 w-full focus:bg-slate-200'
                />
              </div>

              <div class='w-full'>
                <p class='mb-3 ml-1 font-semibold text-gray-500'>
                  New Password
                </p>
                <input
                  type='password'
                  maxlength={16}
                  class='font-semibold text-md py-3 px-4 rounded-[12px] bg-slate-100 transition-all duration-300 w-full focus:bg-slate-200 mb-2'
                  placeholder='current password'
                />
                <input
                  type='password'
                  maxlength={16}
                  class='font-semibold text-md py-3 px-4 rounded-[12px] bg-slate-100 transition-all duration-300 w-full focus:bg-slate-200'
                  placeholder='new password'
                />
              </div>
            </div>

            <button class='font-semibold text-slate-300 py-2 px-3 rounded-[12px] active:bg-slate-100 active:scale-95 transition-all'>
              Cancel Account
            </button>
          </div>

          <Panel.CTAButton color={() => 'green'}>Save</Panel.CTAButton>
        </div>
      )}
    </Panel.Slide>
  );
};

import { Component } from 'solid-js';
import { Panel, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const UserSettingPanel: Component<Props> = (props) => {
  return (
    <Panel.Slide close={props.close}>
      {(close) => (
        <div class='flex-1 flex flex-col gap-4'>
          <button
            onClick={close}
            class='p-[10px] rounded-[35%] transition-all bg-red-400 active:bg-red-500 active:scale-95 self-end'
          >
            <X size={24} />
          </button>

          <div class='w-full'>
            <p class='mb-3 ml-1 font-semibold text-gray-500'>Your Name</p>
            <input
              type='text'
              class='font-semibold text-xl py-2 px-3 rounded-[12px] bg-slate-100 transition-all duration-300 w-full focus:bg-slate-200'
            />
          </div>

          <Panel.CTAButton color={() => 'green'}>Save</Panel.CTAButton>
        </div>
      )}
    </Panel.Slide>
  );
};

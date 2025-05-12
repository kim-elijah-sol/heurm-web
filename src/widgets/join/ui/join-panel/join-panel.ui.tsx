import { Component } from 'solid-js';
import { JoinBanner } from '~/features/join/ui';
import { BluredPanel, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const JoinPanel: Component<Props> = (props) => {
  return (
    <BluredPanel close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full touch-none flex flex-col items-center justify-center'>
          <button
            type='button'
            onClick={close}
            class='p-2 rounded-[35%] transition-all active:scale-90 active:bg-red-600 bg-red-500 absolute right-6 top-6'
          >
            <X />
          </button>

          <JoinBanner />
        </div>
      )}
    </BluredPanel>
  );
};

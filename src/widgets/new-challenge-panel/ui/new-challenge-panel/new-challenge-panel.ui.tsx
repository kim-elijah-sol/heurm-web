import clsx from 'clsx';
import { createSignal } from 'solid-js';
import {
  ChallengeColor,
  CHALLENGE_ACTIVE_BG_400_COLOR,
  CHALLENGE_BG_COLOR,
} from '~/entities/main';
import { ChallengeColorSelect } from '~/features/main';
import { BluredPanel, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const NewChallengePanel = (props: Props) => {
  const [color, setColor] = createSignal<ChallengeColor>('red');

  return (
    <BluredPanel close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full touch-none flex flex-col justify-between px-4 pb-4 pt-[152px]'>
          <button
            onClick={close}
            class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-500 absolute right-6 top-6'
          >
            <X />
          </button>

          <div>
            <input
              type='text'
              class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 mb-10 text-center'
              placeholder='Challenge Name'
            />

            <ChallengeColorSelect color={color()} setColor={setColor} />
          </div>

          <button
            class={clsx(
              'w-full h-[46px] transition-all active:scale-[0.98] rounded-xl text-white font-semibold text-lg',
              CHALLENGE_BG_COLOR[color()],
              CHALLENGE_ACTIVE_BG_400_COLOR[color()]
            )}
            onClick={close}
          >
            Create
          </button>
        </div>
      )}
    </BluredPanel>
  );
};

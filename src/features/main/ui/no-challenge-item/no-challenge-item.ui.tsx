import clsx from 'clsx';
import { createMemo, type Accessor, type Component } from 'solid-js';
import { mainConstant } from '~/entities/main';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
} from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import type { FlowColor } from '~/shared/types';
import { Plus } from '~/shared/ui';

type Props = {
  color: Accessor<FlowColor>;
  onClick: () => void;
};

export const NoChallengeItem: Component<Props> = (props) => {
  const noChallengeItemWriting = createMemo(() =>
    getRandomItem(mainConstant.NO_CHALLENGE_ITEM_WRITING)
  );

  return (
    <div class='flex flex-col items-center justify-center p-4'>
      <p class='mb-4 text-center text-gray-500 font-semibold'>
        {noChallengeItemWriting()}
      </p>
      <button
        onClick={props.onClick}
        class={clsx(
          'p-3 rounded-[42%] transition-all active:scale-90',
          CHALLENGE_400_BG_COLOR[props.color()],
          CHALLENGE_ACTIVE_BG_500_COLOR[props.color()]
        )}
      >
        <Plus size={30} />
      </button>
    </div>
  );
};

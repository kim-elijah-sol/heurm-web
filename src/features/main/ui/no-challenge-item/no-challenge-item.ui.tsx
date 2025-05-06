import clsx from 'clsx';
import { createMemo } from 'solid-js';
import { NO_CHALLENGE_ITEM_WRITING } from '~/entities/main/constant';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
} from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';
import { Plus } from '~/shared/ui';

type Props = {
  color: ChallengeColor;
  onClick: () => void;
};

export const NoChallengeItem = (props: Props) => {
  const color = () => props.color;

  const noChallengeItemWriting = createMemo(() => {
    return NO_CHALLENGE_ITEM_WRITING[
      Math.floor(Math.random() * NO_CHALLENGE_ITEM_WRITING.length)
    ];
  });

  return (
    <div class='flex flex-col items-center justify-center p-4'>
      <p class='mb-4 text-center text-gray-500 font-semibold'>
        {noChallengeItemWriting()}
      </p>
      <button
        onClick={props.onClick}
        class={clsx(
          'p-3 rounded-[35%] transition-all active:scale-90',
          CHALLENGE_400_BG_COLOR[color()],
          CHALLENGE_ACTIVE_BG_500_COLOR[color()]
        )}
      >
        <Plus />
      </button>
    </div>
  );
};

import clsx from 'clsx';
import { createMemo, type Accessor, type Component } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { CHALLENGE_50_BG_COLOR } from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import type { FlowColor } from '~/shared/types';

type Props = {
  color: Accessor<FlowColor>;
};

export const ChallengeEditNoChallengeItem: Component<Props> = (props) => {
  const noChallengeItemWriting = createMemo(() =>
    getRandomItem(mainConstant.NO_CHALLENGE_ITEM_WRITING)
  );

  return (
    <div
      class={clsx(
        'py-6 px-4 rounded-[20px] mb-4 text-gray-500',
        CHALLENGE_50_BG_COLOR[props.color()]
      )}
    >
      <p class='text-center font-semibold'>{noChallengeItemWriting()}</p>
    </div>
  );
};

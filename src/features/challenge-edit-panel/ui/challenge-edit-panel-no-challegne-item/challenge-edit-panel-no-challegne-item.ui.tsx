import clsx from 'clsx';
import { Accessor, createMemo } from 'solid-js';
import { NO_CHALLENGE_ITEM_WRITING } from '~/entities/main/constant';
import { CHALLENGE_50_BG_COLOR } from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';

type Props = {
  color: Accessor<ChallengeColor>;
};

export const ChallengeEditPanelNoChallengeItem = (props: Props) => {
  const noChallengeItemWriting = createMemo(() => {
    return NO_CHALLENGE_ITEM_WRITING[
      Math.floor(Math.random() * NO_CHALLENGE_ITEM_WRITING.length)
    ];
  });

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

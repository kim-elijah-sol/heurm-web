import clsx from 'clsx';
import { Accessor, Component, createMemo } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { CHALLENGE_50_BG_COLOR } from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';

type Props = {
  color: Accessor<ChallengeColor>;
};

export const ChallengeEditNoChallengeItem: Component<Props> = (props) => {
  const noChallengeItemWriting = createMemo(() => {
    return mainConstant.NO_CHALLENGE_ITEM_WRITING[
      Math.floor(Math.random() * mainConstant.NO_CHALLENGE_ITEM_WRITING.length)
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

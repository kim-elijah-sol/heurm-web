import clsx from 'clsx';
import { createMemo, type Accessor, type Component } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import type { ChallengeColor } from '~/shared/types';

type Props = {
  color: Accessor<ChallengeColor>;
};

export const Today: Component<Props> = (props) => {
  const noChallengeItemWriting = createMemo(() => {
    return mainConstant.NO_CHALLENGE_ITEM_TODAY_WRITING[
      Math.floor(
        Math.random() * mainConstant.NO_CHALLENGE_ITEM_TODAY_WRITING.length
      )
    ];
  });

  return (
    <p
      class={clsx(
        'my-6 text-center font-semibold px-4',
        CHALLENGE_TEXT_COLOR_500[props.color()]
      )}
      innerHTML={noChallengeItemWriting()}
    />
  );
};

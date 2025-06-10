import clsx from 'clsx';
import { createMemo, type Accessor, type Component } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import type { ChallengeColor } from '~/shared/types';

type Props = {
  color: Accessor<ChallengeColor>;
};

export const Today: Component<Props> = (props) => {
  const noChallengeItemWriting = createMemo(() =>
    getRandomItem(mainConstant.NO_CHALLENGE_ITEM_TODAY_WRITING)
  );

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

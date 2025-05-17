import clsx from 'clsx';
import { Accessor, Component, createMemo } from 'solid-js';
import { NO_CHALLENGE_ITEM_TODAY_WRITING } from '~/entities/main/constant';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';

type Props = {
  color: Accessor<ChallengeColor>;
};

export const Today: Component<Props> = (props) => {
  const noChallengeItemWriting = createMemo(() => {
    return NO_CHALLENGE_ITEM_TODAY_WRITING[
      Math.floor(Math.random() * NO_CHALLENGE_ITEM_TODAY_WRITING.length)
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

import clsx from 'clsx';
import { createMemo, type Accessor, type Component } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { FLOW_TEXT_500 } from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import type { FlowColor } from '~/shared/types';

type Props = {
  color: Accessor<FlowColor>;
};

export const Today: Component<Props> = (props) => {
  const noChallengeItemWriting = createMemo(() =>
    getRandomItem(mainConstant.NO_FLOW_TODAY_WRITING)
  );

  return (
    <p
      class={clsx(
        'my-6 text-center font-semibold px-4',
        FLOW_TEXT_500[props.color()]
      )}
      innerHTML={noChallengeItemWriting()}
    />
  );
};

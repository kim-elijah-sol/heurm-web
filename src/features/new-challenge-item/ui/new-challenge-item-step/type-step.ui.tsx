import { clsx } from 'clsx';
import { type Accessor, type Component } from 'solid-js';
import type { ChallengeItemType, RollingDisplayType } from '~/shared/types';
import { CheckCheck, ChevronsDown, ChevronsUp } from '~/shared/ui';

type Props = {
  displayType: Accessor<RollingDisplayType>;
  onNext: (type: Uppercase<ChallengeItemType>) => void;
};

export const TypeStep: Component<Props> = (props) => {
  const buttonBaseClassName =
    'p-5 rounded-[42%] transition-all active:scale-90';

  return (
    <div
      class={clsx(
        'wys-new-challenge-item-step flex flex-col items-center gap-6',
        `wys-new-challenge-item-step-${props.displayType()}`
      )}
    >
      <button
        class={clsx(
          buttonBaseClassName,
          'bg-emerald-400 active:bg-emerald-500'
        )}
        onClick={() => props.onNext('COMPLETE')}
      >
        <CheckCheck size={40} />
      </button>
      <div class='flex gap-10'>
        <button
          class={clsx(buttonBaseClassName, 'bg-blue-400 active:bg-blue-500')}
          onClick={() => props.onNext('OVER')}
        >
          <ChevronsUp size={40} />
        </button>
        <button
          class={clsx(buttonBaseClassName, 'bg-rose-400 active:bg-rose-500')}
          onClick={() => props.onNext('UNDER')}
        >
          <ChevronsDown size={40} />
        </button>
      </div>
    </div>
  );
};

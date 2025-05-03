import { clsx } from 'clsx';
import { NewChallengeStepDisplayType } from '~/entities/main';
import { CheckCheck, ChevronsDown, ChevronsUp } from '~/shared/ui';

type Props = {
  displayType: NewChallengeStepDisplayType;
  onNext: (type: 'complete' | 'over' | 'under') => void;
};

export const TypeStep = (props: Props) => {
  const buttonBaseClassName =
    'p-6 rounded-[35%] transition-all active:scale-90';

  return (
    <div
      class={clsx(
        'wys-challenge-slide-panel-new-item-step flex flex-col items-center gap-8',
        `wys-challenge-slide-panel-new-item-step-${props.displayType}`
      )}
    >
      <button
        class={clsx(
          buttonBaseClassName,
          'bg-emerald-400 active:bg-emerald-500'
        )}
        onClick={() => props.onNext('complete')}
      >
        <CheckCheck />
      </button>
      <div class='flex gap-12'>
        <button
          class={clsx(buttonBaseClassName, 'bg-blue-400 active:bg-blue-500')}
          onClick={() => props.onNext('over')}
        >
          <ChevronsUp />
        </button>
        <button
          class={clsx(buttonBaseClassName, 'bg-rose-400 active:bg-rose-500')}
          onClick={() => props.onNext('under')}
        >
          <ChevronsDown />
        </button>
      </div>
    </div>
  );
};

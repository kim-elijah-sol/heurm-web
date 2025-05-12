import clsx from 'clsx';
import { Accessor, Component, Setter } from 'solid-js';
import { NewChallengeItemStepDisplayType } from '~/entities/new-challenge-item/model';
import { ArrowLeft, Check } from '~/shared/ui';

type Props = {
  count: Accessor<string>;
  setCount: Setter<string>;
  displayType: Accessor<NewChallengeItemStepDisplayType>;
  onNext: () => void;
  onPrev: () => void;
};

export const CountStep: Component<Props> = (props) => {
  const buttonBaseClassName = 'p-6 rounded-[35%] transition-all';

  const disabled = () => props.count().trim().length === 0;

  return (
    <div
      class={clsx(
        'wys-new-challenge-item-step flex flex-col items-center gap-8',
        `wys-new-challenge-item-step-${props.displayType()}`
      )}
    >
      <input
        type='number'
        pattern='[0-9]*'
        inputMode='numeric'
        class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 text-center'
        placeholder='Target'
        value={props.count()}
        onInput={(e) => props.setCount(e.target.value)}
      />

      <div class='flex gap-12'>
        <button
          class={clsx(
            buttonBaseClassName,
            'bg-gray-400 active:bg-gray-500 active:scale-90'
          )}
          onClick={props.onPrev}
        >
          <ArrowLeft />
        </button>

        <button
          class={clsx(
            buttonBaseClassName,
            disabled()
              ? 'bg-gray-500'
              : 'bg-green-400 active:bg-green-500 active:scale-90'
          )}
          onClick={props.onNext}
        >
          <Check />
        </button>
      </div>
    </div>
  );
};

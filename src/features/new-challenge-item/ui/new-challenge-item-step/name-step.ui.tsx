import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import type { RollingDisplayType } from '~/shared/types';
import { ArrowLeft, Check } from '~/shared/ui';

type Props = {
  name: Accessor<string>;
  setName: Setter<string>;
  displayType: Accessor<RollingDisplayType>;
  onNext: () => void;
  onPrev: () => void;
};

export const NameStep: Component<Props> = (props) => {
  const buttonBaseClassName = 'p-6 rounded-[35%] transition-all';

  const disabled = () => props.name().trim().length === 0;

  return (
    <div
      class={clsx(
        'wys-new-challenge-item-step flex flex-col items-center gap-8',
        `wys-new-challenge-item-step-${props.displayType()}`
      )}
    >
      <input
        type='text'
        class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 text-center'
        placeholder='Challenge Item Name'
        value={props.name()}
        onInput={(e) => props.setName(e.target.value)}
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
          disabled={disabled()}
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

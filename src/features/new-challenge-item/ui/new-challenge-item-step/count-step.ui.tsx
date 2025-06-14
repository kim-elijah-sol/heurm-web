import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import type { RollingDisplayType } from '~/shared/types';
import { ArrowLeft, Check, GlassInput } from '~/shared/ui';

type Props = {
  count: Accessor<string>;
  setCount: Setter<string>;
  unit: Accessor<string>;
  setUnit: Setter<string>;
  displayType: Accessor<RollingDisplayType>;
  onNext: () => void;
  onPrev: () => void;
};

export const CountStep: Component<Props> = (props) => {
  const buttonBaseClassName = 'p-5 rounded-[42%] transition-all';

  const disabled = () => props.count().trim().length === 0;

  return (
    <div
      class={clsx(
        'wys-new-challenge-item-step flex flex-col items-center gap-8',
        `wys-new-challenge-item-step-${props.displayType()}`
      )}
    >
      <div class='flex gap-3 w-full'>
        <GlassInput
          type='number'
          pattern='[0-9]*'
          inputMode='numeric'
          class='text-slate-800 text-2xl h-16 font-semibold placeholder:text-gray-400 text-center flex-[1.5] w-1'
          placeholder='Target'
          value={props.count()}
          onInput={(e) => props.setCount(e.target.value)}
        />

        <GlassInput
          type='text'
          class='text-slate-800 text-2xl h-16 font-semibold placeholder:text-gray-400 text-center flex-1 w-1'
          placeholder='Unit'
          value={props.unit()}
          onInput={(e) => props.setUnit(e.target.value)}
        />
      </div>

      <div class='flex gap-10'>
        <button
          class={clsx(
            buttonBaseClassName,
            'bg-gray-400 active:bg-gray-500 active:scale-90'
          )}
          onClick={props.onPrev}
        >
          <ArrowLeft size={40} />
        </button>

        <button
          class={clsx(
            buttonBaseClassName,
            disabled()
              ? 'bg-gray-300'
              : 'bg-green-400 active:bg-green-500 active:scale-90'
          )}
          onClick={props.onNext}
        >
          <Check size={40} />
        </button>
      </div>
    </div>
  );
};

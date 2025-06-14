import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import type { RollingDisplayType } from '~/shared/types';
import { ArrowLeft, Check, GlassInput } from '~/shared/ui';

type Props = {
  name: Accessor<string>;
  setName: Setter<string>;
  displayType: Accessor<RollingDisplayType>;
  onNext: () => void;
  onPrev: () => void;
};

export const NameStep: Component<Props> = (props) => {
  const buttonBaseClassName = 'p-5 rounded-[42%] transition-all';

  const disabled = () => props.name().trim().length === 0;

  return (
    <div
      class={clsx(
        'wys-new-challenge-item-step flex flex-col items-center gap-8',
        `wys-new-challenge-item-step-${props.displayType()}`
      )}
    >
      <GlassInput
        type='text'
        class='text-slate-800 text-2xl h-16 font-semibold placeholder:text-gray-400 text-center w-full'
        placeholder='Challenge Item Name'
        value={props.name()}
        onInput={(e) => props.setName(e.target.value)}
      />

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
          disabled={disabled()}
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

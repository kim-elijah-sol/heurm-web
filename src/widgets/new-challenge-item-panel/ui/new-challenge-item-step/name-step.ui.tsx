import clsx from 'clsx';
import { Setter } from 'solid-js';
import { NewChallengeStepDisplayType } from '~/entities/main';
import { ArrowLeft, Check } from '~/shared/ui';

type Props = {
  name: string;
  setName: Setter<string>;
  displayType: NewChallengeStepDisplayType;
  onNext: () => void;
  onPrev: () => void;
};

export const NameStep = (props: Props) => {
  const buttonBaseClassName =
    'p-6 rounded-[35%] transition-all active:scale-90';

  return (
    <div
      class={clsx(
        'wys-new-challenge-item-step flex flex-col items-center gap-8',
        `wys-new-challenge-item-step-${props.displayType}`
      )}
    >
      <input
        type='text'
        class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 text-center'
        placeholder='Challenge Item Name'
        value={props.name}
        onInput={(e) => props.setName(e.target.value)}
      />

      <div class='flex gap-12'>
        <button
          class={clsx(buttonBaseClassName, 'bg-gray-400 active:bg-gray-500')}
          onClick={props.onPrev}
        >
          <ArrowLeft />
        </button>

        <button
          class={clsx(buttonBaseClassName, 'bg-green-400 active:bg-green-500')}
          onClick={props.onNext}
        >
          <Check />
        </button>
      </div>
    </div>
  );
};

import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import type { RollingDisplayType } from '~/shared/types';
import { Check, GlassInput } from '~/shared/ui';
import { getLoginHelperFormStepDisplayClass } from '../../fx';

type Props = {
  displayType: Accessor<RollingDisplayType>;
  email: Accessor<string>;
  setEmail: Setter<string>;
  isSummitable: Accessor<boolean>;
};

export const EmailStep: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'flex flex-col items-center transition-all duration-300 gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 w-full',
        getLoginHelperFormStepDisplayClass(props.displayType())
      )}
    >
      <GlassInput
        type='email'
        class='text-slate-800 text-xl h-16 font-semibold w-full placeholder:text-gray-400 text-center'
        placeholder='email'
        value={props.email()}
        onInput={(e) => props.setEmail(e.target.value)}
      />

      <button
        type='submit'
        disabled={!props.isSummitable()}
        class={clsx(
          'p-[18px] rounded-[42%] transition-all',
          !props.isSummitable()
            ? 'bg-gray-300'
            : 'bg-green-400 active:bg-green-500 active:scale-90'
        )}
      >
        <Check />
      </button>
    </div>
  );
};

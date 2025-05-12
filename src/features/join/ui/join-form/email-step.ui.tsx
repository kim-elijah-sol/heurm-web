import clsx from 'clsx';
import { Accessor, Setter, type Component } from 'solid-js';
import { JoinStepDisplayType } from '~/entities/join/model';
import { Check } from '~/shared/ui';
import { getJoinStepDisplayClass } from '../../fx';

type Props = {
  displayType: Accessor<JoinStepDisplayType>;
  email: Accessor<string>;
  setEmail: Setter<string>;
  isSummitable: Accessor<boolean>;
};

export const EmailStep: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'flex flex-col items-center transition-all duration-300 gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 w-full',
        getJoinStepDisplayClass(props.displayType())
      )}
    >
      <input
        type='email'
        class='text-slate-800 text-xl h-14 font-semibold w-full placeholder:text-gray-400 text-center bg-gray-200/50 rounded-[12px] backdrop-blur-md'
        placeholder='email'
        value={props.email()}
        onInput={(e) => props.setEmail(e.target.value)}
      />

      <button
        type='submit'
        disabled={!props.isSummitable()}
        class={clsx(
          'p-4 rounded-[35%] transition-all',
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

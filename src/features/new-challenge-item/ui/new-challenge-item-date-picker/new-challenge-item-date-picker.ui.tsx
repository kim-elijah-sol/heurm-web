import clsx from 'clsx';
import { format } from 'date-fns';
import { type Accessor, type Component, type Setter } from 'solid-js';
import type { Nullable } from '~/shared/types';

type Props = {
  date: Accessor<Nullable<Date>>;
  onChange: Setter<Nullable<Date>>;
  placeholder?: string;
};

export const NewChallengeItemDatePicker: Component<Props> = (props) => {
  const date = () => props.date();

  return (
    <button class='px-4 py-4 rounded-[24px] flex-1 transition-all bg-slate-100 active:bg-slate-200 active:scale-95'>
      <p
        class={clsx(
          'font-semibold transition-all text-left',
          !date() && 'text-gray-400'
        )}
      >
        {date() ? format(date()!, 'yyyy.MM.dd') : props.placeholder}
      </p>
    </button>
  );
};

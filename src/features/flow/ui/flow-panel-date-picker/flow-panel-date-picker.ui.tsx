import clsx from 'clsx';
import { format } from 'date-fns';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { WeekCalendar } from '~/features/main/ui';
import { createBoolean } from '~/shared/hook';
import type { Nullable } from '~/shared/types';
import { X } from '~/shared/ui';

type Props = {
  date: Accessor<Nullable<Date>>;
  onChange: Setter<Nullable<Date>>;
  placeholder?: string;
  removable?: boolean;
};

export const FlowPanelDatePicker: Component<Props> = (props) => {
  const [isWeekCalendarOpened, open, _close] = createBoolean();

  const [isClosing, closeStart, closeEnd] = createBoolean();

  const date = () => props.date();

  const close = () => {
    closeStart();
    setTimeout(() => {
      closeEnd();
      _close();
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => (isWeekCalendarOpened() ? close() : open())}
        class={clsx(
          'px-4 py-4 rounded-[24px] flex-1 transition-all active:scale-95 relative',
          !isWeekCalendarOpened()
            ? 'bg-slate-100 active:bg-slate-200'
            : 'bg-slate-200 active:bg-slate-300'
        )}
      >
        <p
          class={clsx(
            'font-semibold transition-all text-left',
            !date() && 'text-gray-400'
          )}
        >
          {date() ? format(date()!, 'yyyy.MM.dd') : props.placeholder}
        </p>

        {props.removable && props.date() !== null && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.onChange(null);
            }}
            class='absolute top-1/2 -translate-y-1/2 right-2 p-1 rounded-[42%] transition-all active:scale-95 active:bg-slate-300'
          >
            <X size={24} stroke='#333' />
          </button>
        )}
      </button>

      {isWeekCalendarOpened() && (
        <WeekCalendar
          date={props.date}
          onChange={(date) => {
            props.onChange(date);
            close();
          }}
          isClosing={isClosing}
          onClose={close}
          position='bottom'
        />
      )}
    </>
  );
};

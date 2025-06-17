import clsx from 'clsx';
import { format } from 'date-fns';
import { type Accessor, type Component } from 'solid-js';
import { createBoolean } from '~/shared/hook';
import { CalendarRange } from '~/shared/ui';
import { WeekCalendar } from '../week-calendar';

type Props = {
  date: Accessor<Date>;
  onChange: (date: Date) => void;
};

export const WeekPicker: Component<Props> = (props) => {
  const [isWeekCalendarOpened, open, _close] = createBoolean();

  const [isClosing, closeStart, closeEnd] = createBoolean();

  const close = () => {
    closeStart();
    setTimeout(() => {
      closeEnd();
      _close();
    }, 300);
  };

  return (
    <>
      <div
        onClick={() => (isWeekCalendarOpened() ? close() : open())}
        class={clsx(
          'font-semibold px-2 py-1 rounded-[14px] transition-all duration-200 active:scale-[98%] active:bg-slate-200 flex items-center gap-[6px]',
          isWeekCalendarOpened() ? 'text-slate-900' : 'text-slate-500'
        )}
      >
        <CalendarRange />
        {format(props.date(), 'yyyy.MM.dd')}
      </div>
      {isWeekCalendarOpened() && (
        <WeekCalendar
          date={props.date}
          onChange={(date) => {
            props.onChange(date);
            close();
          }}
          isClosing={isClosing}
          onClose={close}
        />
      )}
    </>
  );
};

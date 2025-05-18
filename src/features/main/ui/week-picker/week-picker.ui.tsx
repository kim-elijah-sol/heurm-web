import clsx from 'clsx';
import { format } from 'date-fns';
import { Accessor, Component } from 'solid-js';
import { createBoolean } from '~/shared/hook';
import { CalendarRange } from '~/shared/ui';

type Props = {
  date: Accessor<Date>;
  onChange: (date: Date) => void;
};

export const WeekPicker: Component<Props> = (props) => {
  const [isWeekCalendarOpened, open, close] = createBoolean();

  return (
    <div class='mb-4 flex justify-center'>
      <div
        onClick={() => (isWeekCalendarOpened() ? close() : open())}
        class={clsx(
          'font-semibold px-2 py-1 rounded-[10px] transition-all duration-200 active:scale-[98%] active:bg-slate-200 flex items-center gap-[6px]',
          isWeekCalendarOpened() ? 'text-slate-900' : 'text-slate-500'
        )}
      >
        <CalendarRange />
        {format(props.date(), 'yyyy.MM.dd')}
      </div>
    </div>
  );
};

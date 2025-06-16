import clsx from 'clsx';
import {
  createMemo,
  createSignal,
  type Accessor,
  type Component,
} from 'solid-js';
import { ChevronLeft, ChevronRight, X } from '~/shared/ui';
import { getMidnight, isSameDate } from '../../fx';
import { createDateSelect } from '../../hook';
import './week-calendar.ui.css';

type Props = {
  date: Accessor<Date>;
  onChange: (date: Date) => void;
  isClosing: Accessor<boolean>;
  onClose: () => void;
};

export const WeekCalendar: Component<Props> = (props) => {
  const { current } = createDateSelect();

  const [year, setYear] = createSignal(props.date().getFullYear());

  const [month, setMonth] = createSignal(props.date().getMonth() + 1);

  const handlePrevMonth = () => {
    let prevMonth = month() - 1;

    if (prevMonth === 0) {
      prevMonth = 12;
      setYear(year() - 1);
    }

    setMonth(prevMonth);
  };

  const handleNextMonth = () => {
    let nextMonth = month() + 1;

    if (nextMonth === 13) {
      nextMonth = 1;
      setYear(year() + 1);
    }

    setMonth(nextMonth);
  };

  const weeks = createMemo(() => {
    const y = year();
    const m = month();

    const firstDate = new Date(y, m - 1, 1);
    const lastDate = new Date(y, m, 0);

    const startDate = new Date(firstDate);
    startDate.setDate(firstDate.getDate() - firstDate.getDay());

    const endDate = new Date(lastDate);
    endDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

    const weeks: Array<Array<Date | null>> = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      const week: Array<Date | null> = [];

      for (let i = 0; i < 7; i++) {
        const dateCopy = getMidnight(current);
        week.push(dateCopy.getMonth() + 1 === m ? dateCopy : null);
        current.setDate(current.getDate() + 1);
      }

      weeks.push(week);
    }

    return weeks;
  });

  return (
    <div
      class={clsx(
        'week-calendar absolute top-full w-full p-2 rounded-2xl z-20 flex flex-col gap-3',
        props.isClosing() && 'closing'
      )}
    >
      <button
        type='button'
        onClick={props.onClose}
        class='p-1 rounded-[42%] transition-all active:scale-95 active:bg-red-600 bg-red-500 self-end'
      >
        <X size={24} />
      </button>

      <div class='flex items-center justify-between text-slate-700'>
        <button
          class='p-1 rounded-[42%] transition-all active:scale-95 active:bg-slate-200'
          onClick={handlePrevMonth}
        >
          <ChevronLeft />
        </button>

        <p class='text-slate-700 font-semibold'>
          {year()}.{month().toString().padStart(2, '0')}
        </p>

        <button
          class='p-1 rounded-[42%] transition-all active:scale-95 active:bg-slate-200'
          onClick={handleNextMonth}
        >
          <ChevronRight />
        </button>
      </div>

      <div class='flex flex-col gap-2'>
        {weeks().map((week) => (
          <div class='flex justify-between gap-2'>
            {week.map((date) => {
              if (date === null) return <div class='week-calendar-date' />;

              return (
                <div
                  onClick={() => props.onChange(date)}
                  class={clsx(
                    'relative flex items-center justify-center week-calendar-date clickable rounded-[42%] font-semibold text-slate-800 transition-all duration-200',
                    isSameDate(date, getMidnight(current())) ? 'selected' : ''
                  )}
                >
                  {date.getDate()}

                  {isSameDate(date, getMidnight()) && (
                    <div class='absolute left-1/2 bottom-1 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-800' />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

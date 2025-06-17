import clsx from 'clsx';
import {
  createMemo,
  createSignal,
  type Accessor,
  type Component,
} from 'solid-js';
import type { Nullable } from '~/shared/types';
import { ChevronLeft, ChevronRight, X } from '~/shared/ui';
import { getMidnight, isSameDate } from '../../fx';
import './week-calendar.ui.css';

type Props = {
  date: Accessor<Nullable<Date>>;
  onChange: (date: Date) => void;
  isClosing: Accessor<boolean>;
  onClose: () => void;
  class?: Accessor<string>;
};

export const WeekCalendar: Component<Props> = (props) => {
  const current = () => props.date() ?? new Date();

  const [year, setYear] = createSignal(current().getFullYear());

  const [month, setMonth] = createSignal(current().getMonth() + 1);

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
        props.isClosing() && 'closing',
        props.class?.()
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

              const day = date.getDay();

              const textColor =
                day === 0
                  ? 'text-rose-600'
                  : day === 6
                  ? 'text-blue-600'
                  : 'text-slate-800';

              const dotColor =
                day === 0
                  ? 'bg-rose-600'
                  : day === 6
                  ? 'bg-blue-600'
                  : 'bg-slate-800';

              return (
                <div
                  onClick={() => props.onChange(date)}
                  class={clsx(
                    'relative flex items-center justify-center week-calendar-date clickable rounded-[42%] font-semibold transition-all duration-200',
                    textColor,
                    props.date() && isSameDate(date, getMidnight(props.date()!))
                      ? 'selected'
                      : ''
                  )}
                >
                  {date.getDate()}

                  {isSameDate(date, getMidnight()) && (
                    <div
                      class={clsx(
                        'absolute left-1/2 bottom-1 -translate-x-1/2 w-1 h-1 rounded-full',
                        dotColor
                      )}
                    />
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

import { format } from 'date-fns';
import { Index } from 'solid-js';
import { mainQueries } from '~/entities/main';
import { getMidnight, isSameDate } from '~/features/main/fx';
import { createDateSelect } from '~/features/main/hook';
import { DateCard, WeekPicker } from '~/features/main/ui';

export const DateSelect = () => {
  const { current, weeks, setCurrent } = createDateSelect();

  const getHistoryByWeek = mainQueries.getHistoryByWeekQuery(() => ({
    start: format(weeks()[0], 'yyyy-MM-dd'),
    end: format(weeks()[weeks().length - 1], 'yyyy-MM-dd'),
  }));

  const data = () => getHistoryByWeek.data;

  return (
    <div class='mb-4'>
      <WeekPicker date={current} onChange={setCurrent} />
      <div class='flex gap-2 justify-between'>
        <Index each={weeks()}>
          {(date) => {
            const formatedDate = () => format(date(), 'yyyy-MM-dd');

            return (
              <DateCard
                date={date}
                isCurrent={() => isSameDate(date(), current())}
                isToday={() => isSameDate(date(), getMidnight())}
                onClick={() => setCurrent(date())}
                win={() => data()?.[formatedDate()]?.win ?? 0}
                all={() => data()?.[formatedDate()]?.all ?? 0}
              />
            );
          }}
        </Index>
      </div>
    </div>
  );
};

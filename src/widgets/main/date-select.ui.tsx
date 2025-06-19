import { format } from 'date-fns';
import { Index } from 'solid-js';
import { getMidnight, isSameDate } from '~/features/main/fx';
import { createDateSelect } from '~/features/main/hook';
import { DateCard, WeekPicker } from '~/features/main/ui';

export const DateSelect = () => {
  const { current, weeks, setCurrent } = createDateSelect();

  const data = () => [] as any;

  return (
    <div class='mb-4'>
      <div class='mb-4 flex justify-center relative'>
        <WeekPicker date={current} onChange={setCurrent} />
      </div>
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
                all={() => data()?.[formatedDate()]?.all ?? 0}
                win={() => data()?.[formatedDate()]?.win ?? 0}
                lose={() => data()?.[formatedDate()]?.lose ?? 0}
              />
            );
          }}
        </Index>
      </div>
    </div>
  );
};

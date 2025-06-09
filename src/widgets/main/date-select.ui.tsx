import { Index } from 'solid-js';
import { getMidnight, isSameDate } from '~/features/main/fx';
import { createDateSelect } from '~/features/main/hook';
import { DateCard, WeekPicker } from '~/features/main/ui';

export const DateSelect = () => {
  const { current, weeks, setCurrent } = createDateSelect();

  return (
    <div class='mb-4'>
      <WeekPicker date={current} onChange={setCurrent} />
      <div class='flex gap-2 justify-between'>
        <Index each={weeks()}>
          {(date) => (
            <DateCard
              date={date}
              isCurrent={() => isSameDate(date(), current())}
              isToday={() => isSameDate(date(), getMidnight())}
              onClick={() => setCurrent(date())}
              status={() => 'pending'}
            />
          )}
        </Index>
      </div>
    </div>
  );
};

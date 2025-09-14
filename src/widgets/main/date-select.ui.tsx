import { Index } from 'solid-js';
import { isSameDate } from '~/features/main/fx';
import { createDateSelect } from '~/features/main/hook';
import { DateCard, WeekPicker } from '~/features/main/ui';
import { getMidnight } from '~/shared/fx';

export const DateSelect = () => {
  const { current, weeks, setCurrent } = createDateSelect();

  return (
    <div class='mb-4'>
      <div class='mb-4 flex justify-center relative'>
        <WeekPicker date={current} onChange={setCurrent} />
      </div>
      <div class='flex gap-2 justify-between'>
        <Index each={weeks()}>
          {(date) => {
            return (
              <DateCard
                date={date}
                isCurrent={() => isSameDate(date(), current())}
                isToday={() => isSameDate(date(), getMidnight())}
                onClick={() => setCurrent(date())}
              />
            );
          }}
        </Index>
      </div>
    </div>
  );
};

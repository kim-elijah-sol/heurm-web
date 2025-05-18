import { For } from 'solid-js';
import { getMidnight, isSameDate } from '~/features/main/fx';
import { createDateSelect } from '~/features/main/hook';
import { DateCard } from '~/features/main/ui';

export const DateSelect = () => {
  const { current, weeks, setCurrent } = createDateSelect();

  return (
    <div class='flex gap-2 mb-4'>
      <For each={weeks()}>
        {(date) => (
          <DateCard
            date={() => date}
            isCurrent={() => isSameDate(date, current())}
            isToday={() => isSameDate(date, getMidnight())}
            onClick={() => setCurrent(date)}
            status={() => 'pending'}
          />
        )}
      </For>
    </div>
  );
};

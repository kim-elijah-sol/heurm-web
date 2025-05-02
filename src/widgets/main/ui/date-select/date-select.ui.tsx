import { createEffect, For } from 'solid-js';
import { createDateSelect } from '~/entities/main';
import { DateCard, isSameDate } from '~/features/main';
import './date-select.ui.css';

export const DateSelect = () => {
  const { current, setCurrent, dates } = createDateSelect();

  let container: HTMLDivElement;

  createEffect(() => {
    let scrollX = 0;

    for (const date of dates()) {
      if (isSameDate(date, current())) {
        break;
      }

      scrollX += 60 + 16;
    }

    container.scrollTo({ left: scrollX, behavior: 'smooth' });
  });

  return (
    <div
      ref={(ref) => (container = ref)}
      class='wys-date-select-container flex items-center gap-4 overflow-x-auto w-[100vw] ml-[-16px] py-2 h-[124px]'
    >
      <For each={dates()}>
        {(date) => (
          <DateCard
            date={date}
            isCurrent={isSameDate(date, current())}
            onClick={() => setCurrent(date)}
          />
        )}
      </For>
    </div>
  );
};

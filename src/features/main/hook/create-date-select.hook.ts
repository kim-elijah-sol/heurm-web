import { createSignal } from 'solid-js';

export const createDateSelect = () => {
  const start = new Date('2025-03-21');

  const end = new Date('2025-04-22');

  const [current, setCurrent] = createSignal(new Date('2025-04-22'));

  const dates = () => {
    const dates = [];
    let currentDate = new Date(start);

    if (end < start) {
      return [];
    }

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  return {
    current,
    setCurrent,
    dates,
  };
};

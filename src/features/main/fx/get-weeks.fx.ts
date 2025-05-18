import { getMidnight } from './get-midnight.fx';

export const getWeeks = (_today: Date) => {
  const today = getMidnight(_today);

  const weeks: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const diff = i - today.getDay();
    const date = new Date(today);
    date.setDate(today.getDate() + diff);
    weeks.push(date);
  }

  return weeks;
};

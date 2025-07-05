export const getWeekWriting = (week: number) => {
  if (week === 6) return 'Last Week';

  const suffix =
    week === 1 ? 'st' : week === 2 ? 'nd' : week === 3 ? 'rd' : 'th';

  return `${week}${suffix} Week`;
};

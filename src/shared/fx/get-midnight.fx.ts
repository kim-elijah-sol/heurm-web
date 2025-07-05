export const getMidnight = (date?: string | number | Date) =>
  new Date(new Date(date ?? Date.now()).setHours(0, 0, 0, 0));

export const getRange = (count: number, start: number = 0) =>
  Array.from({ length: count }).map((_, index) => index + start);

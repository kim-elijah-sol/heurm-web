export const getRandomItem = <T>(data: readonly T[]): T =>
  data[Math.floor(Math.random() * (data.length - 1))];

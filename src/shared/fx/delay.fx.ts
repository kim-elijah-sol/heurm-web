export const delay: (ms: number) => Promise<null> = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

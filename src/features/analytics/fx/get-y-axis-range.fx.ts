export const getYAxisRange = (data: number[]) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  let paddedMin = min - range * 0.25;

  const step = Math.pow(10, Math.floor(Math.log10(range)) - 1);
  paddedMin = Math.floor(paddedMin / step) * step;

  return {
    min: paddedMin,
    max,
  };
};

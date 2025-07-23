import { type HistoryType } from '~/entities/history';

export const accumulateHistoryCount = (
  acc: number,
  it: HistoryType.GetHistoryResponseItem
) => {
  return acc + (it.count ?? 0);
};

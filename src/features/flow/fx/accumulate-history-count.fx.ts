import { type HistoryType } from '~/entities/history';

export const accumulateHistoryCount = (
  acc: number,
  it: Pick<HistoryType.GetHistoryResponseItem, 'count'>
) => {
  return acc + (it.count ?? 0);
};

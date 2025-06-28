import { type MainType } from '~/entities/main';

export const accumulateHistoryCount = (
  acc: number,
  it: MainType.GetHistoryResponseItem
) => {
  return acc + (it.count ?? 0);
};

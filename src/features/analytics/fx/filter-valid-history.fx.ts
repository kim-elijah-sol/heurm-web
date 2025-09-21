import { HistoryType } from '~/entities/history';

export const filterValidHistory = (
  history: Pick<HistoryType.GetHistoryResponseItem, 'count' | 'complete'>
) => history.count !== null || history.complete !== null;

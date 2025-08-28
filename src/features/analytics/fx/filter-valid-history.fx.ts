import { HistoryType } from '~/entities/history';

export const filterValidHistory = (
  history: HistoryType.GetHistoryResponseItem
) => history.count !== null || history.complete !== null;

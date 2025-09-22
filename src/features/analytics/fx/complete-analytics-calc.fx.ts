import { type HistoryType } from '~/entities/history';
import { type AnalyticsResult } from '../types';

export const completeAnalyticsCalc = (
  targetHistory: Pick<HistoryType.GetHistoryResponseItem, 'complete'>
): AnalyticsResult => {
  if (targetHistory.complete === true) {
    return 3;
  } else {
    return 0;
  }
};

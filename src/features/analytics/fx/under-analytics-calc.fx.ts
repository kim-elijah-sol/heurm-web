import { type FlowType } from '~/entities/flow';
import { type HistoryType } from '~/entities/history';
import { type AnalyticsResult } from '../types';

export const underAnalyticsCalc = (
  targetHistory: Pick<HistoryType.GetHistoryResponseItem, 'count'>,
  flow: Pick<FlowType.GetFlowResponseItem, 'targetCount'>
): AnalyticsResult => {
  const targetHistoryCount = targetHistory?.count!;

  const targetCount = flow.targetCount!;

  if (targetCount >= targetHistoryCount) return 3;

  const ratio = targetHistoryCount / targetCount;

  if (ratio >= 2) {
    return 0;
  }
  if (ratio >= 1.5) {
    return 1;
  }
  return 2;
};

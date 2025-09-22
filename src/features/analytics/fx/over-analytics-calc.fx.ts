import { type FlowType } from '~/entities/flow';
import { type HistoryType } from '~/entities/history';
import { type AnalyticsResult } from '../types';

export const overAnalyticsCalc = (
  targetHistory: Pick<HistoryType.GetHistoryResponseItem, 'count'>,
  flow: Pick<FlowType.GetFlowResponseItem, 'targetCount'>
): AnalyticsResult => {
  const targetHistoryCount = targetHistory.count!;

  const targetCount = flow.targetCount!;

  const ratio = Math.min(
    Math.floor((targetHistoryCount / targetCount) * 3),
    3
  ) as 0 | 1 | 2 | 3;

  return ratio;
};

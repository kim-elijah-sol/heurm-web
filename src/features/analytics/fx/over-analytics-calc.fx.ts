import { AnalyticsCalcFx } from '../types';
import { baseAnalyticsCalc } from './base-analytics-calc.fx';

export const overAnalyticsCalc: AnalyticsCalcFx = baseAnalyticsCalc(
  (targetHistory, flow) => {
    const targetHistoryCount = targetHistory.count!;

    const targetCount = flow.targetCount!;

    const ratio = Math.min(
      Math.round((targetHistoryCount / targetCount) * 3),
      3
    ) as 0 | 1 | 2 | 3;

    return ratio;
  }
);

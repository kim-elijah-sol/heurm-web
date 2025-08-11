import { AnalyticsCalcFx } from '../types';
import { baseAnalyticsCalc } from './base-analytics-calc.fx';

export const underAnalyticsCalc: AnalyticsCalcFx = baseAnalyticsCalc(
  (targetHistory, flow) => {
    const targetHistoryCount = targetHistory?.count ?? null;

    const targetCount = flow.targetCount!;

    if (targetHistoryCount === null) {
      return 0;
    }

    const ratio = Math.floor(
      3 -
        Math.min(Math.max(targetHistoryCount - targetCount, 0) / targetCount, 3)
    ) as 0 | 1 | 2 | 3;

    return ratio;
  }
);

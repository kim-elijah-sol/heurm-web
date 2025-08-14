import { AnalyticsCalcFx } from '../types';
import { baseAnalyticsCalc } from './base-analytics-calc.fx';

export const underAnalyticsCalc: AnalyticsCalcFx = baseAnalyticsCalc(
  (targetHistory, flow) => {
    const targetHistoryCount = targetHistory?.count ?? null;

    const targetCount = flow.targetCount!;

    if (targetHistoryCount === null) {
      return 0;
    }

    if (targetCount >= targetHistoryCount) return 3;

    return 0;
  }
);

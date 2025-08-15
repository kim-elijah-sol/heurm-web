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

    const ratio = targetHistoryCount / targetCount;

    if (ratio >= 2) {
      return 0;
    }
    if (ratio >= 1.5) {
      return 1;
    }
    return 2;
  }
);

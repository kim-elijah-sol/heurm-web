import { AnalyticsCalcFx } from '../types';
import { baseAnalyticsCalc } from './base-analytics-calc.fx';

export const underAnalyticsCalc: AnalyticsCalcFx = baseAnalyticsCalc(
  (targetHistory, flow) => {
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
  }
);

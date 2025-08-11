import { AnalyticsCalcFx } from '../types';
import { baseAnalyticsCalc } from './base-analytics-calc.fx';

export const completeAnalyticsCalc: AnalyticsCalcFx = baseAnalyticsCalc(
  (targetHistory) => {
    if (targetHistory?.complete === true) {
      return 3;
    } else {
      return 0;
    }
  }
);

import { isSameDate } from '~/features/main/fx';
import { getMidnight } from '~/shared/fx';
import { AnalyticsCalcFx, AnalyticsResult } from '../types';

const ONE_DAY = 86_400_000;

export const overAnalyticsCalc: AnalyticsCalcFx =
  (startDate) => (flow) => (history) => {
    const result: AnalyticsResult[] = [];

    let current = startDate.valueOf();

    const today = getMidnight().valueOf();

    const startAt = getMidnight(flow.startAt).valueOf();

    for (; current <= today; current += ONE_DAY) {
      if (startAt > current) {
        result.push('past');

        continue;
      }

      const targetHistory = history.find((history) =>
        isSameDate(getMidnight(history.date), getMidnight(current))
      );

      const targetHistoryCount = targetHistory?.count ?? 0;

      const targetCount = flow.targetCount!;

      const ratio = Math.min(
        Math.round((targetHistoryCount / targetCount) * 3),
        3
      ) as 0 | 1 | 2 | 3;

      result.push(ratio);
    }

    return result;
  };

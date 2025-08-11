import { FlowType } from '~/entities/flow';
import type { HistoryType } from '~/entities/history';
import { isSameDate } from '~/features/main/fx';
import { getMidnight } from '~/shared/fx';
import type { Nullable } from '~/shared/types';
import type { AnalyticsCalcFx, AnalyticsResult } from '../types';

const ONE_DAY = 86_400_000;

export const baseAnalyticsCalc: (
  callback: (
    history: Nullable<HistoryType.GetHistoryResponseItem>,
    flow: FlowType.GetFlowResponseItem
  ) => AnalyticsResult
) => AnalyticsCalcFx = (callback) => (startDate) => (flow) => (history) => {
  const result: AnalyticsResult[] = [];

  let current = startDate.valueOf();

  const today = getMidnight().valueOf();

  const startAt = getMidnight(flow.startAt).valueOf();

  for (; current <= today; current += ONE_DAY) {
    if (startAt > current) {
      result.push('past');

      continue;
    }

    const targetHistory =
      history.find((history) =>
        isSameDate(getMidnight(history.date), getMidnight(current))
      ) ?? null;

    const callbackResult = callback(targetHistory, flow);

    result.push(callbackResult);
  }

  return result;
};

import { FlowType } from '~/entities/flow';
import type { HistoryType } from '~/entities/history';
import { isSameDate } from '~/features/main/fx';
import { getMidnight } from '~/shared/fx';
import type { AnalyticsCalcFx, AnalyticsResult } from '../types';
import { isRestDay } from './is-rest-day.fx';

const ONE_DAY = 86_400_000;

export const baseAnalyticsCalc: (
  callback: (
    history: HistoryType.GetHistoryResponseItem,
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

    if (isRestDay(current)(flow)) {
      result.push('rest');

      continue;
    }

    const targetHistory = history.find((history) =>
      isSameDate(getMidnight(history.date), getMidnight(current))
    );

    if (targetHistory === undefined) {
      result.push('not-recored');

      continue;
    }

    const callbackResult = callback(targetHistory, flow);

    result.push(callbackResult);
  }

  return result;
};

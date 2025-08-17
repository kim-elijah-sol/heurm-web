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
  const startValue = startDate.valueOf();

  const todayValue = getMidnight().valueOf();

  const flowStartAtValue = getMidnight(flow.startAt).valueOf();

  return Array.from({
    length: (todayValue - startValue + ONE_DAY) / ONE_DAY,
  }).reduce<AnalyticsResult[]>((result, _, day) => {
    const current = startValue + day * ONE_DAY;

    if (flowStartAtValue > current) return result.concat('past');
    if (isRestDay(current)(flow)) return result.concat('rest');

    const targetHistory = history.find((history) =>
      isSameDate(getMidnight(history.date), getMidnight(current))
    );

    if (targetHistory === undefined) return result.concat('not-recored');

    return result.concat(callback(targetHistory, flow));
  }, []);
};

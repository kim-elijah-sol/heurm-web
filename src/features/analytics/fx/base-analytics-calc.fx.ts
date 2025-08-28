import { type FlowType } from '~/entities/flow';
import type { HistoryType } from '~/entities/history';
import { isSameDate } from '~/features/main/fx';
import { dateFormat, getMidnight } from '~/shared/fx';
import type { Nullable } from '~/shared/types';
import type {
  AnalyticsCalcFx,
  AnalyticsResult,
  AnalyticsResultObject,
} from '../types';
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

  const flowEndAtValue = flow.endAt ? getMidnight(flow.endAt).valueOf() : null;

  return Array.from({
    length: (todayValue - startValue + ONE_DAY) / ONE_DAY,
  }).reduce<AnalyticsResultObject[]>((result, _, day) => {
    let accumulateId: Nullable<string> = null;

    const current = startValue + day * ONE_DAY;

    if (flow.accumulateType) {
      if (flow.accumulateType === 'WEEKLY') {
        const currentDate = new Date(current);

        const currentDay = currentDate.getDay();

        const weekFirstDate = new Date(current - currentDay * ONE_DAY);

        accumulateId = dateFormat['yyyy-MM-dd'](weekFirstDate);
      }
    }

    if (flowStartAtValue > current)
      return result.concat({
        result: 'past',
        accumulateId,
      });
    if (flowEndAtValue && flowEndAtValue < current) return result;
    if (isRestDay(current)(flow))
      return result.concat({
        result: 'rest',
        accumulateId,
      });

    const targetHistory = history.find((history) =>
      isSameDate(getMidnight(history.date), getMidnight(current))
    );

    if (targetHistory === undefined)
      return result.concat({
        result: 'not-recored',
        accumulateId,
      });

    return result.concat({
      result: callback(targetHistory, flow),
      accumulateId,
    });
  }, []);
};

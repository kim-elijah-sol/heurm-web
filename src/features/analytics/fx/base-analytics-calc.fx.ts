import { type FlowType } from '~/entities/flow';
import type { HistoryType } from '~/entities/history';
import { isSameDate } from '~/features/main/fx';
import { ONE_DAY } from '~/shared/constant';
import { getMidnight } from '~/shared/fx';
import type { Nullable } from '~/shared/types';
import type {
  AnalyticsCalcFx,
  AnalyticsResult,
  AnalyticsResultObject,
} from '../types';
import { filterValidHistory } from './filter-valid-history.fx';
import { getAccumulateId } from './get-accumulate-id.fx';
import { isRestDay } from './is-rest-day.fx';

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

  const validHistory = history.filter(filterValidHistory);

  const historyWithAccumulateId = validHistory.map((history) => {
    const current = new Date(history.date).valueOf();

    let accumulateId: Nullable<string> = null;

    if (flow.accumulateType === 'WEEKLY')
      accumulateId = getAccumulateId.weekly(current);

    return {
      ...history,
      accumulateId,
    };
  });

  const historyCountStackedByAccmulateId = historyWithAccumulateId.map((it) => {
    const { accumulateId } = it;

    if (accumulateId !== null) {
      const stackedCount = historyWithAccumulateId
        .filter((it) => it.accumulateId === accumulateId)
        .map(({ count }) => count!)
        .reduce((acc, current) => acc + current, 0);

      return {
        ...it,
        count: stackedCount,
      };
    }

    return it;
  });

  return Array.from({
    length: (todayValue - startValue + ONE_DAY) / ONE_DAY,
  })
    .reduce<AnalyticsResultObject[]>((result, _, day) => {
      const current = startValue + day * ONE_DAY;

      let accumulateId: Nullable<string> = null;

      if (flow.accumulateType === 'WEEKLY')
        accumulateId = getAccumulateId.weekly(current);

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

      const targetHistory = historyCountStackedByAccmulateId.find((history) =>
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
    }, [])
    .map((it, _, original) => {
      const { result, accumulateId } = it;

      if (typeof result === 'number' && accumulateId !== null) {
        const maxResultByAccumulateId = Math.max(
          ...(original
            .filter(
              (it) =>
                it.accumulateId === accumulateId &&
                typeof it.result === 'number'
            )
            .map(({ result }) => result) as number[])
        );

        return {
          ...it,
          result: maxResultByAccumulateId as AnalyticsResult,
        };
      }

      return it;
    });
};

import { type FlowType } from '~/entities/flow';
import type { HistoryType } from '~/entities/history';
import { isSameDate } from '~/features/main/fx';
import { ONE_DAY } from '~/shared/constant';
import { getMidnight } from '~/shared/fx';
import type { Nullable } from '~/shared/types';
import type {
  AnalyticsAccumulateGroupPosition,
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
    else if (flow.accumulateType === 'MONTHLY')
      accumulateId = getAccumulateId.monthly(current);
    else if (flow.accumulateType === 'YEARLY')
      accumulateId = getAccumulateId.yearly(current);

    return {
      ...history,
      accumulateId,
    };
  });

  const stackedCountCacheMap: Record<string, number> = {};

  const resultIdsByAccumulateIdMap: Record<string, number[]> = {};

  const historyCountStackedByAccmulateId = historyWithAccumulateId.map((it) => {
    const { accumulateId } = it;

    if (accumulateId !== null) {
      const stackedCountCache = stackedCountCacheMap[accumulateId];

      if (stackedCountCache) {
        return {
          ...it,
          count: stackedCountCache,
        };
      }

      const stackedCount = historyWithAccumulateId
        .filter((it) => it.accumulateId === accumulateId)
        .map(({ count }) => count!)
        .reduce((acc, current) => acc + current, 0);

      stackedCountCacheMap[accumulateId] = stackedCount;

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
    .reduce<
      Omit<AnalyticsResultObject & { id: number }, 'accumulateGroupPosition'>[]
    >((result, _, day) => {
      const current = startValue + day * ONE_DAY;

      let accumulateId: Nullable<string> = null;

      if (flow.accumulateType === 'WEEKLY')
        accumulateId = getAccumulateId.weekly(current);
      else if (flow.accumulateType === 'MONTHLY')
        accumulateId = getAccumulateId.monthly(current);
      else if (flow.accumulateType === 'YEARLY')
        accumulateId = getAccumulateId.yearly(current);

      if (flowStartAtValue > current)
        return result.concat({
          result: 'past',
          accumulateId,
          id: day,
        });
      if (flowEndAtValue && flowEndAtValue < current) return result;
      if (isRestDay(current)(flow))
        return result.concat({
          result: 'rest',
          accumulateId,
          id: day,
        });

      const targetHistory = historyCountStackedByAccmulateId.find((history) =>
        isSameDate(getMidnight(history.date), getMidnight(current))
      );

      if (targetHistory === undefined)
        return result.concat({
          result: 'not-recored',
          accumulateId,
          id: day,
        });

      return result.concat({
        result: callback(targetHistory, flow),
        accumulateId,
        id: day,
      });
    }, [])
    .map<AnalyticsResultObject>((it, _, result) => {
      let accumulateGroupPosition: AnalyticsAccumulateGroupPosition = null;

      if (it.accumulateId) {
        let resultIds = resultIdsByAccumulateIdMap[it.accumulateId];

        if (!resultIds) {
          const sameAccumulateIdResult = result.filter(
            ({ accumulateId }) => it.accumulateId === accumulateId
          );
          resultIds = sameAccumulateIdResult.map((it) => it.id);

          resultIdsByAccumulateIdMap[it.accumulateId] = resultIds;
        }

        const indexAtResultIds = resultIds.indexOf(it.id);

        accumulateGroupPosition =
          indexAtResultIds === 0
            ? 'first'
            : indexAtResultIds === resultIds.length - 1
            ? 'last'
            : 'middle';
      }

      return {
        ...it,
        accumulateGroupPosition,
      };
    });
};

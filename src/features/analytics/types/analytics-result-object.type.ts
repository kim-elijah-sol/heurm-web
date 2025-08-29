import type { Nullable } from '~/shared/types';
import type { AnalyticsAccumulateGroupPosition } from './analytics-accumulate-group-position.type';
import type { AnalyticsResult } from './analytics-result.type';

export type AnalyticsResultObject = {
  result: AnalyticsResult;
  accumulateId: Nullable<string>;
  accumulateGroupPosition: AnalyticsAccumulateGroupPosition;
};

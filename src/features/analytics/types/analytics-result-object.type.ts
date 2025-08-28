import type { Nullable } from '~/shared/types';
import type { AnalyticsResult } from './analytics-result.type';

export type AnalyticsResultObject = {
  result: AnalyticsResult;
  accumulateId: Nullable<string>;
};

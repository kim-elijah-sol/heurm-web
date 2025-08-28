import type { FlowType } from '~/entities/flow';
import type { HistoryType } from '~/entities/history';
import type { AnalyticsResultObject } from './analytics-result-object.type';

export type AnalyticsCalcFx = (
  startDate: Date
) => (
  flow: FlowType.GetFlowResponseItem
) => (history: HistoryType.GetHistoryResponse) => AnalyticsResultObject[];

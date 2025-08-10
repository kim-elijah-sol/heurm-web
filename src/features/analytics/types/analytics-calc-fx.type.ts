import { FlowType } from '~/entities/flow';
import { HistoryType } from '~/entities/history';
import { AnalyticsResult } from './analytics-result.type';

export type AnalyticsCalcFx = (
  startDate: Date
) => (
  flow: FlowType.GetFlowResponseItem
) => (history: HistoryType.GetHistoryResponse) => AnalyticsResult[];

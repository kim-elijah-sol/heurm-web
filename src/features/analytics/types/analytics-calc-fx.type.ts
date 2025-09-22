import { type FlowType } from '~/entities/flow';
import { type HistoryType } from '~/entities/history';
import { type AnalyticsResult } from './analytics-result.type';

export type AnalyticsCalcFx = (
  history: HistoryType.GetHistoryResponseItem,
  flow: FlowType.GetFlowResponseItem
) => AnalyticsResult;

import { type FlowType } from '~/entities/flow';
import { isRestDay } from '~/features/analytics/fx';
import { getMidnight } from '~/shared/fx';

type RequiredFlowItemProperty =
  | 'repeat'
  | 'rest'
  | 'intervalType'
  | 'months'
  | 'weeks'
  | 'dates'
  | 'days'
  | 'startAt'
  | 'endAt';

type FilterValidFlow = (
  current: number
) => (
  flow: Pick<FlowType.GetFlowResponseItem, RequiredFlowItemProperty>
) => boolean;

export const filterValidFlow: FilterValidFlow = (current) => (flow) => {
  const startAt = getMidnight(flow.startAt).valueOf();

  if (current < startAt) return false;
  if (flow.endAt && current > getMidnight(flow.endAt).valueOf()) return false;

  return !isRestDay(current)(flow);
};

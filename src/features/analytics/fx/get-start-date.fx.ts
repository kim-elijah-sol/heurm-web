import { FlowType } from '~/entities/flow';
import { getMidnight } from '~/shared/fx';

export const getStartDate: (
  flow: Array<Pick<FlowType.GetFlowResponseItem, 'startAt'>>
) => Date = (flow) => {
  if (flow.length === 0) throw new Error('Flow is empty');

  return getMidnight(
    Math.min(...flow.map((it) => getMidnight(it.startAt).valueOf()))
  );
};

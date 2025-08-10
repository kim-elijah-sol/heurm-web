import { FlowType } from '~/entities/flow';
import { getMidnight } from '~/shared/fx';

export const getStartDate: (flow: FlowType.GetFlowResponse) => Date = (
  flow
) => {
  return getMidnight(
    Math.min(...flow.map((it) => getMidnight(it.startAt).valueOf()))
  );
};

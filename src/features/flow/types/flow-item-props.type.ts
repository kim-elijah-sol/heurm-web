import { type Accessor } from 'solid-js';
import { type FlowType } from '~/entities/flow';

export type FlowItemProps = {
  flow: Accessor<FlowType.GetFlowResponseItem>;
};

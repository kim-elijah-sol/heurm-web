import { https } from '~/shared/lib';
import { flowSchema, FlowType } from '.';

export const getFlow = () =>
  https
    .get<FlowType.GetFlowResponse>('/flow')
    .then(https.validateResponse(flowSchema.getFlowResponseSchema));

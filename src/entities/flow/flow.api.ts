import { https } from '~/shared/lib';
import { flowSchema, type FlowType } from '.';

export const getFlow = () =>
  https
    .get<FlowType.GetFlowResponse>('/flow')
    .then(https.validateResponse(flowSchema.getFlowResponseSchema));

export const postFlow = (body: FlowType.PostFlowRequest) =>
  https
    .post<FlowType.PostFlowResponse>('/flow', body)
    .then(https.validateResponse(flowSchema.postFlowResponseSchema));

export const patchFlow = (body: FlowType.PatchFlowRequest) =>
  https
    .patch<FlowType.PatchFlowResponse>('/flow', body)
    .then(https.validateResponse(flowSchema.patchFlowResponseSchema));

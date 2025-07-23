import { https } from '~/shared/lib';
import { flowWaveSchema, type FlowWaveType } from '.';

export const postFlowWave = (body: FlowWaveType.PostFlowWaveRequest) =>
  https
    .post('/flow-wave', body)
    .then(https.validateResponse(flowWaveSchema.postFlowWaveResponseSchema));

import { https } from '~/shared/lib';
import { flowWaveSchema, type FlowWaveType } from '.';

export const postFlowWave = (body: FlowWaveType.PostFlowWaveRequest) =>
  https
    .post('/flow-wave', body)
    .then(https.validateResponse(flowWaveSchema.postFlowWaveResponseSchema));

export const deleteFlowWave = (data: FlowWaveType.DeleteFlowWaveRequest) =>
  https
    .delete('/flow-wave', { data })
    .then(https.validateResponse(flowWaveSchema.deleteFlowWaveResponseSchema));

import { https } from '~/shared/lib';
import { waveSchema, type WaveType } from '.';

export const getWave = () =>
  https
    .get<WaveType.GetWaveResponse>('/wave')
    .then(https.validateResponse(waveSchema.getWaveResponseSchema));

export const postWave = (body: WaveType.PostWaveRequest) =>
  https
    .post<WaveType.PostWaveResponse>('/wave', body)
    .then(https.validateResponse(waveSchema.postWaveResponseSchema));

export const patchWave = (body: WaveType.PatchWaveRequest) =>
  https
    .patch<WaveType.PatchWaveResponse>('/wave', body)
    .then(https.validateResponse(waveSchema.patchWaveResponseSchema));

export const deleteWave = (data: WaveType.DeleteWaveRequest) =>
  https
    .delete<WaveType.DeleteWaveResponse>('/wave', { data })
    .then(https.validateResponse(waveSchema.deleteWaveResponseSchema));

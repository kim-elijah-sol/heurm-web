import { https } from '~/shared/lib';
import { waveSchema, type WaveType } from '.';

export const getWave = () =>
  https
    .get<WaveType.GetWaveResponse>('/wave')
    .then(https.validateResponse(waveSchema.getWaveResponseSchema));

export const postWave = (body: WaveType.PostWaveRequest) =>
  https
    .post('/wave', body)
    .then(https.validateResponse(waveSchema.postWaveResponseSchema));

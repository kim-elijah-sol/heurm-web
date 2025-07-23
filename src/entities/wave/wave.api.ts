import { https } from '~/shared/lib';
import { waveSchema, type WaveType } from '.';

export const getWave = () =>
  https
    .get<WaveType.GetWaveResponse>('/wave')
    .then(https.validateResponse(waveSchema.getWaveResponseSchema));

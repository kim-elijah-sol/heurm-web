import { z } from 'zod';
import { flowWaveSchema } from '.';

export type PostFlowWaveRequest = z.infer<
  typeof flowWaveSchema.postFlowWaveRequestSchema
>;

export type PostFlowWaveResponse = z.infer<
  typeof flowWaveSchema.postFlowWaveResponseSchema
>;

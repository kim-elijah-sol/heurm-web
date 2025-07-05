import { https } from '~/shared/lib';
import { historySchema, type HistoryType } from '.';

export const getHistory = (params: HistoryType.GetHistoryRequest) =>
  https
    .get<HistoryType.GetHistoryResponse>('/history', {
      params,
    })
    .then(https.validateResponse(historySchema.getHistoryResponseSchema));

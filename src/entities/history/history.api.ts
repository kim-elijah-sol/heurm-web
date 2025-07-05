import { https } from '~/shared/lib';
import { historySchema, type HistoryType } from '.';

export const getHistory = (params: HistoryType.GetHistoryRequest) =>
  https
    .get<HistoryType.GetHistoryResponse>('/history', {
      params,
    })
    .then(https.validateResponse(historySchema.getHistoryResponseSchema));

export const postHistory = (body: HistoryType.PostHistoryRequest) =>
  https
    .post<HistoryType.PostHistoryResponse>('/history', body)
    .then(https.validateResponse(historySchema.postHistoryResponseSchema));

export const patchHistory = (body: HistoryType.PatchHistoryRequest) =>
  https
    .patch<HistoryType.PatchHistoryResponse>('/history', body)
    .then(https.validateResponse(historySchema.patchHistoryResponseSchema));

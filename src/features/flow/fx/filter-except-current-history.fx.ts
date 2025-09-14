import { type Accessor } from 'solid-js';
import { type HistoryType } from '~/entities/history';
import { findCurrentHistory } from './find-current-history.fx';

export const filterExceptCurrentHistory =
  (current: Accessor<Date>) =>
  (it: Pick<HistoryType.GetHistoryResponseItem, 'date'>) =>
    !findCurrentHistory(current)(it);

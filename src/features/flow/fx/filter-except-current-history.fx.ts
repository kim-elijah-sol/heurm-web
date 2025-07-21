import { type Accessor } from 'solid-js';
import { type HistoryType } from '~/entities/history';
import { findCurrentHistory } from './find-current-history.fx';

export const filterExceptCurrentHistory =
  (current: Accessor<Date>) => (it: HistoryType.GetHistoryResponseItem) =>
    !findCurrentHistory(current)(it);

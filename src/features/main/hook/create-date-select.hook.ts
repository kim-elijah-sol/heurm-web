import { createMemo, createSignal } from 'solid-js';
import { getMidnight } from '~/shared/fx';
import { getWeeks } from '../fx';

const [current, _setCurrent] = createSignal<Date>(getMidnight());

export const createDateSelect = () => {
  const weeks = createMemo(() => getWeeks(current()));

  const setCurrent = (date: Date) => _setCurrent(getMidnight(date));

  return {
    current,
    setCurrent,
    weeks,
  };
};

import { describe, expect, test } from 'vitest';
import { getWeekWriting } from '~/features/flow/fx';

describe('get-week-writing', () => {
  test.each([
    [1, '1st Week'],
    [2, '2nd Week'],
    [3, '3rd Week'],
    [4, '4th Week'],
    [5, '5th Week'],
    [6, 'Last Week'],
  ])('%s주차인 경우 %s 를 반환한다.', (week, result) => {
    expect(getWeekWriting(week)).toBe(result);
  });
});

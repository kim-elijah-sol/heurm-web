import { describe, expect, test } from 'vitest';
import { filterMonthHistory } from '~/features/flow/fx';

describe('filter-month-history', () => {
  test('현재 조회 중인 날짜에 년/월을 비교하여 적합하면 true 를 반환한다.', () => {
    expect(
      filterMonthHistory(() => new Date('2025-09-01'))({
        date: '2025-09-30',
      })
    ).toBe(true);
  });

  test('현재 조회 중인 날짜에 년/월을 비교하여 적합하지 않다면 false 를 반환한다.', () => {
    expect(
      filterMonthHistory(() => new Date('2024-09-01'))({
        date: '2025-09-30',
      })
    ).toBe(false);
  });
});

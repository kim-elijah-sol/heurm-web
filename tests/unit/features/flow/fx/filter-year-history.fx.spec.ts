import { describe, expect, test } from 'vitest';
import { filterYearHistory } from '~/features/flow/fx';

describe('filter-year-history', () => {
  test('현재 조회 중인 날짜에 연도를 비교하여 적합하면 true 를 반환한다.', () => {
    expect(
      filterYearHistory(() => new Date('2025-01-01'))({
        date: '2025-12-31',
      })
    ).toBe(true);
  });

  test('현재 조회 중인 날짜에 연도를 비교하여 적합하지 않다면 false 를 반환한다.', () => {
    expect(
      filterYearHistory(() => new Date('2024-09-01'))({
        date: '2025-09-01',
      })
    ).toBe(false);
  });
});

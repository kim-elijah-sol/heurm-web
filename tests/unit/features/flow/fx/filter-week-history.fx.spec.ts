import { describe, expect, test } from 'vitest';
import { filterWeekHistory } from '~/features/flow/fx';

describe('filter-week-history', () => {
  test('현재 조회 중인 날짜에 적합한 주차의 history 라면 true 를 반환한다.', () => {
    expect(
      filterWeekHistory(() => new Date('2025-09-07'))({
        date: '2025-09-13',
      })
    ).toBe(true);
  });

  test('현재 조회 중인 날짜에 적합하지 않은 주차의 history 라면 false 를 반환한다.', () => {
    expect(
      filterWeekHistory(() => new Date('2025-09-07'))({
        date: '2025-09-14',
      })
    ).toBe(false);
  });
});

import { describe, expect, test } from 'vitest';
import { filterValidHistory } from '~/features/analytics/fx';

describe('filter-valid-history', () => {
  test('count 데이터가 유효하다면 true 를 반환한다.', () => {
    expect(filterValidHistory({ count: 0, complete: null })).toBe(true);
  });

  test('complete 데이터가 유효하다면 true 를 반환한다.', () => {
    expect(filterValidHistory({ count: null, complete: false })).toBe(true);
  });

  test('count, complete 두 데이터가 유효하지 않다면 false 를 반환한다.', () => {
    expect(filterValidHistory({ count: null, complete: null })).toBe(false);
  });
});

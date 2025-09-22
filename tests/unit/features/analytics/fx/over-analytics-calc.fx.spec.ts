import { describe, expect, test } from 'vitest';
import { overAnalyticsCalc } from '~/features/analytics/fx';

describe('over-analytics-calc', () => {
  test('현재 수행 값이 목표치 이상이라면 완벽 수행을 반환한다.', () => {
    expect(overAnalyticsCalc({ count: 1000 }, { targetCount: 1000 })).toBe(3);
    expect(overAnalyticsCalc({ count: 1200 }, { targetCount: 1000 })).toBe(3);
  });

  test('현재 수행 값이 0 ~ 33% 라면 미수행을 반환한다.', () => {
    expect(overAnalyticsCalc({ count: 0 }, { targetCount: 1000 })).toBe(0);
    expect(overAnalyticsCalc({ count: 333 }, { targetCount: 1000 })).toBe(0);
  });

  test('현재 수행 값이 34 ~ 66% 라면 거의 미수행을 반환한다.', () => {
    expect(overAnalyticsCalc({ count: 334 }, { targetCount: 1000 })).toBe(1);
    expect(overAnalyticsCalc({ count: 666 }, { targetCount: 1000 })).toBe(1);
  });

  test('현재 수행 값이 67 ~ 99% 라면 대부분 수행을 반환한다.', () => {
    expect(overAnalyticsCalc({ count: 667 }, { targetCount: 1000 })).toBe(2);
    expect(overAnalyticsCalc({ count: 999 }, { targetCount: 1000 })).toBe(2);
  });
});

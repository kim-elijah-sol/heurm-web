import { describe, expect, test } from 'vitest';
import { underAnalyticsCalc } from '~/features/analytics/fx';

describe('under-analytics-calc', () => {
  test('현재 수행 값이 목표치 이하라면 완벽 수행을 반환한다.', () => {
    expect(underAnalyticsCalc({ count: 1000 }, { targetCount: 1000 })).toBe(3);
    expect(underAnalyticsCalc({ count: 0 }, { targetCount: 1000 })).toBe(3);
  });

  test('현재 수행 값이 목표치의 101% ~ 149% 라면 대부분 수행을 반환한다.', () => {
    expect(underAnalyticsCalc({ count: 1001 }, { targetCount: 1000 })).toBe(2);
    expect(underAnalyticsCalc({ count: 1499 }, { targetCount: 1000 })).toBe(2);
  });

  test('현재 수행 값이 목표치의 150% ~ 199% 라면 거의 미수행을 반환한다.', () => {
    expect(underAnalyticsCalc({ count: 1500 }, { targetCount: 1000 })).toBe(1);
    expect(underAnalyticsCalc({ count: 1999 }, { targetCount: 1000 })).toBe(1);
  });

  test('현재 수행 값이 목표치의 200% 이상이라면 미수행을 반환한다.', () => {
    expect(underAnalyticsCalc({ count: 2000 }, { targetCount: 1000 })).toBe(0);
    expect(underAnalyticsCalc({ count: 3000 }, { targetCount: 1000 })).toBe(0);
  });
});

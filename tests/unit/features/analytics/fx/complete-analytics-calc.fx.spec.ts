import { describe, expect, test } from 'vitest';
import { completeAnalyticsCalc } from '~/features/analytics/fx';

describe('complete-analytics-calc', () => {
  test('history 에 완성 기록이 true 라면 완벽 수행을 반환한다.', () => {
    expect(completeAnalyticsCalc({ complete: true })).toBe(3);
  });

  test('history 에 완성 기록이 false 라면 미수행을 반환한다.', () => {
    expect(completeAnalyticsCalc({ complete: false })).toBe(0);
  });

  test('history 에 완성 기록이 null 이라면 미수행을 반환한다.', () => {
    expect(completeAnalyticsCalc({ complete: null })).toBe(0);
  });
});

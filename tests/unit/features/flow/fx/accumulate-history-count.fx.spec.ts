import { describe, expect, test } from 'vitest';
import { accumulateHistoryCount } from '~/features/flow/fx';

describe('accmulate-history-count', () => {
  test('기존 누적 값과 history item 내 count 값을 적절히 더할 수 있다.', () => {
    expect(accumulateHistoryCount(0, { count: 300 })).toBe(300);
  });

  test('기존 누적 값과 history item 내 null count 값을 적절히 더할 수 있다.', () => {
    expect(accumulateHistoryCount(500, { count: null })).toBe(500);
  });
});

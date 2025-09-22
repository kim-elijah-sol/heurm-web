import { describe, expect, test } from 'vitest';
import { getAccumulateId } from '~/features/analytics/fx/get-accumulate-id.fx';

describe('get-accumulate-id', () => {
  test('weekly flow 의 id 를 반환할 수 있다.', () => {
    expect(getAccumulateId.weekly(new Date('2025-09-22').valueOf())).toBe(
      '2025-09-21'
    );
    expect(getAccumulateId.weekly(new Date('2025-09-27').valueOf())).toBe(
      '2025-09-21'
    );
    expect(getAccumulateId.weekly(new Date('2025-09-21').valueOf())).toBe(
      '2025-09-21'
    );
    expect(getAccumulateId.weekly(new Date('2025-09-20').valueOf())).toBe(
      '2025-09-14'
    );
  });

  test('monthly flow 의 id 를 반환할 수 있다.', () => {
    expect(getAccumulateId.monthly(new Date('2025-09-22').valueOf())).toBe(
      '2025-09'
    );
    expect(getAccumulateId.monthly(new Date('2024-12-31').valueOf())).toBe(
      '2024-12'
    );
  });

  test('yearly flow 의 id 를 반환할 수 있다.', () => {
    expect(getAccumulateId.yearly(new Date('2025-01-01').valueOf())).toBe(
      '2025'
    );
    expect(getAccumulateId.yearly(new Date('2024-12-31').valueOf())).toBe(
      '2024'
    );
  });
});

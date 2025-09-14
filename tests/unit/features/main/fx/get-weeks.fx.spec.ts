import { describe, expect, test } from 'vitest';
import { getWeeks } from '~/features/main/fx';
import { dateFormat } from '~/shared/fx';

describe('get-weeks', () => {
  test('특정 일자 데이터를 기반으로 일~토 데이터를 반환할 수 있다. [요일 테스트]', () => {
    const result = getWeeks(new Date()).map((it) => it.getDay());

    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test('특정 일자 데이터를 기반으로 일~토 데이터를 반환할 수 있다. [일자 테스트]', () => {
    const result = getWeeks(new Date('2025-01-01')).map((it) =>
      dateFormat['yyyy-MM-dd'](it)
    );

    expect(result).toEqual([
      '2024-12-29',
      '2024-12-30',
      '2024-12-31',
      '2025-01-01',
      '2025-01-02',
      '2025-01-03',
      '2025-01-04',
    ]);
  });
});

import { describe, expect, test } from 'vitest';
import { getStartDate } from '~/features/analytics/fx';
import { dateFormat } from '~/shared/fx';

describe('get-start-date', () => {
  test('여러 flow 중 가장 시작일이 빠른 flow 의 시작일을 반환한다.', () => {
    expect(
      dateFormat['yyyy-MM-dd'](
        getStartDate([
          {
            startAt: '2025-01-01',
          },
          {
            startAt: '2025-01-02',
          },
          {
            startAt: '2024-01-01',
          },
        ])
      )
    ).toBe('2024-01-01');
  });

  test('빈 배열이 전달되면 오류가 발생한다.', () => {
    expect(() => getStartDate([])).toThrow('Flow is empty');
  });
});

import { describe, expect, test } from 'vitest';
import { isSameDate } from '~/features/main/fx';

describe('is-same-date', () => {
  test('같은 일시라면 true 를 반환한다.', () => {
    expect(isSameDate(new Date('2025-09-14'), new Date('2025-09-14'))).toBe(
      true
    );
  });

  test('다른 일시라면 false 를 반환한다.', () => {
    expect(
      isSameDate(
        new Date('2025-09-14 00:00:00'),
        new Date('2025-09-14 00:00:01')
      )
    ).toBe(false);
  });
});

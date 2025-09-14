import { describe, expect, test } from 'vitest';
import { findCurrentHistory } from '~/features/flow/fx';

describe('find-current-history', () => {
  test('현재 조회 중인 날짜에 적합한 history 라면 true 를 반환한다. [완벽 일치]', () => {
    expect(
      findCurrentHistory(() => new Date('2025-09-14 09:00:00'))({
        date: '2025-09-14 09:00:00',
      })
    ).toBe(true);
  });

  test('현재 조회 중인 날짜에 적합한 history 라면 true 를 반환한다. [일자만 일치]', () => {
    expect(
      findCurrentHistory(() => new Date('2025-09-14 21:00:00'))({
        date: '2025-09-14 09:00:00',
      })
    ).toBe(true);
  });

  test('현재 조회 중인 날짜에 적합하지 않은 history 라면 false 를 반환한다.', () => {
    expect(
      findCurrentHistory(() => new Date('2025-09-13 09:00:00'))({
        date: '2025-09-14 09:00:00',
      })
    ).toBe(false);
  });
});

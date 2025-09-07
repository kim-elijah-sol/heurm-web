import { describe, expect, test } from 'vitest';
import { capitalize } from '~/shared/fx';

describe('capitalize', () => {
  test('첫 문자를 대문자화 시킨다.', () => {
    expect(capitalize('heurm')).toBe('Heurm');
  });

  test('첫 문자를 제외한 나머지 문자는 소문자화 시킨다.', () => {
    expect(capitalize('hEuRm')).toBe('Heurm');
  });
});

import { describe, expect, test } from 'vitest';
import { getLoginHelperFormHeight } from '~/features/login-helper/fx';

describe('get-login-helper-form-height', () => {
  test('각 스텝별 UI 의 높이를 반환할 수 있다', () => {
    expect(getLoginHelperFormHeight('password')).toBe(220);
    expect(getLoginHelperFormHeight('done')).toBe(72);
    expect(getLoginHelperFormHeight('email')).toBe(168);
    expect(getLoginHelperFormHeight('verify')).toBe(168);
  });
});

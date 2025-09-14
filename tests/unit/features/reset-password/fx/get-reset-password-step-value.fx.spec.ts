import { describe, expect, test } from 'vitest';
import { getResetPasswordStepValue } from '~/features/reset-password/fx';

describe('get-reset-password-step-value', () => {
  test('이메일 입력 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getResetPasswordStepValue('email')).toBe(0);
  });

  test('이메일 인증 입력 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getResetPasswordStepValue('verify')).toBe(1);
  });

  test('새로운 비밀번호 입력 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getResetPasswordStepValue('password')).toBe(2);
  });

  test('완료 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getResetPasswordStepValue('done')).toBe(3);
  });
});

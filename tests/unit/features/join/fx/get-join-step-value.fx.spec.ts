import { describe, expect, test } from 'vitest';
import { getJoinStepValue } from '~/features/join/fx';

describe('get-join-step-value', () => {
  test('이메일 입력 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getJoinStepValue('email')).toBe(0);
  });

  test('새로운 비밀번호 입력 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getJoinStepValue('password')).toBe(1);
  });

  test('이메일 인증 입력 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getJoinStepValue('verify')).toBe(2);
  });

  test('완료 step 의 value 를 정상적으로 반환한다.', () => {
    expect(getJoinStepValue('done')).toBe(3);
  });
});

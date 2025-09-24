import { describe, expect, test } from 'vitest';
import { getJoinStepValue } from '~/features/join/fx';
import { getLoginHelperStepDisplayType } from '~/features/login-helper/fx';
import { getResetPasswordStepValue } from '~/features/reset-password/fx';

describe('get-login-helper-step-display-type', () => {
  test('회원 가입 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 이메일 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType('email', 'email')(getJoinStepValue)
    ).toBe('current');
    expect(
      getLoginHelperStepDisplayType('email', 'password')(getJoinStepValue)
    ).toBe('ready');
    expect(
      getLoginHelperStepDisplayType('email', 'verify')(getJoinStepValue)
    ).toBe('ready');
    expect(
      getLoginHelperStepDisplayType('email', 'done')(getJoinStepValue)
    ).toBe('ready');
  });

  test('회원 가입 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 비밀번호 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType('password', 'email')(getJoinStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('password', 'password')(getJoinStepValue)
    ).toBe('current');
    expect(
      getLoginHelperStepDisplayType('password', 'verify')(getJoinStepValue)
    ).toBe('ready');
    expect(
      getLoginHelperStepDisplayType('password', 'done')(getJoinStepValue)
    ).toBe('ready');
  });

  test('회원 가입 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 인증 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType('verify', 'email')(getJoinStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('verify', 'password')(getJoinStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('verify', 'verify')(getJoinStepValue)
    ).toBe('current');
    expect(
      getLoginHelperStepDisplayType('verify', 'done')(getJoinStepValue)
    ).toBe('ready');
  });

  test('회원 가입 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 완료 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType('done', 'email')(getJoinStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('done', 'password')(getJoinStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('done', 'verify')(getJoinStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('done', 'done')(getJoinStepValue)
    ).toBe('current');
  });

  test('비밀번호 초기화 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 이메일 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType('email', 'email')(getResetPasswordStepValue)
    ).toBe('current');
    expect(
      getLoginHelperStepDisplayType(
        'email',
        'verify'
      )(getResetPasswordStepValue)
    ).toBe('ready');
    expect(
      getLoginHelperStepDisplayType(
        'email',
        'password'
      )(getResetPasswordStepValue)
    ).toBe('ready');
    expect(
      getLoginHelperStepDisplayType('email', 'done')(getResetPasswordStepValue)
    ).toBe('ready');
  });

  test('비밀번호 초기화 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 인증 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType(
        'verify',
        'email'
      )(getResetPasswordStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType(
        'verify',
        'verify'
      )(getResetPasswordStepValue)
    ).toBe('current');
    expect(
      getLoginHelperStepDisplayType(
        'verify',
        'password'
      )(getResetPasswordStepValue)
    ).toBe('ready');
    expect(
      getLoginHelperStepDisplayType('verify', 'done')(getResetPasswordStepValue)
    ).toBe('ready');
  });

  test('비밀번호 초기화 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 비밀번호 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType(
        'password',
        'email'
      )(getResetPasswordStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType(
        'password',
        'verify'
      )(getResetPasswordStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType(
        'password',
        'password'
      )(getResetPasswordStepValue)
    ).toBe('current');
    expect(
      getLoginHelperStepDisplayType(
        'password',
        'done'
      )(getResetPasswordStepValue)
    ).toBe('ready');
  });

  test('비밀번호 초기화 페이지 > 현재 스텝에 따라 구하고 싶은 스텝의 상태를 반환할 수 있다. [현재 : 완료 스텝]', () => {
    expect(
      getLoginHelperStepDisplayType('done', 'email')(getResetPasswordStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('done', 'verify')(getResetPasswordStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType(
        'done',
        'password'
      )(getResetPasswordStepValue)
    ).toBe('end');
    expect(
      getLoginHelperStepDisplayType('done', 'done')(getResetPasswordStepValue)
    ).toBe('current');
  });
});

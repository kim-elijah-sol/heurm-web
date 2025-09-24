import { describe, expect, test } from 'vitest';
import { getLoginHelperFormStepDisplayClass } from '~/features/login-helper/fx';

describe('get-login-helper-form-step-display-class', () => {
  test('각 상태별 노출 클래스 명을 반환할 수 있다', () => {
    expect(getLoginHelperFormStepDisplayClass('current')).toBe(
      'login-helper-guide-text-current -translate-y-1/2 opacity-100'
    );
    expect(getLoginHelperFormStepDisplayClass('ready')).toBe(
      'login-helper-guide-text-ready translate-y-full opacity-0 pointer-events-none'
    );
    expect(getLoginHelperFormStepDisplayClass('end')).toBe(
      'login-helper-guide-text-end -translate-y-full opacity-0 pointer-events-none'
    );
  });
});

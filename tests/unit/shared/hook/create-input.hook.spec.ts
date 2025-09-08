import { createRoot } from 'solid-js';
import { describe, expect, test } from 'vitest';
import { createInput } from '~/shared/hook';

describe('create-input', () => {
  test('초기 값을 설정하면 시작 값은 빈 문자열 이다.', () => {
    createRoot(() => {
      const [value] = createInput();

      expect(value()).toBe('');
    });
  });

  test('인수를 넘겨 초기 값을 설정할 수 있다.', () => {
    createRoot(() => {
      const [value] = createInput('test');

      expect(value()).toBe('test');
    });
  });

  test('핸들러 함수로 이벤트를 처리하여 Signal 값을 설정할 수 있다.', () => {
    createRoot(() => {
      const [value, handleInputValue] = createInput();

      const target = { value: 'test' } as HTMLInputElement;

      handleInputValue({
        target,
      });
      expect(value()).toBe('test');
    });
  });

  test('formatter 함수를 넘겨 이벤트 발생 시 값을 포맷팅 할 수 있다.', () => {
    createRoot(() => {
      const formatter = (value: string): string => value.replace(/[0-9]/g, '');
      const [value, handleInputValue] = createInput('', formatter);

      const target = { value: 'test입니다.123' } as HTMLInputElement;

      handleInputValue({
        target,
      });
      expect(value()).toBe('test입니다.');
    });
  });
});

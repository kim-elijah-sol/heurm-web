import { createRoot } from 'solid-js';
import { describe, expect, test } from 'vitest';
import { createSingleToggle } from '~/shared/hook';

describe('create-single-toggle', () => {
  test('초기 값을 설정하지 않으면 시작 값은 null 이다.', () => {
    createRoot(() => {
      const [value] = createSingleToggle();

      expect(value()).toBe(null);
    });
  });

  test('인수를 넘겨 초기 값을 설정할 수 있다.', () => {
    createRoot(() => {
      const [value] = createSingleToggle('1');

      expect(value()).toBe('1');
    });
  });

  test('set 함수로 Signal 값을 설정할 수 있다.', () => {
    const [value, set] = createSingleToggle<string>();

    set('1');
    expect(value()).toBe('1');
  });

  test('set 함수에 현재 Signal 과 동일한 인수를 넘기면 null 로 설정된다.', () => {
    const [value, set] = createSingleToggle<string>('1');

    set('1');
    expect(value()).toBe(null);
  });
});

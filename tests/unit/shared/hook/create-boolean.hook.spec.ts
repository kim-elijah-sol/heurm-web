import { createRoot } from 'solid-js';
import { describe, expect, test } from 'vitest';
import { createBoolean } from '~/shared/hook';

describe('create-boolean', () => {
  test('초기 값을 설정하지 않으면 시작 값은 false 이다.', () => {
    createRoot(() => {
      const [boolean] = createBoolean();

      expect(boolean()).toBe(false);
    });
  });

  test('인수를 넘겨 초기 값을 설정할 수 있다.', () => {
    createRoot(() => {
      const [boolean] = createBoolean(true);

      expect(boolean()).toBe(true);
    });
  });

  test('Signal 을 true 로 설정할 수 있다.', () => {
    createRoot(() => {
      const [boolean, setTrue] = createBoolean();

      setTrue();
      expect(boolean()).toBe(true);
    });
  });

  test('Signal 을 false 로 설정할 수 있다.', () => {
    createRoot(() => {
      const [boolean, , setFalse] = createBoolean(true);

      setFalse();
      expect(boolean()).toBe(false);
    });
  });

  test('Signal 을 토글할 수 있다.', () => {
    createRoot(() => {
      const [boolean, , , toggle] = createBoolean();

      toggle();
      expect(boolean()).toBe(true);

      toggle();
      expect(boolean()).toBe(false);
    });
  });

  test('직접 Signal을 변경할 수 있다.', () => {
    createRoot(() => {
      const [boolean, , , , setBoolean] = createBoolean();

      setBoolean(true);
      expect(boolean()).toBe(true);

      setBoolean(false);
      expect(boolean()).toBe(false);
    });
  });
});

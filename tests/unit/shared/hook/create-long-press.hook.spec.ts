import { createRoot } from 'solid-js';
import { DOMElement } from 'solid-js/jsx-runtime';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLongPress } from '~/shared/hook';

const createTouchEvent = (x: number, y: number) => {
  const touch = { clientX: x, clientY: y };
  const event = {
    touches: [touch],
  } as unknown as TouchEvent & {
    currentTarget: HTMLElement;
    target: DOMElement;
  };

  return event;
};

describe('create-long-press', () => {
  let onClick: ReturnType<typeof vi.fn>;
  let onLongPress: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    onLongPress = vi.fn();
    onClick = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test('기본 임계 시간 (300ms) 내 이벤트가 종료되면 onClick 함수가 호출된다.', () => {
    createRoot(() => {
      const { onTouchStart, onTouchEnd } = createLongPress({
        onClick,
        onLongPress,
      });

      onTouchStart(createTouchEvent(0, 0));

      vi.advanceTimersByTime(299);

      onTouchEnd();

      expect(onClick).toBeCalled();
      expect(onLongPress).not.toBeCalled();
    });
  });

  test('기본 임계 시간 (300ms) 이후에 이벤트가 종료되면 onLongPress 함수가 호출된다.', () => {
    createRoot(() => {
      const { onTouchStart, onTouchEnd } = createLongPress({
        onClick,
        onLongPress,
      });

      onTouchStart(createTouchEvent(0, 0));

      vi.advanceTimersByTime(300);

      onTouchEnd();

      expect(onClick).not.toBeCalled();
      expect(onLongPress).toBeCalled();
    });
  });

  test('터치 이벤트 시작 후 터치 움직임이 발생하여 터치 위치가 변경되면 onClick, onLongPress 모두 호출되지 않는다.', () => {
    createRoot(() => {
      const { onTouchStart, onTouchEnd, onTouchMove } = createLongPress({
        onClick,
        onLongPress,
      });

      onTouchStart(createTouchEvent(0, 0));

      onTouchMove(createTouchEvent(0, 1));

      onTouchEnd();

      expect(onClick).not.toBeCalled();
      expect(onLongPress).not.toBeCalled();
    });
  });

  test('터치 움직임 임계 값을 threshold prop 으로 설정할 수 있다. [임계 통과]', () => {
    createRoot(() => {
      const { onTouchStart, onTouchEnd, onTouchMove } = createLongPress({
        onClick,
        onLongPress,
        threshold: 10,
      });

      onTouchStart(createTouchEvent(0, 0));

      onTouchMove(createTouchEvent(0, 1));

      onTouchEnd();

      expect(onClick).toBeCalled();
    });
  });

  test('터치 움직임 임계 값을 threshold prop 으로 설정할 수 있다. [임계 미통과]', () => {
    createRoot(() => {
      const { onTouchStart, onTouchEnd, onTouchMove } = createLongPress({
        onClick,
        onLongPress,
        threshold: 10,
      });

      onTouchStart(createTouchEvent(0, 0));

      onTouchMove(createTouchEvent(0, 11));

      onTouchEnd();

      expect(onClick).not.toBeCalled();
    });
  });
});

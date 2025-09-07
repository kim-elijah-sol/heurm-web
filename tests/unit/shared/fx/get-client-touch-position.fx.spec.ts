import { describe, expect, test } from 'vitest';
import { getClientTouchPotision } from '~/shared/fx';

describe('get-client-touch-position', () => {
  test('TouchEvent 를 기반으로 터치 영역을 반환할 수 있다.', () => {
    const touch = { clientX: 123, clientY: 456 };
    const event = {
      touches: [touch],
    } as unknown as TouchEvent;

    expect(getClientTouchPotision(event)).toEqual({ x: 123, y: 456 });
  });

  test('touches 배열이 이벤트에 존재하지 않는다면 오류를 throw 한다.', () => {
    const event = {} as unknown as TouchEvent;

    expect(() => getClientTouchPotision(event)).toThrow(
      'No touches detected on the event.'
    );
  });

  test('touche 객체가 이벤트에 존재하지 않는다면 오류를 throw 한다.', () => {
    const event = {
      touches: [],
    } as unknown as TouchEvent;

    expect(() => getClientTouchPotision(event)).toThrow(
      'No touches detected on the event.'
    );
  });
});

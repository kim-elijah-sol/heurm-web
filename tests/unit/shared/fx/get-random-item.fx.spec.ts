import { describe, expect, test, vi } from 'vitest';
import { getRandomItem } from '~/shared/fx';

describe('get-random-item', () => {
  const data = [1, 2, 3, 4, 5, 6] as const;

  test('배열 데이터 중 랜덤한 요소를 추출할 수 있다. [첫번째 요소 추출]', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(getRandomItem(data)).toBe(1);

    spy.mockRestore();
  });

  test('배열 데이터 중 랜덤한 요소를 추출할 수 있다. [중앙 요소 추출]', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.5);

    expect(getRandomItem(data)).toBe(3);

    spy.mockRestore();
  });

  test('배열 데이터 중 랜덤한 요소를 추출할 수 있다. [마지막 요소 추출]', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(1);

    expect(getRandomItem(data)).toBe(6);

    spy.mockRestore();
  });
});

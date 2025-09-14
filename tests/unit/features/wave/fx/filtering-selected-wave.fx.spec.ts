import { describe, expect, test } from 'vitest';
import { filteringSelectedWave } from '~/features/wave/fx';

describe('filtering-selected-wave', () => {
  test('모든 wave 를 선택한 경우 무조건 true 를 반환한다.', () => {
    const result = filteringSelectedWave('Every')({ wave: 'Test' });

    expect(result).toBe(true);
  });

  test('선택한 wave 와 다른 경우 false 를 반환한다.', () => {
    const result = filteringSelectedWave('foo')({ wave: 'Test' });

    expect(result).toBe(false);
  });

  test('선택한 wave 와 같은 경우 true 를 반환한다.', () => {
    const result = filteringSelectedWave('Test')({ wave: 'Test' });

    expect(result).toBe(true);
  });
});

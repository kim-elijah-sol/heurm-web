import { describe, expect, test } from 'vitest';
import { getRange } from '~/shared/fx';

describe('get-range', () => {
  test('0부터 지정한 개수만큼 요소가 담긴 차가 1인 등차배열을 반환할 수 있다.', () => {
    expect(getRange(5)).toEqual([0, 1, 2, 3, 4]);
  });

  test('지정한 시작 값부터 지정한 개수만큼 요소가 담긴 차가 1인 등차배열을 반환할 수 있다.', () => {
    expect(getRange(5, 1)).toEqual([1, 2, 3, 4, 5]);
  });
});

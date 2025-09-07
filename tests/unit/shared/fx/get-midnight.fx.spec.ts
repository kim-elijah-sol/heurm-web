import { describe, expect, test } from 'vitest';
import { getMidnight } from '~/shared/fx';

describe('get-midnight', () => {
  test('string 데이터를 자정 시간 기준 Date 데이터 변환할 수 있다.', () => {
    const result = getMidnight('2025-01-02');

    expect([
      result.getFullYear(),
      result.getMonth() + 1,
      result.getDate(),
      result.getHours(),
      result.getMinutes(),
      result.getSeconds(),
      result.getMilliseconds(),
    ]).toEqual([2025, 1, 2, 0, 0, 0, 0]);
  });

  test('number 데이터를 자정 시간 기준 Date 데이터 변환할 수 있다.', () => {
    const result = getMidnight(1_735_776_000_000);

    expect([
      result.getFullYear(),
      result.getMonth() + 1,
      result.getDate(),
      result.getHours(),
      result.getMinutes(),
      result.getSeconds(),
      result.getMilliseconds(),
    ]).toEqual([2025, 1, 2, 0, 0, 0, 0]);
  });

  test('Date 데이터를 자정 시간 기준 Date 데이터 변환할 수 있다.', () => {
    const result = getMidnight(new Date('2025.1.2'));

    expect([
      result.getFullYear(),
      result.getMonth() + 1,
      result.getDate(),
      result.getHours(),
      result.getMinutes(),
      result.getSeconds(),
      result.getMilliseconds(),
    ]).toEqual([2025, 1, 2, 0, 0, 0, 0]);
  });

  test('인수를 넘기지 않으면 금일 기준 자정 시간 기준 Date 데이터 변환할 수 있다.', () => {
    const now = new Date();
    const nowDateArray = [now.getFullYear(), now.getMonth() + 1, now.getDate()];

    const result = getMidnight();

    expect([
      ...nowDateArray,
      result.getHours(),
      result.getMinutes(),
      result.getSeconds(),
      result.getMilliseconds(),
    ]).toEqual([...nowDateArray, 0, 0, 0, 0]);
  });
});

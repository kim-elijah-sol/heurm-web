import { describe, expect, test } from 'vitest';
import { isRestDay } from '~/features/analytics/fx';

type RequiredFlowItem = Parameters<ReturnType<typeof isRestDay>>[0];

describe('is-rest-day', () => {
  test('intervalType 이 DAILY 이고, NM 타입에서 쉬는 날 true 반환', () => {
    // 21일에 시작해서 1일 하고 1일 쉬는 형식이기에 22일에는 쉬는 날
    const current = new Date('2025-09-22').valueOf();

    const flow = {
      startAt: '2025-09-21',
      intervalType: 'DAILY',
      repeat: 1,
      rest: 1,
    } as RequiredFlowItem;

    expect(isRestDay(current)(flow)).toBe(true);
  });

  test('intervalType 이 DAILY 이고, N 타입에서 쉬는 날 true 반환', () => {
    // 20일에 시작해서 3일에 한 번 실행이기에 22일에는 쉬는 날
    const current = new Date('2025-09-22').valueOf();

    const flow = {
      startAt: '2025-09-20',
      intervalType: 'DAILY',
      repeat: 3,
    } as RequiredFlowItem;

    expect(isRestDay(current)(flow)).toBe(true);
  });

  test('intervalType 이 WEEKLY 이고, NM 타입에서 쉬는 날 true 반환', () => {
    // 23일 시작주는 쉬는 날이 아니지만, 그 다음주인 28일부터 1주일 간 쉬는 날임.
    const flow = {
      startAt: '2025-09-23',
      intervalType: 'WEEKLY',
      repeat: 1,
      rest: 1,
    } as RequiredFlowItem;

    expect(isRestDay(new Date('2025-09-28').valueOf())(flow)).toBe(true);
    expect(isRestDay(new Date('2025-10-04').valueOf())(flow)).toBe(true);
  });

  test('intervalType 이 WEEKLY 이고, N 타입에서 쉬는 날 true 반환', () => {
    // 23일 시작주부터 2주 간격으로 실행되기에, 그 다음주인 28일부터 1주일 간 쉬는 날임.
    const flow = {
      startAt: '2025-09-23',
      intervalType: 'WEEKLY',
      repeat: 2,
    } as RequiredFlowItem;

    expect(isRestDay(new Date('2025-09-28').valueOf())(flow)).toBe(true);
    expect(isRestDay(new Date('2025-10-04').valueOf())(flow)).toBe(true);
  });

  test('intervalType 이 MONTHLY 이고, NM 타입에서 쉬는 날 true 반환', () => {
    // 9월에 시작해서 1달 실행, 2달 쉬는 날이기 때문에 10,11월은 쉬는 달
    const flow = {
      startAt: '2025-09-01',
      intervalType: 'MONTHLY',
      repeat: 1,
      rest: 2,
    } as RequiredFlowItem;

    expect(isRestDay(new Date('2025-10-28').valueOf())(flow)).toBe(true);
    expect(isRestDay(new Date('2025-11-04').valueOf())(flow)).toBe(true);
  });

  test('intervalType 이 MONTHLY 이고, N 타입에서 쉬는 날 true 반환', () => {
    // 9월에 시작해서 2달마다 실행이기에 10월은 쉬는 달
    const flow = {
      startAt: '2025-09-01',
      intervalType: 'MONTHLY',
      repeat: 2,
    } as RequiredFlowItem;

    expect(isRestDay(new Date('2025-10-01').valueOf())(flow)).toBe(true);
    expect(isRestDay(new Date('2025-10-31').valueOf())(flow)).toBe(true);
  });

  test('intervalType 이 YEARLY 이고, NM 타입에서 쉬는 날 true 반환', () => {
    // 2025년에 시작해서 1년 실행, 1년 쉬기에 2026년은 쉬는 년도
    const flow = {
      startAt: '2025-09-01',
      intervalType: 'YEARLY',
      repeat: 1,
      rest: 1,
    } as RequiredFlowItem;

    expect(isRestDay(new Date('2026-01-01').valueOf())(flow)).toBe(true);
    expect(isRestDay(new Date('2026-12-31').valueOf())(flow)).toBe(true);
  });

  test('intervalType 이 YEARLY 이고, N 타입에서 쉬는 날 true 반환', () => {
    // 2008년에 시작해서 4년마다 실행이기에, 2009~2011 년은 쉬는 년도
    const flow = {
      startAt: '2008-01-01',
      intervalType: 'YEARLY',
      repeat: 4,
    } as RequiredFlowItem;

    expect(isRestDay(new Date('2009-01-01').valueOf())(flow)).toBe(true);
    expect(isRestDay(new Date('2011-12-31').valueOf())(flow)).toBe(true);
  });
});

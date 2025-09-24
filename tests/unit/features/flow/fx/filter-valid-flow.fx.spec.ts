import { describe, expect, test } from 'vitest';
import { filterValidFlow } from '~/features/flow/fx';

type RequiredFlowItem = Parameters<ReturnType<typeof filterValidFlow>>[0];

describe('filter-valid-flow', () => {
  test('시작일보다 빠른 날을 조회하면 false 반환', () => {
    const current = new Date('2025-09-20').valueOf();

    const flow = {
      startAt: '2025-09-21',
    } as RequiredFlowItem;

    expect(filterValidFlow(current)(flow)).toBe(false);
  });

  test('종료일이 존재하고 이보다 늦은 날을 조회하면 false 반환', () => {
    const current = new Date('2025-10-01').valueOf();

    const flow = {
      startAt: '2025-09-21',
      endAt: '2025-09-30',
    } as RequiredFlowItem;

    expect(filterValidFlow(current)(flow)).toBe(false);
  });
});

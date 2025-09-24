import { describe, expect, test } from 'vitest';
import { type FlowType } from '~/entities/flow';
import { type WaveType } from '~/entities/wave';
import { groupingFlowByWave } from '~/features/flow/fx';

describe('grouping-flow-by-wave', () => {
  test('여러 flow 를 wave 별로 그룹화 할 수 있다.', () => {
    const wave = [
      {
        id: 'b',
        name: 'b',
      },
      {
        id: 'a',
        name: 'a',
      },
    ] as WaveType.GetWaveResponse;

    const flows = [
      {
        name: '1',
        wave: [{ id: 'a', name: 'a' }],
      },
      {
        name: '2',
        wave: [],
      },
      {
        name: '3',
        wave: [{ id: 'b', name: 'b' }],
      },
      {
        name: '4',
        wave: [{ id: 'a', name: 'a' }],
      },
    ] as FlowType.GetFlowResponse;

    expect(groupingFlowByWave(flows, wave)).toEqual([
      {
        wave: 'None Wave',
        flows: [
          {
            name: '2',
            wave: [],
          },
        ],
      },
      {
        wave: 'b',
        flows: [
          {
            name: '3',
            wave: [{ id: 'b', name: 'b' }],
          },
        ],
      },
      {
        wave: 'a',
        flows: [
          {
            name: '1',
            wave: [{ id: 'a', name: 'a' }],
          },
          {
            name: '4',
            wave: [{ id: 'a', name: 'a' }],
          },
        ],
      },
    ]);
  });
});

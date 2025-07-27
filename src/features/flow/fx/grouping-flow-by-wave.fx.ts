import { type FlowType } from '~/entities/flow';
import { type WaveType } from '~/entities/wave';

export const groupingFlowByWave = (
  flows: FlowType.GetFlowResponse,
  _wave: WaveType.GetWaveResponse
) => {
  const registeredFlowIds: string[] = [];

  const wave = ['None Wave', ..._wave.map((it) => it.name)];

  const result: {
    wave: string;
    flows: FlowType.GetFlowResponse;
  }[] = wave.map((wave) => ({
    wave,
    flows: [],
  }));

  for (const flow of flows) {
    const wave = flow.wave[0]?.name ?? 'None Wave';

    if (result.some((it) => it.wave === wave) === false) {
      result.push({
        wave,
        flows: [],
      });
    }

    const index = result.findIndex((it) => it.wave === wave);

    result[index].flows.push(flow);
    registeredFlowIds.push(flow.id);
  }

  return result.filter((it) => it.flows.length !== 0);
};

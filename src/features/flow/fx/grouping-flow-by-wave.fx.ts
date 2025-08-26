import { type FlowType } from '~/entities/flow';
import { waveConstant, type WaveType } from '~/entities/wave';

export const groupingFlowByWave = (
  flows: FlowType.GetFlowResponse,
  wave: WaveType.GetWaveResponse
) => {
  const waveIds = ['', ...wave.map((it) => it.id)];

  const result: {
    waveId: string;
    flows: FlowType.GetFlowResponse;
  }[] = waveIds.map((waveId) => ({
    waveId,
    flows: [],
  }));

  for (const flow of flows) {
    const waveId = flow.wave[0]?.id ?? '';

    const index = result.findIndex((it) => it.waveId === waveId);

    result[index].flows.push(flow);
  }

  return result
    .filter((it) => it.flows.length !== 0)
    .map((it) => {
      const waveName =
        wave.find((wave) => wave.id === it.waveId)?.name ??
        waveConstant.NONE_GROPING_WAVE_NAME;

      return {
        wave: waveName,
        flows: it.flows,
      };
    });
};

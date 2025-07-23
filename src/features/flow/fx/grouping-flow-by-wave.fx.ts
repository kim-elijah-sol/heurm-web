import { FlowType } from '~/entities/flow';

export const groupingFlowByWave = (flows: FlowType.GetFlowResponse) => {
  const registeredFlowIds: string[] = [];

  const result: {
    wave: string;
    flows: FlowType.GetFlowResponse;
  }[] = [
    {
      wave: 'None Wave',
      flows: [],
    },
  ];

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

  return result;
};

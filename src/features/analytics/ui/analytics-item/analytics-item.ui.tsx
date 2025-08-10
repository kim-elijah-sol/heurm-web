import { Accessor, Component, createEffect } from 'solid-js';
import { FlowType } from '~/entities/flow';
import { historyQueries } from '~/entities/history';
import { AnalyticsCalcFx } from '../../types';

type Props = {
  flow: Accessor<FlowType.GetFlowResponseItem>;
  analyticsCalcFx: AnalyticsCalcFx;
  startDate: Date;
};

export const AnalyticsItem: Component<Props> = (props) => {
  const flow = props.flow;

  const history = historyQueries.getHistoryQuery(() => ({
    flowId: flow().id,
  }));

  const result = () =>
    props.analyticsCalcFx(props.startDate)(flow())(history.data ?? []);

  createEffect(() => console.log(result()));

  return <></>;
};

import { type Component } from 'solid-js';
import { CountableChart } from './lib/countable-chart.ui';

type Props = {
  targetCount: number;
  datas: number[];
};

export const OverTypeChart: Component<Props> = (props) => (
  <CountableChart {...props} type='over' />
);

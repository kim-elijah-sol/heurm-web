import { Component } from 'solid-js';
import { CountableChart } from './lib/countable-chart.ui';

type Props = {
  targetCount: number;
  datas: number[];
};

export const UnderTypeChart: Component<Props> = (props) => (
  <CountableChart {...props} type='under' />
);

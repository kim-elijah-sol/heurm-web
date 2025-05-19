import { Component } from 'solid-js';
import { ChallengeColor } from '~/shared/model';
import { CountableChart } from './lib/countable-chart.ui';

type Props = {
  targetCount: number;
  datas: number[];
  color: ChallengeColor;
  name: string;
};

export const UnderTypeChart: Component<Props> = (props) => (
  <CountableChart {...props} type='under' />
);

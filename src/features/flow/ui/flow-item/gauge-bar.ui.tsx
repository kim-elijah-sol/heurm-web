import { type Accessor, createMemo, type Component } from 'solid-js';
import { FLOW_STROKE_200 } from '~/shared/constant';
import type { FlowColor } from '~/shared/types';

type Props = {
  value: Accessor<number>;
  target: Accessor<number>;
  color: Accessor<FlowColor>;
};
export const GaugeBar: Component<Props> = (props) => {
  const size = 24;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const angle = 240;
  const offsetAngle = (360 - angle) / 2;
  const needleStartAngle = 60;

  const needleValue = () => {
    if (props.value() <= props.target()) return 0;

    return ((props.value() - props.target()) / props.value()) * angle;
  };

  const progress = createMemo(() => {
    const ratio = Math.min(props.value() / props.target(), 1);
    return ratio;
  });

  const dashOffset = createMemo(() => {
    return circumference * (1 - progress()) * (angle / 360);
  });

  const arcPath = describeArc(
    size / 2,
    size / 2,
    radius,
    offsetAngle,
    360 - offsetAngle
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      class='-scale-y-100'
    >
      <path
        d={arcPath}
        fill='none'
        stroke-width={strokeWidth}
        stroke-linecap='round'
        class={FLOW_STROKE_200[props.color()]}
      />
      <path
        d={arcPath}
        fill='none'
        class='transition-all duration-500'
        stroke='white'
        stroke-width={strokeWidth}
        stroke-linecap='round'
        stroke-dasharray={`${(circumference * angle) / 360}`}
        stroke-dashoffset={dashOffset()}
      />

      <line
        x1={size / 2}
        y1={size / 2}
        x2={size / 2}
        y2={strokeWidth}
        stroke='white'
        stroke-width={strokeWidth}
        stroke-linecap='round'
        transform={`rotate(${needleStartAngle + needleValue()} ${size / 2} ${
          size / 2
        })`}
        class='transition-all duration-500'
      />
    </svg>
  );
};

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleInDegrees: number
) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
}

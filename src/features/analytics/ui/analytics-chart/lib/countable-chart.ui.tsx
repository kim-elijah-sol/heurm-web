import { SolidApexCharts } from 'solid-apexcharts';
import { type Component } from 'solid-js';
import { getYAxisRange } from '~/features/analytics/fx';

type Props = {
  targetCount: number;
  datas: number[];
  type: 'over' | 'under';
};

export const CountableChart: Component<Props> = (props) => {
  const colors = props.datas.map((count) => {
    const green = 'oklch(79.2% 0.209 151.711)';
    const red = 'oklch(70.4% 0.191 22.216)';

    if (props.type === 'over') return count >= props.targetCount ? green : red;
    return count <= props.targetCount ? green : red;
  });

  return (
    <SolidApexCharts
      width='100%'
      type='bar'
      series={[
        {
          data: props.datas,
        },
      ]}
      options={{
        colors,
        annotations: {
          yaxis: [
            {
              y: props.targetCount,
              borderColor: 'oklch(74.6% 0.16 232.661)',
              strokeDashArray: 0,
              borderWidth: 2,
            },
          ],
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            distributed: true,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        xaxis: {
          type: 'category',
          categories: [...props.datas],
          labels: {
            style: {
              colors: colors,
              cssClass: 'font-semibold',
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          min: getYAxisRange([...props.datas, props.targetCount]).min,
          max: getYAxisRange([...props.datas, props.targetCount]).max,
        },
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        },
      }}
    />
  );
};

import { SolidApexCharts } from 'solid-apexcharts';
import { Component } from 'solid-js';

type Props = {
  datas: boolean[];
};

export const CompleteTypeChart: Component<Props> = (props) => {
  const data = props.datas.map((it) => (it ? 1 : -1));

  const green = 'oklch(79.2% 0.209 151.711)';

  const red = 'oklch(70.4% 0.191 22.216)';

  const colors = data.map((it) => (it === 1 ? green : red));

  return (
    <SolidApexCharts
      type='line'
      series={[
        {
          data,
        },
      ]}
      options={{
        stroke: {
          width: 3,
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            gradientToColors: [green],
            stops: [50, 0],
          },
        },
        colors: [red],
        annotations: {
          yaxis: [
            {
              y: 0,
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
          zoom: {
            enabled: false,
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
          categories: data.map((it) => (it === 1 ? 'V' : 'X')),
          labels: {
            style: {
              colors,
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
          min: -1,
          max: 1,
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

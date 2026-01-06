import { useEcharts } from '@/features/echarts';
import { useMount } from 'ahooks';
import type { EChartsOption } from 'echarts';
import { useRef } from 'react';

const trends: EChartsOption = {
  grid: {
    bottom: 0,
    containLabel: true,
    left: '1%',
    right: '1%',
    top: '2 %',
  },
  series: [
    {
      areaStyle: {},
      data: [
        111, 2000, 6000, 16_000, 33_333, 55_555, 64_000, 33_333, 18_000, 36_000,
        70_000, 42_444, 23_222, 13_000, 8000, 4000, 1200, 333, 222, 111,
      ],
      itemStyle: {
        color: '#5ab1ef',
      },
      smooth: true,
      type: 'line',
    },
    {
      areaStyle: {},
      data: [
        33, 66, 88, 333, 3333, 6200, 20_000, 3000, 1200, 13_000, 22_000, 11_000,
        2221, 1201, 390, 198, 60, 30, 22, 11,
      ],
      itemStyle: {
        color: '#019680',
      },
      smooth: true,
      type: 'line',
    },
  ],
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#019680',
        width: 1,
      },
    },
    trigger: 'axis',
  },
  // xAxis: {
  //   axisTick: {
  //     show: false,
  //   },
  //   boundaryGap: false,
  //   data: Array.from({ length: 18 }).map((_item, index) => `${index + 6}:00`),
  //   type: 'category',
  // },
  xAxis: {
    axisTick: {
      show: false,
    },
    boundaryGap: false,
    data: Array.from({ length: 18 }).map((_item, index) => `${index + 6}:00`),
    splitLine: {
      lineStyle: {
        type: 'solid',
        width: 1,
      },
      show: true,
    },
    type: 'category',
  },
  yAxis: [
    {
      axisTick: {
        show: false,
      },
      max: 80_000,
      splitArea: {
        show: true,
      },
      splitNumber: 4,
      type: 'value',
    },
  ],
};

function AnalyticsTrends() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { renderEcharts } = useEcharts(containerRef);

  useMount(() => {
    async function mockData() {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      renderEcharts(trends);
    }

    mockData();
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '300px',
      }}
    />
  );
}

export default AnalyticsTrends;

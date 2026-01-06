import { useEcharts } from '@/features/echarts';
import { useMount } from 'ahooks';
import type { EChartsOption } from 'echarts';
import { useRef } from 'react';

const visits: EChartsOption = {
  grid: {
    bottom: 0,
    containLabel: true,
    left: '1%',
    right: '1%',
    top: '2 %',
  },
  series: [
    {
      barMaxWidth: 80,
      // color: '#4f69fd',
      data: [
        3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200,
        4800,
      ],
      type: 'bar',
    },
  ],
  tooltip: {
    axisPointer: {
      lineStyle: {
        // color: '#4f69fd',
        width: 1,
      },
    },
    trigger: 'axis',
  },
  xAxis: {
    data: Array.from({ length: 12 }).map((_item, index) => `${index + 1}月`),
    type: 'category',
  },
  yAxis: {
    max: 8000,
    splitNumber: 4,
    type: 'value',
  },
};

function AnalyticsVisits() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { renderEcharts } = useEcharts(containerRef);

  useMount(() => {
    async function mockData() {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      renderEcharts(visits);
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

export default AnalyticsVisits;

import { useEcharts } from '@/features/echarts';
import { useMount } from 'ahooks';
import type { EChartsOption } from 'echarts';
import { useRef } from 'react';

const salesOption: EChartsOption = {
  series: [
    {
      animationDelay() {
        return Math.random() * 400;
      },
      animationEasing: 'exponentialInOut',
      animationType: 'scale',
      center: ['50%', '50%'],
      color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      data: [
        { name: '外包', value: 500 },
        { name: '定制', value: 310 },
        { name: '技术支持', value: 274 },
        { name: '远程', value: 400 },
      ].sort((a, b) => {
        return a.value - b.value;
      }),
      name: '商业占比',
      radius: '80%',
      roseType: 'radius',
      type: 'pie',
    },
  ],

  tooltip: {
    trigger: 'item',
  },
};

function AnalyticsVisitsSales() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { renderEcharts } = useEcharts(containerRef);

  useMount(() => {
    async function mockData() {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      renderEcharts(salesOption);
    }

    mockData();
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 300,
      }}
    />
  );
}

export default AnalyticsVisitsSales;

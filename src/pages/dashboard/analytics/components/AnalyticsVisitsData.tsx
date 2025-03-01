import { useEcharts } from '@/echarts/use-echarts';
import type { EChartsOption } from 'echarts';

const dataOption: EChartsOption = {
  legend: {
    bottom: 0,
    data: ['访问', '趋势'],
  },
  radar: {
    indicator: [
      {
        name: '网页',
      },
      {
        name: '移动端',
      },
      {
        name: 'Ipad',
      },
      {
        name: '客户端',
      },
      {
        name: '第三方',
      },
      {
        name: '其它',
      },
    ],
    radius: '60%',
    splitNumber: 8,
  },
  series: [
    {
      areaStyle: {
        opacity: 1,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
      data: [
        {
          itemStyle: {
            color: '#b6a2de',
          },
          name: '访问',
          value: [90, 50, 86, 40, 50, 20],
        },
        {
          itemStyle: {
            color: '#5ab1ef',
          },
          name: '趋势',
          value: [70, 75, 70, 76, 20, 85],
        },
      ],
      itemStyle: {
        // borderColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
      },
      symbolSize: 0,
      type: 'radar',
    },
  ],
  tooltip: {},
};

function AnalyticsVisitsData() {
  const { containerRef } = useEcharts({ options: dataOption });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 300,
        // 如果需要容器响应式
        minHeight: 300,
      }}
    />
  );
}

export default AnalyticsVisitsData;

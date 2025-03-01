import { useEffectOnActive } from 'keepalive-for-react';
import debounce from 'lodash-es/debounce';
import React, { useImperativeHandle, useRef } from 'react';
import echarts from './echarts.config';
import { useTheme } from '@/store/theme';

const EChart = (props: any, ref: any) => {
  const {
    options,
    loading = false, // 受控
    onClick,
    style = {},
  } = props;
  const chartRef = useRef(null);
  const chartInstance = useRef<echarts.ECharts | undefined>(undefined);
  const themeMode = useTheme();

  // 获取实例
  const getInstance = () => chartInstance.current;

  // 窗口自适应并开启过渡动画
  const resize = () => {
    chartInstance.current &&
      chartInstance.current.resize({
        animation: { duration: 300, easing: 'quadraticIn' },
      });
  };

  // 自适应防抖优化
  const debounceResize = debounce(resize, 200);

  // 对父组件暴露获取ECharts实例的方法，可直接通过实例调用原生函数
  useImperativeHandle(ref, () => ({ getInstance }));

  useEffectOnActive(
    () => {
      if (chartInstance.current && !chartInstance.current.isDisposed) {
        chartInstance.current.dispose();
      }
      const container = chartRef.current;
      if (!container) return;

      setTimeout(() => {
        chartInstance.current = echarts.init(container);
        chartInstance.current.setOption(options);
      }, 200);

      function onResize() {
        chartInstance.current?.resize();
      }

      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
        chartInstance.current?.dispose();
      };
    },
    [options],
    false
  );

  return (
    <div
      id="echart"
      ref={chartRef}
      style={{ width: '100%', height: '300px', ...style }}
    />
  );
};

export default React.memo(React.forwardRef(EChart));

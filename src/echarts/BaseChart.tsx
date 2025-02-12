import { useEffectOnActive } from 'keepalive-for-react';
import debounce from 'lodash-es/debounce';
import React, { useImperativeHandle, useRef } from 'react';
import echarts from './echarts.config';

const EChart = (props: any, ref: any) => {
  const {
    options,
    loading = false, // 受控
    onClick,
    style = {},
  } = props;
  const chartRef = useRef(null);
  const chartInstance = useRef<echarts.ECharts | undefined>(undefined);

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

  //   if (chartRef.current) {
  //     // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
  //     chartInstance.current = echarts.getInstanceByDom(chartRef.current);
  //     if (!chartInstance.current) {
  //       chartInstance.current = echarts.init(chartRef.current, null, {
  //         renderer: 'svg',
  //       });
  //     }

  //     // 绑定鼠标点击事件
  //     chartInstance.current.on('click', (event) => {
  //       if (event && onClick) onClick(event);
  //     });

  //     options && chartInstance.current.setOption(options);
  //   }

  //   return () => {
  //     chartInstance.current?.dispose(); // 容器被销毁之后，销毁实例，避免内存泄漏
  //   };
  // }, [chartRef, options]);

  // 监听高度变化
  // useLayoutEffectOnActive(() => {
  //   resize();
  // }, [style.width, style.height]);

  // 监听窗口大小
  // useEffect(() => {
  //   window.addEventListener('resize', debounceResize);

  //   return () => {
  //     window.removeEventListener('resize', debounceResize);
  //   };
  // }, [options]);

  // 展示 loading 动画
  // useEffectOnActive(() => {
  //   loading
  //     ? chartInstance.current?.showLoading()
  //     : chartInstance.current?.hideLoading();
  // }, [loading]);

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

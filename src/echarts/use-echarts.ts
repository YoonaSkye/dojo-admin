import { useEffect, useRef } from 'react';
import echarts from './echarts.config';
import type { EChartsOption } from 'echarts';
import { useTheme } from '@/features/theme/theme-context';

type UseEchartsParams = {
  options: EChartsOption;
  // theme?: string | object;
  events?: Record<string, (params: any) => void>;
};

export const useEcharts = (params: UseEchartsParams) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { options, events } = params;

  const { isDark } = useTheme();

  // 获取实际主题（处理 auto 模式）
  const actualTheme = isDark ? 'dark' : 'default';
  // 初始化图表
  useEffect(() => {
    if (!containerRef.current) return;

    chartInstance.current = echarts.init(
      containerRef.current,
      actualTheme || 'default',
      {
        renderer: 'canvas',
      }
    );

    // 事件绑定
    if (events) {
      Object.entries(events).forEach(([eventName, handler]) => {
        chartInstance.current?.on(eventName, handler);
      });
    }

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [actualTheme]);

  // 配置更新
  useEffect(() => {
    let currentOptions = options;
    if (actualTheme === 'dark')
      currentOptions = { ...options, backgroundColor: 'transparent' };

    if (!chartInstance.current) return;
    chartInstance.current.setOption(currentOptions);
  }, [options, actualTheme]);

  // 响应式布局
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      chartInstance.current?.resize({
        animation: { duration: 300, easing: 'quadraticIn' },
      });
    });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return {
    containerRef,

    getInstance: () => chartInstance.current,
  };
};

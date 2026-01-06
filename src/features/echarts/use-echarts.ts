import { useTheme } from '@/features/theme';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { useDebounceFn } from 'ahooks';
import { useCallback, useMemo, useRef } from 'react';
import { useUnmount, useUpdateEffect, useWindowSize } from 'react-use';

import type { EChartsOption } from 'echarts';
import echarts from './echarts.config';

type EchartsThemeType = 'dark' | 'light' | null;

function useEcharts(chartRef: React.RefObject<HTMLDivElement>) {
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const cacheOptionsRef = useRef<EChartsOption>({});

  const { isDark } = useTheme();
  const { width, height } = useWindowSize();

  const resize = useCallback(() => {
    chartInstanceRef.current?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn',
      },
    });
  }, []);

  const { run: debouncedResize } = useDebounceFn(resize, { wait: 200 });

  const getOptions = useMemo((): EChartsOption => {
    if (!isDark) {
      return {};
    }
    return {
      backgroundColor: 'transparent',
    };
  }, [isDark]);

  function initCharts(t?: EchartsThemeType) {
    const el = chartRef.current;
    if (!el) return null;

    chartInstanceRef.current = echarts.init(el, t || (isDark ? 'dark' : null));
    return chartInstanceRef.current;
  }

  function renderEcharts(
    options: EChartsOption,
    clear = true
  ): Promise<echarts.ECharts | null> {
    cacheOptionsRef.current = options;
    const currentOptions = {
      ...options,
      ...getOptions,
    };
    return new Promise((resolve) => {
      if (chartRef.current?.offsetHeight === 0) {
        setTimeout(async () => {
          resolve(await renderEcharts(currentOptions));
        }, 30);
        return;
      }
      setTimeout(() => {
        if (!chartInstanceRef.current) {
          const instance = initCharts();
          if (!instance) return resolve(null);
        }
        clear && chartInstanceRef.current?.clear();
        chartInstanceRef.current?.setOption(currentOptions);
        resolve(chartInstanceRef.current);
      }, 30);
    });
  }

  /** destroy chart */
  function destroy() {
    if (!chartInstanceRef.current) return;

    chartInstanceRef.current.dispose();
    chartInstanceRef.current = null;
  }

  /** change chart theme */
  function changeTheme() {
    if (chartInstanceRef.current) {
      destroy();
      initCharts();
      renderEcharts(cacheOptionsRef.current);
      resize();
    }
  }

  useUpdateEffect(() => {
    debouncedResize();
  }, [height, width]);

  useResizeObserver({
    ref: chartRef,
    box: 'border-box',
    onResize: debouncedResize,
  });

  useUpdateEffect(() => {
    changeTheme();
  }, [isDark]);

  useUnmount(() => {
    destroy();
  });

  return {
    renderEcharts,
    resize,
    getChartInstance: () => chartInstanceRef.current,
  };
}

export { useEcharts };

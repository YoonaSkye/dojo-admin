import { useEffect, useRef, useCallback } from 'react';

import { CountToProps } from './types';

export const TransitionPresets = {
  easeOutExpo: (t: number, b: number, c: number, d: number) =>
    t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b,
  easeOutQuart: (t: number, b: number, c: number, d: number) => {
    t /= d;
    t--;
    return -c * (Math.pow(t, 4) - 1) + b;
  },
  linear: (t: number, b: number, c: number, d: number) => (c * t) / d + b,
};

export const useCountTo = (props: CountToProps) => {
  const {
    startVal = 0,
    endVal,
    duration = 2000,
    delay = 0,
    disabled = false,
    decimals = 0,
    separator = ',',
    decimal = '.',
    transition = 'easeOutExpo',
    onStarted,
    onFinished,
  } = props;

  // 1. 核心引用：指向 DOM 节点
  const mainRef = useRef<HTMLElement>(null);
  const decRef = useRef<HTMLElement>(null);

  // 2. 将回调放入 Ref，避免依赖项频繁变动导致动画重置
  const callbacks = useRef({ onStarted, onFinished });
  useEffect(() => {
    callbacks.current = { onStarted, onFinished };
  }, [onStarted, onFinished]);

  // 3. 格式化逻辑抽离
  const formatNumber = useCallback(
    (val: number) => {
      const fixed = val.toFixed(decimals);
      const [int, dec] = fixed.split('.');
      return {
        numMain: int.replace(/\B(?=(\d{3})+(?!\d))/g, separator),
        numDec: dec ? decimal + dec : '',
      };
    },
    [decimals, separator, decimal],
  );

  const rafId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    // 1. 立即清理可能存在的旧任务
    if (rafId.current) cancelAnimationFrame(rafId.current);

    // --- 处理禁用状态 ---
    if (disabled) {
      const { numMain, numDec } = formatNumber(endVal);
      if (mainRef.current) mainRef.current.innerText = numMain;
      if (decRef.current) decRef.current.innerText = numDec;
      // 禁用状态下直接同步结果，不开启任何定时器或循环
      return;
    }

    const run = () => {
      startTime.current = null;

      const animate = (timestamp: number) => {
        if (!startTime.current) {
          startTime.current = timestamp;
          callbacks.current.onStarted?.();
        }

        const progress = timestamp - startTime.current;
        const easingFunc =
          typeof transition === 'string'
            ? (TransitionPresets as any)[transition] ||
              TransitionPresets.easeOutExpo
            : transition;

        const currentVal = easingFunc(
          Math.min(progress, duration),
          startVal,
          endVal - startVal,
          duration,
        );

        // 直接操作 DOM，不触发 Re-render
        const { numMain, numDec } = formatNumber(currentVal);
        if (mainRef.current) mainRef.current.innerText = numMain;
        if (decRef.current) decRef.current.innerText = numDec;

        if (progress < duration) {
          rafId.current = requestAnimationFrame(animate);
        } else {
          rafId.current = null;
          callbacks.current.onFinished?.();
        }
      };

      rafId.current = requestAnimationFrame(animate);
    };

    const timer = setTimeout(run, delay);

    return () => {
      clearTimeout(timer);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [startVal, endVal, duration, delay, disabled, transition, formatNumber]);

  useEffect(() => {
    return startAnimation();
  }, [startAnimation]);

  // 返回 Ref 挂载点，而不是具体数值
  return { mainRef, decRef };
};

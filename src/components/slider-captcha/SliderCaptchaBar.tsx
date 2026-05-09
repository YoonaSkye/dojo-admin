import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import type { SliderCaptchaBarRef } from './types';

interface BarProps {
  barStyle?: React.CSSProperties;
  // toLeft 已经不再需要作为 Prop 传入，由父组件通过 class 或直接操作 style 控制
}

const SliderCaptchaBar = forwardRef<SliderCaptchaBarRef, BarProps>(
  ({ barStyle }, ref) => {
    const barRef = useRef<HTMLDivElement>(null);

    // 此时不再需要 [width, setWidth] state
    // 也不再需要 useMemo 监听 width

    useImperativeHandle(ref, () => ({
      getEl: () => barRef.current!,
      // 修改为直接同步操作 DOM
      setWidth: (val: string) => {
        if (barRef.current) {
          barRef.current.style.width = val;
        }
      },
    }));

    return (
      <div
        ref={barRef}
        className={cn('absolute h-full bg-success')}
        // 初始宽度设为 0，样式基础由 barStyle 提供
        style={{ ...barStyle, width: '0px' }}
      />
    );
  },
);

SliderCaptchaBar.displayName = 'SliderCaptchaBar';

export default SliderCaptchaBar;

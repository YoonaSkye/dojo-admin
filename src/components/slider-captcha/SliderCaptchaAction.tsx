import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import type { SliderCaptchaActionRef } from './types';

interface ActionProps {
  actionStyle?: React.CSSProperties;
  isPassing: boolean;
  // toLeft 已经不再需要，改由父组件操作 classList 控制动画
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  children?: React.ReactNode | ((isPassing: boolean) => React.ReactNode);
}

const SliderCaptchaAction = forwardRef<SliderCaptchaActionRef, ActionProps>(
  ({ actionStyle, isPassing, onMouseDown, onTouchStart, children }, ref) => {
    const actionRef = useRef<HTMLDivElement>(null);

    // 移除 isDragging state，如果需要视觉反馈，建议直接在父组件 isMoving 时
    // 通过给容器加 class 来改变子元素样式，或者根据 isPassing 判断逻辑。

    useImperativeHandle(ref, () => ({
      getEl: () => actionRef.current!,
      getStyle: () => actionRef.current!.style,
      setTranslateX: (val: number) => {
        if (actionRef.current) {
          // 性能最优：直接修改 transform 属性，不经过 React State
          actionRef.current.style.transform = `translateX(${val}px)`;
        }
      },
    }));

    return (
      <div
        ref={actionRef}
        className={cn(
          'flex-center absolute left-0 top-0 h-full cursor-move bg-background px-3.5 shadow-md dark:bg-accent',
          // 只有验证通过时保持圆角，或者由父组件的 isMoving 类名控制
          isPassing && 'rounded-md',
        )}
        style={{
          ...actionStyle,
          // 初始值，transform 将由父组件通过 setTranslateX 同步修改
          transform: 'translateX(0px)',
          // 默认关闭 transition，防止拖拽滞后
          transition: 'none',
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {typeof children === 'function'
          ? children(isPassing)
          : children || (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={isPassing ? 'text-success' : 'text-foreground'}
              >
                {isPassing ? (
                  <path
                    d="M13.5 4.5L6 12L2.5 8.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M10 3L13 6L10 9M6 3L3 6L6 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            )}
      </div>
    );
  },
);

SliderCaptchaAction.displayName = 'SliderCaptchaAction';

export default SliderCaptchaAction;

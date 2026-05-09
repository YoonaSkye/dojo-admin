import { Slot } from '@radix-ui/react-slot';
import { Check, ChevronsRight } from 'lucide-react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

import type { SliderCaptchaActionRef } from './types';

interface ActionProps {
  actionStyle?: React.CSSProperties;
  isPassing: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  children?: React.ReactNode;
}

const SliderCaptchaAction = forwardRef<SliderCaptchaActionRef, ActionProps>(
  (props, ref) => {
    const { actionStyle, isPassing, onMouseDown, onTouchStart, children } =
      props;
    const actionRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      getEl: () => actionRef.current!,
      setTranslateX: (val: number) => {
        if (actionRef.current) {
          // 性能最优：直接修改 transform 属性，不经过 React State
          actionRef.current.style.transform = `translateX(${val}px)`;
        }
      },
    }));

    const defaultIcon = isPassing ? <Check /> : <ChevronsRight />;

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
        <Slot className="size-4 text-foreground/60">
          {children || defaultIcon}
        </Slot>
      </div>
    );
  },
);

SliderCaptchaAction.displayName = 'SliderCaptchaAction';

export default SliderCaptchaAction;

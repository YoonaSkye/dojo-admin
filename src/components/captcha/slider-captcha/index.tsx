import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import SliderCaptchaAction from './SliderCaptchaAction';
import SliderCaptchaBar from './SliderCaptchaBar';
import SliderCaptchaContent from './SliderCaptchaContent';

import type {
  SliderCaptchaActionRef,
  SliderCaptchaBarRef,
  SliderCaptchaContentRef,
  SliderCaptchaProps,
  SliderCaptchaRef,
} from '../types';

const getEventPageX = (e: MouseEvent | TouchEvent): number => {
  if ('pageX' in e) return e.pageX;
  if ('touches' in e && e.touches[0]) return e.touches[0].pageX;
  return 0;
};

const SliderCaptcha = React.forwardRef<SliderCaptchaRef, SliderCaptchaProps>(
  (props, ref) => {
    const {
      value,
      text,
      successText,
      className,
      wrapperStyle,
      onChange,
      onSuccess,
      onStart,
      onMove,
      onEnd,
      actionIcon,
      contentText,
      isSlot = false,
    } = props;

    // --- 1. 状态管理 ---
    const [internalPass, setInternalPass] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    const isControlled = value !== undefined;
    const isPassing = isControlled ? value : internalPass;

    // --- 2. 交互变量 ---
    const wrapperRef = useRef<HTMLDivElement>(null);
    const actionRef = useRef<SliderCaptchaActionRef>(null);
    const barRef = useRef<SliderCaptchaBarRef>(null);
    const contentRef = useRef<SliderCaptchaContentRef>(null);

    const dragData = useRef({ startX: 0, startTime: 0 });

    // 同步外部 value (modelValue) 到 Ref，确保 handleDragOver 的异步回调能拿到最新值
    const latestValueRef = useRef(value);
    useEffect(() => {
      latestValueRef.current = value;
    }, [value]);

    const updateValue = useCallback(
      (passed: boolean) => {
        if (isControlled) onChange?.(passed);
        else setInternalPass(passed);
      },
      [isControlled, onChange],
    );
    // --- 3. 核心功能函数 ---
    const getOffset = useCallback(() => {
      const wrapperWidth = wrapperRef.current?.offsetWidth ?? 220;
      const actionWidth = actionRef.current?.getEl()?.offsetWidth ?? 40;
      return { offset: wrapperWidth - actionWidth, actionWidth, wrapperWidth };
    }, []);

    const resume = useCallback(() => {
      const actionNode = actionRef.current?.getEl();
      const barNode = barRef.current?.getEl();
      if (!actionNode || !barNode) return;

      setIsMoving(false);
      // 直接操作 DOM 类名开启 CSS 动画
      actionNode.classList.add('captcha-animating');
      barNode.classList.add('captcha-animating');

      actionRef.current?.setTranslateX(0);
      barRef.current?.setWidth('0px');

      const onEndAnimation = () => {
        actionNode.classList.remove('captcha-animating');
        barNode.classList.remove('captcha-animating');
        updateValue(false);
        actionNode.removeEventListener('transitionend', onEndAnimation);
      };
      actionNode.addEventListener('transitionend', onEndAnimation);
    }, [updateValue]);

    const checkPass = useCallback(() => {
      // 对照 Vue 逻辑：isSlot 模式下内部 checkPass 直接触发重置
      if (isSlot) {
        resume();
        return;
      }

      const endTime = Date.now();
      const startTime = dragData.current.startTime;
      const time = ((endTime - startTime) / 1000).toFixed(1);

      setIsMoving(false);
      updateValue(true);

      onSuccess?.({
        isPassing: true,
        time: time,
      });
    }, [isSlot, resume, onSuccess, updateValue]);

    // --- 4. 事件处理器 ---
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
      if (isPassing) return;

      const actionNode = actionRef.current?.getEl();
      const barNode = barRef.current?.getEl();
      // 开始拖拽前确保动画类被移除
      actionNode?.classList.remove('captcha-animating');
      barNode?.classList.remove('captcha-animating');

      dragData.current.startX = getEventPageX(e.nativeEvent);
      dragData.current.startTime = Date.now();

      setIsMoving(true);
      onStart?.(e.nativeEvent);
    };

    const handleDragMoving = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isMoving || isPassing) return;

      const { offset, actionWidth, wrapperWidth } = getOffset();
      const moveX = getEventPageX(e.nativeEvent) - dragData.current.startX;

      onMove?.({
        event: e.nativeEvent,
        moveDistance: dragData.current.startX,
        moveX,
      });

      if (moveX > 0 && moveX <= offset) {
        // 高性能 DOM 操作
        actionRef.current?.setTranslateX(moveX);
        barRef.current?.setWidth(`${moveX + actionWidth / 2}px`);
      } else if (moveX > offset) {
        // 触顶强制锁定
        actionRef.current?.setTranslateX(wrapperWidth - actionWidth);
        barRef.current?.setWidth(`${wrapperWidth - actionWidth / 2}px`);

        // 对照 Vue 逻辑：只有非 slot 模式才在滑动中自动调 checkPass
        if (!isSlot) {
          checkPass();
        }
      }
    };

    const handleDragOver = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isMoving || isPassing) return;

      // 1. 触发父组件 end 事件 (如计算旋转角度)
      onEnd?.(e.nativeEvent);

      const { offset, actionWidth, wrapperWidth } = getOffset();
      const moveX = getEventPageX(e.nativeEvent) - dragData.current.startX;

      if (moveX < offset) {
        if (isSlot) {
          // 2. 对照 Vue 逻辑：通过 setTimeout(0) 等待 React 完成父组件渲染循环
          setTimeout(() => {
            // 使用 latestValueRef.current 获取父组件更新后的最新状态，避开闭包快照问题
            if (latestValueRef.current) {
              const barEl = barRef.current?.getEl();
              const contentEl = contentRef.current?.getEl();
              if (barEl && contentEl) {
                // 对照 Vue 逻辑：如果校验通过，对齐内容区宽度
                contentEl.style.width = `${parseInt(barEl.style.width || '0', 10)}px`;
              }
            } else {
              // 校验失败则执行回弹
              resume();
            }
          }, 0);
        } else {
          resume();
        }
      } else {
        // 3. 滑到底部松手：强制位置修正并判定通过
        actionRef.current?.setTranslateX(wrapperWidth - actionWidth);
        barRef.current?.setWidth(`${wrapperWidth - actionWidth / 2}px`);
        checkPass();
      }
      setIsMoving(false);
    };

    useImperativeHandle(ref, () => ({ resume }));

    return (
      <div
        ref={wrapperRef}
        className={cn(
          'relative flex h-10 w-full items-center overflow-hidden rounded-md border border-border bg-background-deep',
          isMoving && 'cursor-grabbing select-none',
          className,
        )}
        style={wrapperStyle}
        onMouseMove={handleDragMoving}
        onMouseUp={handleDragOver}
        onMouseLeave={handleDragOver}
        onTouchMove={handleDragMoving}
        onTouchEnd={handleDragOver}
      >
        <SliderCaptchaBar ref={barRef} />
        <SliderCaptchaContent
          isPassing={isPassing}
          successText={successText}
          text={text}
        >
          {contentText && contentText(isPassing)}
        </SliderCaptchaContent>
        <SliderCaptchaAction
          ref={actionRef}
          isPassing={isPassing}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {actionIcon && actionIcon(isPassing)}
        </SliderCaptchaAction>
      </div>
    );
  },
);

SliderCaptcha.displayName = 'SliderCaptcha';

export default SliderCaptcha;

import React, {
  useCallback,
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
  SliderCaptchaProps,
  SliderCaptchaRef,
} from './types';

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

    const dragData = useRef({ startX: 0, startTime: 0 });

    const updateValue = useCallback(
      (passed: boolean) => {
        if (isControlled) onChange?.(passed);
        else setInternalPass(passed);
      },
      [isControlled, onChange],
    );

    const getOffset = useCallback(() => {
      const wrapperWidth = wrapperRef.current?.offsetWidth ?? 220;
      const actionWidth = actionRef.current?.getEl()?.offsetWidth ?? 40;
      return { offset: wrapperWidth - actionWidth, actionWidth, wrapperWidth };
    }, []);

    // --- 3. 核心功能函数 ---
    const checkPass = useCallback(() => {
      // 1. 计算耗时
      const endTime = Date.now();
      const startTime = dragData.current.startTime;

      // 2. 计算秒数并保留一位小数 (得到的是字符串，如 "1.2")
      const time = ((endTime - startTime) / 1000).toFixed(1);

      // 3. 更新组件状态
      setIsMoving(false);
      updateValue(true);

      // 4. 触发回调，数据格式与你要求的一致
      onSuccess?.({
        isPassing: true,
        time: time, // 传递格式化后的字符串
      });
    }, [onSuccess, updateValue]);

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

      // 判定是否滑过终点
      if (moveX >= offset) {
        checkPass(); // 同步触发成功逻辑
        // 视觉强行锁死在终点
        actionRef.current?.setTranslateX(offset);
        barRef.current?.setWidth(`${wrapperWidth - actionWidth / 2}px`);
        return;
      }

      onMove?.({
        event: e.nativeEvent,
        moveDistance: dragData.current.startX,
        moveX,
      });

      if (moveX > 0) {
        requestAnimationFrame(() => {
          actionRef.current?.setTranslateX(moveX);
          barRef.current?.setWidth(`${moveX + actionWidth / 2}px`);
        });
      }
    };

    const handleDragOver = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isMoving) return;

      onEnd?.(e.nativeEvent);
      const { offset } = getOffset();
      const moveX = getEventPageX(e.nativeEvent) - dragData.current.startX;

      // 如果没滑到位就松手，执行回弹
      if (moveX < offset) {
        resume();
      } else {
        // 兜底：防止某些极端情况下 Moving 没捕捉到终点
        if (!isPassing) checkPass();
        else setIsMoving(false);
      }
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

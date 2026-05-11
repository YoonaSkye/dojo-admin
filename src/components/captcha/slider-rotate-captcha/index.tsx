import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
} from 'react';

import { cn } from '@/lib/utils';
import { $t } from '@/locales';

import SliderCaptcha from '../slider-captcha';
import { SliderCaptchaRef, SliderRotateCaptchaProps } from '../types';

const SliderRotateCaptcha = forwardRef<
  SliderCaptchaRef,
  SliderRotateCaptchaProps
>((props, ref) => {
  const {
    defaultTip = '',
    diffDegree = 15, // 容差度，越小越难
    imageSize = 260,
    maxDegree = 270,
    minDegree = 90,
    src,
    imageWrapperStyle,
    onSuccess,
  } = props;

  const [state, setState] = useState({
    isPassing: false,
    showTip: false,
    toOrigin: false, // 是否开启平滑过渡动画
    dragging: false, // 是否正在拖动
  });

  const [verifyTime, setVerifyTime] = useState('0.0');

  // 使用 useRef 记录核心数据，避免触发不必要的渲染
  const dataRef = useRef({
    startRotate: 0, // 初始随机角度
    currentRotate: 0, // 当前实时角度
    startTime: 0,
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const slideBarRef = useRef<SliderCaptchaRef>(null);

  // 直接操作 DOM 更新旋转角度
  const setImgRotate = useCallback((deg: number) => {
    if (imgRef.current) {
      imgRef.current.style.transform = `rotateZ(${deg}deg)`;
    }
  }, []);

  // 初始化/重置图片旋转
  const handleImgOnLoad = useCallback(() => {
    const ranRotate = Math.floor(
      minDegree + Math.random() * (maxDegree - minDegree),
    );
    dataRef.current.startRotate = ranRotate;
    dataRef.current.currentRotate = ranRotate;

    setState((s) => ({ ...s, toOrigin: false })); // 初始化不需要动画
    setImgRotate(ranRotate);
  }, [maxDegree, minDegree, setImgRotate]);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    resume: () => {
      handleReset();
    },
  }));

  const handleStart = useCallback(() => {
    dataRef.current.startTime = Date.now();
    // 开始拖拽，关闭动画并隐藏提示
    setState((s) => ({
      ...s,
      showTip: false,
      toOrigin: false,
      dragging: true,
    }));
  }, []);

  const handleDragBarMove = useCallback(
    (data: { moveX: number }) => {
      const { moveX } = data;
      // 映射逻辑：滑块移动一倍 imageSize 距离，图片旋转 360 度
      // 你可以根据需求调整这里的系数 (例如 * 1.5 让旋转更灵敏)
      const moveDeg = (moveX / imageSize) * 360;
      const nextDeg = dataRef.current.startRotate - moveDeg;

      dataRef.current.currentRotate = nextDeg;
      setImgRotate(nextDeg);
    },
    [imageSize, setImgRotate],
  );

  const handleDragEnd = useCallback(() => {
    const { currentRotate, startTime, startRotate } = dataRef.current;

    // 校验逻辑：计算当前角度与 0 度的偏移（取模处理）
    const normalizedDeg = Math.abs(currentRotate % 360);
    const isSuccess =
      normalizedDeg <= diffDegree || normalizedDeg >= 360 - diffDegree;

    if (isSuccess) {
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(1);

      setVerifyTime(duration);
      setImgRotate(0); // 成功后吸附到 0 度
      setState((s) => ({
        ...s,
        isPassing: true,
        showTip: true,
        toOrigin: true,
        dragging: false,
      }));
      onSuccess?.({ isPassing: true, time: duration });
    } else {
      // 失败：回弹到初始随机角度
      setImgRotate(startRotate);
      setState((s) => ({
        ...s,
        toOrigin: true,
        showTip: true,
        dragging: false,
      }));

      // 1秒后隐藏错误提示，方便用户重试
      setTimeout(() => {
        setState((s) => ({ ...s, showTip: false, toOrigin: false }));
      }, 1000);
    }
  }, [diffDegree, setImgRotate, onSuccess]);

  const handleReset = useCallback(() => {
    setState({
      isPassing: false,
      showTip: false,
      toOrigin: false,
      dragging: false,
    });
    slideBarRef.current?.resume();
    handleImgOnLoad();
  }, [handleImgOnLoad]);

  const getImgWrapStyle = useMemo<CSSProperties>(
    () => ({
      height: `${imageSize}px`,
      width: `${imageSize}px`,
      ...imageWrapperStyle,
    }),
    [imageSize, imageWrapperStyle],
  );

  const verifyTip = useMemo(() => {
    return state.isPassing
      ? $t('ui.captcha.sliderRotateSuccessTip', { 0: verifyTime })
      : $t('ui.captcha.sliderRotateFailTip');
  }, [state.isPassing, verifyTime]);

  return (
    <div className="relative flex select-none flex-col items-center">
      <div
        style={getImgWrapStyle}
        className="relative cursor-pointer overflow-hidden rounded-full border border-border bg-muted shadow-md"
        onClick={handleReset} // 点击图片重置
      >
        <img
          ref={imgRef}
          src={src}
          alt="captcha"
          draggable={false}
          className={cn('h-full w-full rounded-full object-cover', {
            'transition-transform duration-500 ease-out': state.toOrigin,
          })}
          onLoad={handleImgOnLoad}
        />
        {/* 提示反馈层 */}
        <div className="absolute bottom-3 left-0 z-10 block h-7 w-full text-center text-xs leading-[30px] text-white">
          {state.showTip ? (
            <div
              className={cn({
                'bg-green-500/90': state.isPassing,
                'bg-red-500/90': !state.isPassing,
              })}
            >
              {verifyTip}
            </div>
          ) : (
            !state.isPassing &&
            !state.dragging && (
              <div className="rounded bg-black/40 px-4 py-1 text-xs text-white">
                {defaultTip || $t('ui.captcha.sliderRotateDefaultTip')}
              </div>
            )
          )}
        </div>
      </div>

      {/* 底部滑块控制 */}
      <div className="mt-8 w-full">
        <SliderCaptcha
          ref={slideBarRef}
          onStart={handleStart}
          onMove={handleDragBarMove}
          onEnd={handleDragEnd}
          value={state.isPassing}
          isSlot={true}
        />
      </div>
    </div>
  );
});

SliderRotateCaptcha.displayName = 'SliderRotateCaptcha';

export default SliderRotateCaptcha;

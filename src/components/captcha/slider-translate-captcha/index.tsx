import { $t } from '@packages/locales';
import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';

import { cn } from '@/lib/utils';

import SliderCaptcha from '../slider-captcha';
import { SliderCaptchaRef, SliderTranslateCaptchaProps } from '../types';

const PI = Math.PI;

const SliderTranslateCaptcha = forwardRef<
  SliderCaptchaRef,
  SliderTranslateCaptchaProps
>((props, ref) => {
  const {
    defaultTip = '',
    canvasWidth = 420,
    canvasHeight = 280,
    squareLength = 42,
    circleRadius = 10,
    src = '',
    diffDistance = 3,
    onSuccess,
  } = props;

  const [state, setState] = useState({
    isPassing: false,
    showTip: false,
    dragging: false,
  });

  const [verifyTime, setVerifyTime] = useState('0.0');

  // 存储非渲染数据
  const dataRef = useRef({
    startTime: 0,
    pieceX: 0,
    pieceY: 0,
    moveDistance: 0,
  });

  const puzzleCanvasRef = useRef<HTMLCanvasElement>(null);
  const pieceCanvasRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderCaptchaRef>(null);

  // 1. 绘制逻辑
  const drawPiece = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      opr: 'fill' | 'clip',
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(
        x + squareLength / 2,
        y - circleRadius + 2,
        circleRadius,
        0.72 * PI,
        2.26 * PI,
      );
      ctx.lineTo(x + squareLength, y);
      ctx.arc(
        x + squareLength + circleRadius - 2,
        y + squareLength / 2,
        circleRadius,
        1.21 * PI,
        2.78 * PI,
      );
      ctx.lineTo(x + squareLength, y + squareLength);
      ctx.lineTo(x, y + squareLength);
      ctx.arc(
        x + circleRadius - 2,
        y + squareLength / 2,
        circleRadius + 0.4,
        2.76 * PI,
        1.24 * PI,
        true,
      );
      ctx.lineTo(x, y);

      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();
      opr === 'clip' ? ctx.clip() : ctx.fill();
      ctx.globalCompositeOperation = 'destination-over';
    },
    [squareLength, circleRadius],
  );

  const initCanvas = useCallback(() => {
    const puzzleCanvas = puzzleCanvasRef.current;
    const pieceCanvas = pieceCanvasRef.current;
    if (!puzzleCanvas || !pieceCanvas || !src) return;

    const puzzleCtx = puzzleCanvas.getContext('2d');
    const pieceCtx = pieceCanvas.getContext('2d', { willReadFrequently: true });
    if (!puzzleCtx || !pieceCtx) return;

    // 清除画布
    puzzleCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    pieceCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    pieceCanvas.width = canvasWidth; // 重置宽度

    // 生成随机坐标
    const x = Math.round(
      Math.random() *
        (canvasWidth -
          (squareLength + 2 * circleRadius) -
          (squareLength + 2 * circleRadius)) +
        (squareLength + 2 * circleRadius),
    );
    const y = Math.round(
      Math.random() *
        (canvasHeight - (squareLength + 2 * circleRadius) - 3 * circleRadius) +
        3 * circleRadius,
    );
    dataRef.current.pieceX = x;
    dataRef.current.pieceY = y;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      // 绘制主图缺口
      drawPiece(puzzleCtx, x, y, 'fill');
      puzzleCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // 绘制拼图块
      drawPiece(pieceCtx, x, y, 'clip');
      pieceCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // 裁剪拼图块到实际大小
      const pieceLength = squareLength + 2 * circleRadius + 3;
      const sy = y - 2 * circleRadius - 1;
      const imageData = pieceCtx.getImageData(x, sy, pieceLength, pieceLength);
      pieceCanvas.width = pieceLength;
      pieceCtx.putImageData(imageData, 0, sy);

      // 重置位置
      pieceCanvas.style.left = '0px';
      dataRef.current.moveDistance = 0;
    };
  }, [src, canvasWidth, canvasHeight, squareLength, circleRadius, drawPiece]);

  // 2. 生命周期
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // 3. 暴露方法
  const handleReset = useCallback(() => {
    setState({ isPassing: false, showTip: false, dragging: false });
    slideBarRef.current?.resume();
    initCanvas();
  }, [initCanvas]);

  useImperativeHandle(ref, () => ({
    resume: handleReset,
  }));

  // 4. 事件处理
  const handleStart = useCallback(() => {
    dataRef.current.startTime = Date.now();
    setState((s) => ({ ...s, showTip: false }));
  }, []);

  const handleDragBarMove = useCallback((data: { moveX: number }) => {
    setState((s) => (s.dragging ? s : { ...s, dragging: true }));
    dataRef.current.moveDistance = data.moveX;
    if (pieceCanvasRef.current) {
      pieceCanvasRef.current.style.left = `${data.moveX}px`;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    const { pieceX, moveDistance, startTime } = dataRef.current;
    const isSuccess = Math.abs(pieceX - moveDistance) < diffDistance;

    if (isSuccess) {
      const time = ((Date.now() - startTime) / 1000).toFixed(1);
      setVerifyTime(time);
      setState((s) => ({
        ...s,
        isPassing: true,
        showTip: true,
        dragging: false,
      }));
      onSuccess?.({ isPassing: true, time });
    } else {
      // 失败重置位置
      if (pieceCanvasRef.current) pieceCanvasRef.current.style.left = '0px';
      dataRef.current.moveDistance = 0;
      setState((s) => ({ ...s, showTip: true, dragging: false }));

      setTimeout(() => {
        setState((s) => ({ ...s, showTip: false }));
      }, 1000);
    }
  }, [diffDistance, onSuccess]);

  const verifyTip = useMemo(() => {
    return state.isPassing
      ? $t('ui.captcha.sliderTranslateSuccessTip', { 0: verifyTime })
      : $t('ui.captcha.sliderTranslateFailTip');
  }, [state.isPassing, verifyTime]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 画布容器 */}
      <div
        className="relative flex cursor-pointer overflow-hidden border border-border shadow-md"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        <canvas
          ref={puzzleCanvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onClick={handleReset}
        />
        <canvas
          ref={pieceCanvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="absolute left-0 top-0"
          onClick={handleReset}
        />

        {/* 提示层 */}
        <div className="h-15 pointer-events-none absolute bottom-3 left-0 z-10 block w-full text-center text-xs leading-[30px] text-white">
          {state.showTip && (
            <div
              className={cn(
                state.isPassing ? 'bg-success/80' : 'bg-destructive/80',
              )}
            >
              {verifyTip}
            </div>
          )}
          {!state.dragging && !state.showTip && !state.isPassing && (
            <div className="bg-black/30">
              {defaultTip || $t('ui.captcha.sliderTranslateDefaultTip')}
            </div>
          )}
        </div>
      </div>

      {/* 滑块 */}
      <div className="mt-5 w-full">
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

SliderTranslateCaptcha.displayName = 'SliderTranslateCaptcha';

export default SliderTranslateCaptcha;

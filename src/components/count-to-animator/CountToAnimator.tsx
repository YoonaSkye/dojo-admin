import React, { useState, useEffect, useRef } from 'react';

type Props = {
  start?: number;
  end: number;
  duration?: number;
  easingFunction?: (t: number) => number;
  formatter?: (value: number) => React.ReactNode;
  autoStart?: boolean;
  className?: string;
};

const defaultEasing = (t: number) => {
  // 缓动函数（easeInOutQuad）
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const CountToAnimator: React.FC<Props> = ({
  start = 0,
  end,
  duration = 2000,
  easingFunction = defaultEasing,
  formatter = (value) => value.toFixed(0),
  autoStart = true,
  className,
}) => {
  const [value, setValue] = useState(start);
  const animationRef = useRef<number>();
  const startTime = useRef<number>();
  const startValue = useRef(start);

  const animate = (timestamp: number) => {
    if (!startTime.current) startTime.current = timestamp;

    const elapsed = timestamp - startTime.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFunction(progress);

    const currentValue =
      startValue.current + (end - startValue.current) * easedProgress;
    setValue(currentValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // 确保最终值准确
      setValue(end);
    }
  };

  const startAnimation = () => {
    startValue.current = value;
    startTime.current = undefined;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, start, duration]); // 当这些依赖变化时重新运行动画

  return <span className={className}>{formatter(value)}</span>;
};

export default CountToAnimator;

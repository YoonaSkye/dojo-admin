import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

import type { SliderCaptchaContentRef } from './types';

interface ContentProps {
  contentStyle?: React.CSSProperties;
  isPassing: boolean;
  successText: string;
  text: string;
  children?: React.ReactNode | ((isPassing: boolean) => React.ReactNode);
}

const SliderCaptchaContent = forwardRef<SliderCaptchaContentRef, ContentProps>(
  ({ contentStyle, isPassing, successText, text, children }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      getEl: () => contentRef.current!,
    }));

    return (
      <div
        ref={contentRef}
        className="flex-center absolute top-0 size-full select-none text-xs"
        style={contentStyle}
      >
        {typeof children === 'function'
          ? children(isPassing)
          : isPassing
            ? successText
            : text}
      </div>
    );
  },
);

SliderCaptchaContent.displayName = 'SliderCaptchaContent';

export default SliderCaptchaContent;

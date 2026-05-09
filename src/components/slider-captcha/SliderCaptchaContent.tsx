import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

import type { SliderCaptchaContentRef } from './types';

interface ContentProps {
  contentStyle?: React.CSSProperties;
  isPassing: boolean;
  successText?: string;
  text?: string;
  children?: React.ReactNode;
}

const SliderCaptchaContent = forwardRef<SliderCaptchaContentRef, ContentProps>(
  (props, ref) => {
    const {
      contentStyle,
      isPassing,
      successText = '验证通过',
      text = '拖动滑块验证',
      children,
    } = props;
    const contentRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      getEl: () => contentRef.current!,
    }));

    const defaultText = isPassing ? successText : text;

    return (
      <div
        ref={contentRef}
        className="flex-center absolute top-0 size-full select-none text-xs"
        style={contentStyle}
      >
        {children || defaultText}
      </div>
    );
  },
);

SliderCaptchaContent.displayName = 'SliderCaptchaContent';

export default SliderCaptchaContent;

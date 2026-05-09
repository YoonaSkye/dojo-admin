export interface SliderCaptchaProps {
  className?: string;
  actionStyle?: React.CSSProperties;
  barStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  isSlot?: boolean;
  successText?: string;
  text?: string;
  value?: boolean;
  onChange?: (passed: boolean) => void;
  onSuccess?: (data: CaptchaVerifyPassingData) => void;
  onStart?: (e: MouseEvent | TouchEvent) => void;
  onMove?: (data: SliderRotateVerifyPassingData) => void;
  onEnd?: (e: MouseEvent | TouchEvent) => void;
}

export interface CaptchaVerifyPassingData {
  isPassing: boolean;
  time: number | string;
}

export interface SliderRotateVerifyPassingData {
  event: MouseEvent | TouchEvent;
  moveDistance: number;
  moveX: number;
}

export interface SliderCaptchaActionRef {
  getEl: () => HTMLDivElement;
  setTranslateX: (val: number) => void;
}

export interface SliderCaptchaBarRef {
  getEl: () => HTMLDivElement;
  setWidth: (val: string) => void;
}

export interface SliderCaptchaContentRef {
  getEl: () => HTMLDivElement;
}

export interface SliderCaptchaRef {
  resume: () => void;
}

export interface State {
  endTime: number;
  isMoving: boolean;
  moveDistance: number;
  startTime: number;
  toLeft: boolean;
}

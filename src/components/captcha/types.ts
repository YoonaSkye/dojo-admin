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
  actionIcon?: (isPassing: boolean) => React.ReactNode;
  contentText?: (isPassing: boolean) => React.ReactNode;
  onChange?: (passed: boolean) => void;
  onSuccess?: (data: CaptchaVerifyPassingData) => void;
  onStart?: (e: MouseEvent | TouchEvent) => void;
  onMove?: (data: SliderRotateVerifyPassingData) => void;
  onEnd?: (e: MouseEvent | TouchEvent) => void;
}

export interface SliderRotateCaptchaProps {
  defaultTip?: string;
  diffDegree?: number;
  imageSize?: number;
  maxDegree?: number;
  minDegree?: number;
  src: string;
  imageWrapperStyle?: React.CSSProperties;
  onSuccess?: (data: CaptchaVerifyPassingData) => void;
  // 假设有SliderCaptcha组件
  children?: React.ReactNode;
}

export interface SliderTranslateCaptchaProps {
  /**
   * @description 拼图画布的宽度
   * @default 420
   */
  canvasWidth?: number;
  /**
   * @description 拼图画布的高度
   * @default 280
   */
  canvasHeight?: number;
  /**
   * @description 切块中正方形部分的边长
   * @default 42
   */
  squareLength?: number;
  /**
   * @description 切块上圆形凸起/凹槽的半径
   * @default 10
   */
  circleRadius?: number;
  /**
   * @description 图片的地址
   */
  src?: string;
  /**
   * @description 允许拼图对齐的最大像素差距
   * @default 3
   */
  diffDistance?: number;
  /**
   * @description 默认显示的提示文本
   */
  defaultTip?: string;
  /**
   * @description 验证成功后的回调函数
   */
  onSuccess?: (data: CaptchaVerifyPassingData) => void;
  /**
   * @description 容器的类名
   */
  className?: string;
  /**
   * @description 自定义容器样式
   */
  style?: React.CSSProperties;
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

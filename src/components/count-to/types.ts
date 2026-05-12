/**
 * 动画预设键名
 */
export type TransitionKey =
  | 'linear'
  | 'easeOutExpo'
  | 'easeOutQuart'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad';

export interface CountToProps {
  /** 结束值 */
  endVal: number;
  /** 起始值，默认为 0 */
  startVal?: number;
  /** 动画持续时间 (ms)，默认为 2000 */
  duration?: number;
  /** 动画延迟时间 (ms)，默认为 0 */
  delay?: number;
  /** 是否禁用动画，默认为 false */
  disabled?: boolean;
  /** 小数位数，默认为 0 */
  decimals?: number;
  /** 千分位分隔符，默认为 "," */
  separator?: string;
  /** 小数点符号，默认为 "." */
  decimal?: string;
  /**
   * 动画过渡类型
   * 支持预设字符串或自定义缓动函数 (t, b, c, d) => number
   */
  transition?:
    | TransitionKey
    | ((t: number, b: number, c: number, d: number) => number);
  /** 前缀文字 */
  prefix?: string;
  /** 后缀文字 */
  suffix?: string;
  /** 容器类名 */
  className?: string;
  /** 容器样式 */
  style?: React.CSSProperties;
  /** 主体数字样式（对应 Vue 的 mainStyle） */
  mainStyle?: React.CSSProperties;
  /** 小数部分样式（对应 Vue 的 decimalStyle） */
  decimalStyle?: React.CSSProperties;
  /** 前缀样式 */
  prefixStyle?: React.CSSProperties;
  /** 后缀样式 */
  suffixStyle?: React.CSSProperties;
  /** 动画开始回调 */
  onStarted?: () => void;
  /** 动画结束回调 */
  onFinished?: () => void;
}

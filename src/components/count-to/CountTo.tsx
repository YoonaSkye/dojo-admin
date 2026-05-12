import { cn } from '@/lib/utils';

import { CountToProps } from './types';
import { useCountTo } from './useCountTo';

const CountTo = (props: CountToProps) => {
  const { prefix, suffix, decimals = 0, className } = props;

  // 此时获取的是 Ref 挂载点
  const { mainRef, decRef } = useCountTo(props);

  return (
    <div
      className={cn('count-to', className)}
      style={{ display: 'inline-flex', alignItems: 'baseline' }}
    >
      {prefix && <span style={props.prefixStyle}>{prefix}</span>}

      <span className="count-to-main" style={props.mainStyle}>
        {/* 初始值可手动填入 startVal，之后由 Ref 接管更新 */}
        <span ref={mainRef as any}>{props.startVal}</span>
        {decimals > 0 && (
          <span
            ref={decRef as any}
            style={{ fontSize: '0.8em', ...props.decimalStyle }}
          />
        )}
      </span>

      {suffix && <span style={props.suffixStyle}>{suffix}</span>}
    </div>
  );
};

CountTo.displayName = 'CountTo';

export default CountTo;

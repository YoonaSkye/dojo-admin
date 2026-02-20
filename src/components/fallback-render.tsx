import type { FallbackProps } from 'react-error-boundary';
import { Button } from './ui/button';

const FallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
  // 可以在这里根据不同的业务逻辑处理错误或者上报给日志服务

  return (
    <div
      id="error-page"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {error instanceof Error ? (
          <i>{error.message}</i>
        ) : (
          <i>'出错了，请稍后再试'</i>
        )}
      </p>
      <Button className="mt-4" size="lg" onClick={resetErrorBoundary}>
        刷新重试
      </Button>
    </div>
  );
};

export default FallbackRender;

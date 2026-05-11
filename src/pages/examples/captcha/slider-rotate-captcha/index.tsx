import { Button, Card, message } from 'antd';
import { useRef } from 'react';

import { SliderCaptchaRef, SliderRotateCaptcha } from '@/components/captcha';
import Page from '@/components/page';

function SliderRotateCaptchaPage() {
  const el = useRef<SliderCaptchaRef>(null);
  function handleSuccess() {
    message.success('success!');
  }

  const avatar =
    'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp';

  return (
    <Page description="用于前端简单的拖动校验场景" title="滑块旋转校验">
      <Card
        className="mb-5"
        title="基本示例"
        extra={<Button onClick={() => el.current?.resume()}>重置</Button>}
      >
        <div className="flex-center p-4">
          <SliderRotateCaptcha
            ref={el}
            src={avatar}
            onSuccess={handleSuccess}
          />
        </div>
      </Card>
    </Page>
  );
}

export default SliderRotateCaptchaPage;

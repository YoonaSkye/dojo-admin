import { Button, Card, message } from 'antd';
import { useRef } from 'react';

import { SliderCaptchaRef, SliderTranslateCaptcha } from '@/components/captcha';
import Page from '@/components/page';

function SliderTranslateCaptchaPage() {
  const el = useRef<SliderCaptchaRef>(null);
  function handleSuccess() {
    message.success('success!');
  }
  return (
    <Page
      description="用于前端简单的拼图滑块水平拖动校验场景"
      title="拼图滑块校验"
    >
      <Card
        className="mb-5"
        title="基本示例"
        extra={<Button onClick={() => el.current?.resume()}>重置</Button>}
      >
        <div className="flex-center p-4">
          <SliderTranslateCaptcha
            ref={el}
            src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/pro-avatar.webp"
            canvasWidth={420}
            canvasHeight={420}
            onSuccess={handleSuccess}
          />
        </div>
      </Card>
    </Page>
  );
}

export default SliderTranslateCaptchaPage;

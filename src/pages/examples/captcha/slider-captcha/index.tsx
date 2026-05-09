import { Button, Card, message } from 'antd';
import { useRef } from 'react';

import Page from '@/components/page';
import SliderCaptcha, {
  CaptchaVerifyPassingData,
  SliderCaptchaRef,
} from '@/components/slider-captcha';

function SliderCaptchaPage() {
  const el1 = useRef<SliderCaptchaRef>(null);
  const el2 = useRef<SliderCaptchaRef>(null);
  const el3 = useRef<SliderCaptchaRef>(null);

  function handleSuccess(data: CaptchaVerifyPassingData) {
    const { time } = data;
    message.success(`校验成功,耗时${time}秒`);
  }
  function handleBtnClick(elRef?: SliderCaptchaRef | null) {
    if (!elRef) {
      return;
    }
    elRef.resume();
  }

  return (
    <Page description="用于前端简单的拖动校验场景" title="滑块校验">
      <Card className="mb-5" title="基础示例">
        <div className="flex-center p-4 px-[30%]">
          <SliderCaptcha ref={el1} onSuccess={handleSuccess} />
          <Button
            className="ml-2"
            type="primary"
            onClick={() => handleBtnClick(el1.current)}
          >
            还原
          </Button>
        </div>
      </Card>
      <Card className="mb-5" title="自定义圆角">
        <div className="flex-center p-4 px-[30%]">
          <SliderCaptcha
            ref={el2}
            className="rounded-full"
            onSuccess={handleSuccess}
          />
          <Button
            className="ml-2"
            type="primary"
            onClick={() => handleBtnClick(el2.current)}
          >
            还原
          </Button>
        </div>
      </Card>
      <Card className="mb-5" title="自定义背景色">
        <div className="flex-center p-4 px-[30%]">
          <SliderCaptcha
            ref={el3}
            barStyle={{
              backgroundColor: '#018ffb',
            }}
            success-text="校验成功"
            text="拖动以进行校验"
            onSuccess={handleSuccess}
          />
          <Button
            className="ml-2"
            type="primary"
            onClick={() => handleBtnClick(el3.current)}
          >
            还原
          </Button>
        </div>
      </Card>
    </Page>
  );
}

export default SliderCaptchaPage;

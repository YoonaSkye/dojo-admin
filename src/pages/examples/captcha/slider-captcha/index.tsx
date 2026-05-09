import { Button, Card, message } from 'antd';
import { Bell, Sun } from 'lucide-react';
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
  const el4 = useRef<SliderCaptchaRef>(null);
  const el5 = useRef<SliderCaptchaRef>(null);
  const el6 = useRef<SliderCaptchaRef>(null);

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

      <Card className="mb-5" title="自定义拖拽图标">
        <div className="flex-center p-4 px-[30%]">
          <SliderCaptcha
            ref={el4}
            onSuccess={handleSuccess}
            actionIcon={(isPassing) => {
              return isPassing ? <Bell /> : <Sun />;
            }}
          />

          <Button
            className="ml-2"
            type="primary"
            onClick={() => handleBtnClick(el4.current)}
          >
            还原
          </Button>
        </div>
      </Card>

      <Card className="mb-5" title="自定义文本">
        <div className="flex-center p-4 px-[30%]">
          <SliderCaptcha
            ref={el5}
            successText="成功"
            text="拖动"
            onSuccess={handleSuccess}
          />
          <Button
            className="ml-2"
            type="primary"
            onClick={() => handleBtnClick(el5.current)}
          >
            还原
          </Button>
        </div>
      </Card>

      <Card className="mb-5" title="自定义内容(slot)">
        <div className="flex-center p-4 px-[30%]">
          <SliderCaptcha
            ref={el6}
            onSuccess={handleSuccess}
            contentText={(isPassing) => {
              return isPassing ? (
                <>
                  <Bell className="mr-2 size-4" />
                  成功
                </>
              ) : (
                <>
                  <Sun className="mr-2 size-4" /> 拖动
                </>
              );
            }}
          />
          <Button
            className="ml-2"
            type="primary"
            onClick={() => handleBtnClick(el6.current)}
          >
            还原
          </Button>
        </div>
      </Card>
    </Page>
  );
}

export default SliderCaptchaPage;

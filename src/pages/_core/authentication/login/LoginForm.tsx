import { AuthApi } from '@/api/core/auth';
import { IconButton } from '@/components/icon';
import {
  SvgGithubIcon,
  SvgGoogleIcon,
  SvgQQChatIcon,
  SvgWeChatIcon,
} from '@/icons';
import { useSignIn } from '@/store/access';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { signIn, loading } = useSignIn();
  const { t } = useTranslation();

  const handleFinish = async ({ username, password }: AuthApi.LoginParams) => {
    try {
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          username: 'vben',
          password: '123456',
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('authentication.usernameTip') }]}
        >
          <Input placeholder="dojo" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('authentication.passwordTip') }]}
        >
          <Input.Password type="password" placeholder="123456" />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('authentication.rememberMe')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <button className="underline">
                {t('authentication.forgetPassword')}
              </button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500"
            loading={loading}
          >
            {t('common.login')}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col span={12} flex="1">
            <Button className="w-full !text-sm">
              {t('authentication.mobileLogin')}
            </Button>
          </Col>
          <Col span={12} flex="1">
            <Button className="w-full !text-sm">
              {t('authentication.qrcodeLogin')}
            </Button>
          </Col>
        </Row>

        <div className="w-full sm:mx-auto md:max-w-md">
          <div className="mt-4 flex items-center justify-between">
            <span className="border-input w-[35%] border-b dark:border-gray-600"></span>
            <span className="text-muted-foreground text-center text-xs uppercase">
              {t('authentication.thirdPartyLogin')}
            </span>
            <span className="border-input w-[35%] border-b dark:border-gray-600"></span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center">
            <IconButton>
              <SvgWeChatIcon />
            </IconButton>
            <IconButton>
              <SvgQQChatIcon />
            </IconButton>
            <IconButton>
              <SvgGithubIcon />
            </IconButton>
            <IconButton>
              <SvgGoogleIcon />
            </IconButton>
          </div>
        </div>
        <div className="mt-3 text-center text-sm">
          {t('authentication.accountTip')}
          <span className="text-primary hover:text-primary-hover active:text-primary-active cursor-pointer text-sm font-normal">
            {t('authentication.createAccount')}
          </span>
        </div>
      </Form>
    </>
  );
}

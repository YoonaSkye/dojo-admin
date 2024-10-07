import { SignInReq } from '@/api/services/userService';
import { Button as ShadButton } from '@/components/ui/button';
import { MdiGithub, MdiGoogle, MdiQqchat, MdiWechat } from '@/icons';
import { useSignIn } from '@/store/userStore';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const { t } = useTranslation();

  const handleFinish = async ({ username, password }: SignInReq) => {
    setLoading(true);
    try {
      await signIn({ username, password });
    } finally {
      setLoading(false);
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
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input placeholder="admin@gamil.com" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password type="password" placeholder="demo1234" />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <button className="underline">忘记密码</button>
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
            登录
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col span={9} flex="1">
            <Button className="w-full !text-sm">手机登录</Button>
          </Col>
          <Col span={9} flex="1">
            <Button className="w-full !text-sm">二维码登录</Button>
          </Col>
          <Col span={6} flex="1">
            <Button className="w-full !text-sm">注册</Button>
          </Col>
        </Row>

        <div className="w-full sm:mx-auto md:max-w-md">
          <div className="mt-4 flex items-center justify-between">
            <span className="border-input w-[35%] border-b dark:border-gray-600"></span>
            <span className="text-muted-foreground text-center text-xs uppercase">
              其他登录方式
            </span>
            <span className="border-input w-[35%] border-b dark:border-gray-600"></span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center">
            <ShadButton
              variant="outline"
              size="icon"
              className="rounded-full outline-none flex items-center gap-1"
            >
              <MdiWechat />
            </ShadButton>
            <ShadButton
              variant="outline"
              size="icon"
              className="rounded-full outline-none flex items-center gap-1"
            >
              <MdiQqchat />
            </ShadButton>
            <ShadButton
              variant="outline"
              size="icon"
              className="rounded-full outline-none flex items-center gap-1"
            >
              <MdiGithub />
            </ShadButton>
            <ShadButton
              variant="outline"
              size="icon"
              className="rounded-full outline-none flex items-center gap-1"
            >
              <MdiGoogle />
            </ShadButton>
          </div>
        </div>
        <div className="mt-3 text-center text-sm">
          还没有账号?{' '}
          <span className="text-primary hover:text-primary-hover active:text-primary-active cursor-pointer text-sm font-normal">
            创建账号
          </span>
        </div>
      </Form>
    </>
  );
}

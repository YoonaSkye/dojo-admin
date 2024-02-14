import { SignInReq } from '@/api/services/userService';
import { useSignIn } from '@/store/userStore';
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Tag,
} from 'antd';
import { useState } from 'react';
import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from 'react-icons/ai';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();

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
      <div className="mb-4 text-2xl font-bold xl:text-3xl">登录</div>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          username: 'admin@gmail.com',
          password: 'demo1234',
        }}
        onFinish={handleFinish}
      >
        <div className="mb-4 flex flex-col">
          <Alert
            type="info"
            description={
              <div className="flex flex-col">
                <div className="flex mb-2">
                  <Tag color="blue">Admin账号:</Tag>
                  <strong className="ml-1">
                    <span>admin@gamil.com</span>
                  </strong>
                </div>
                <div className="flex">
                  <Tag color="blue">password密码:</Tag>
                  <strong className="ml-1">
                    <span>demo1234</span>
                  </strong>
                </div>
              </div>
            }
          />
        </div>

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

        <Divider className="!text-xs">其他登录方式</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub />
          <AiFillWechat />
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  );
}

import { LinkOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Switch,
} from 'antd';
import React, { useState } from 'react';

import {
  CountTo,
  TransitionPresets,
  TransitionKey,
} from '@/components/count-to';
import Page from '@/components/page';

const CountToDemo: React.FC = () => {
  const [form] = Form.useForm();
  const [config, setConfig] = useState({
    decimal: '.',
    decimals: 2,
    delay: 0,
    disabled: false,
    duration: 2000,
    endVal: 100_000,
    prefix: '￥',
    separator: ',',
    startVal: 0,
    suffix: '元',
    transition: 'easeOutQuart' as TransitionKey,
  });

  const changeNumber = () => {
    const randomVal =
      Math.floor(Math.random() * 100000000) / 10 ** config.decimals;
    setConfig((prev) => ({ ...prev, endVal: randomVal }));
    form.setFieldValue('endVal', randomVal);
  };

  function onStarted() {
    message.loading({
      content: '动画已开始',
      duration: 0,
      key: 'animator-info',
    });
  }

  function onFinished() {
    message.success({
      content: '动画已结束',
      duration: 2,
      key: 'animator-info',
    });
  }

  return (
    <Page title="CountTo" description="数字滚动动画组件使用">
      <Card title="CountTo 数字滚动">
        <div className="flex-center w-full pb-4">
          <CountTo
            {...config}
            onStarted={onStarted}
            onFinished={onFinished}
            decimalStyle={{
              fontSize: 'small',
              fontStyle: 'italic',
            }}
            mainStyle={{
              color: 'hsl(var(--primary))',
              fontSize: 'xx-large',
              fontWeight: 'bold',
            }}
            prefixStyle={{
              paddingRight: '0.5rem',
            }}
            suffixStyle={{
              paddingLeft: '0.5rem',
            }}
          />
        </div>

        <Form
          form={form}
          initialValues={config}
          onValuesChange={(changedValues, all) => {
            setConfig((prev) => ({ ...prev, ...changedValues }));
          }}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="初始值" name="startVal">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="当前值" name="endVal">
                <InputNumber
                  className="w-full"
                  addonAfter={
                    <ReloadOutlined
                      onClick={changeNumber}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="禁用动画"
                name="disabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="延迟动画" name="delay">
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="持续时间(ms)" name="duration">
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="小数位数" name="decimals">
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="分隔符" name="separator">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="小数点" name="decimal">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="动画" name="transition">
                <Select>
                  {Object.keys(TransitionPresets).map((key) => (
                    <Select.Option key={key} value={key}>
                      {key}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="前缀" name="prefix">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="后缀" name="suffix">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Page>
  );
};

export default CountToDemo;

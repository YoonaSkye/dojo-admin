import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';
import { memo } from 'react';

import { Iconify } from '@/components/icon';

import type { FormInstance } from 'antd/es/form';




interface SearchProps {
  form: FormInstance;
  reset?: () => void;
  search?: () => void;
  searchParams?: Record<string, any>;
}

const genderOptions = [
  { label: '男', value: '1' },
  { label: '女', value: '2' },
];

const enableStatusOptions = [
  { label: '启用', value: '1' },
  { label: '禁用', value: '2' },
];

const UserSearch: React.FC<SearchProps> = memo(
  ({ form, reset, search, searchParams }) => {
    return (
      <Form
        form={form}
        initialValues={searchParams}
        labelCol={{
          md: 7,
          span: 5,
        }}
      >
        <Row wrap gutter={[16, 16]}>
          <Col lg={6} md={12} span={24}>
            <Form.Item className="m-0" label="用户名" name="userName">
              <Input placeholder="请输入用户名" />
            </Form.Item>
          </Col>

          <Col lg={6} md={12} span={24}>
            <Form.Item className="m-0" label="性别" name="userGender">
              <Select
                allowClear
                options={genderOptions}
                placeholder="请选择性别"
              />
            </Form.Item>
          </Col>

          <Col lg={6} md={12} span={24}>
            <Form.Item className="m-0" label="昵称" name="nickName">
              <Input placeholder="请输入昵称" />
            </Form.Item>
          </Col>

          <Col lg={6} md={12} span={24}>
            <Form.Item className="m-0" label="电话" name="userPhone">
              <Input placeholder="请输入电话" />
            </Form.Item>
          </Col>

          <Col lg={6} md={12} span={24}>
            <Form.Item
              className="m-0"
              label="邮箱"
              name="userEmail"
              // rules={[email]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>

          <Col lg={6} md={12} span={24}>
            <Form.Item className="m-0" label="用户状态" name="userStatus">
              <Select
                allowClear
                options={enableStatusOptions}
                placeholder="请选择用户状态"
              />
            </Form.Item>
          </Col>

          <Col lg={12} span={24}>
            <Form.Item className="m-0">
              <Flex align="center" gap={12} justify="end">
                <Button
                  icon={<Iconify icon="ic:round-refresh" />}
                  onClick={reset}
                >
                  重置
                </Button>
                <Button
                  ghost
                  icon={<Iconify icon="ic:round-search" />}
                  type="primary"
                  onClick={search}
                >
                  搜索
                </Button>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  },
);

export default UserSearch;

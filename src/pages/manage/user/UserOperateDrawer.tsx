import { useRequest, useUpdateEffect } from 'ahooks';
import { Button, Drawer, Flex, Form, Input, Radio, Select } from 'antd';
import axios from 'axios';

import { TableOperateType } from '@/types';

import type { FormInstance } from 'antd';

interface OptionsProps {
  label: string;
  value: string;
}

const userGenderOptions = [
  {
    label: '男',
    value: '1',
  },
  {
    label: '女',
    value: '2',
  },
];
const enableStatusOptions = [
  { label: '启用', value: '1' },
  { label: '禁用', value: '2' },
];

const getOptions = (item: any) => {
  return {
    label: item.roleName,
    value: item.roleCode,
  };
};

const fetchGetAllRoles = async () => {
  const Iparams = {
    apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
  };
  const url = `https://apifoxmock.com/m1/3109515-0-default/systemManage/getAllRoles`;

  return axios({
    method: 'get',
    params: Iparams,
    url: url,
  }).then((res) => {
    const resData = res.data.data;

    return resData;
  });
};

interface OperateDrawerProps {
  form: FormInstance;
  handleSubmit: () => void;
  onClose: () => void;
  open: boolean;
  operateType: TableOperateType;
}

export default function UserOperateDrawer({
  form,
  handleSubmit,
  onClose,
  open,
  operateType,
}: OperateDrawerProps) {
  const { data, run } = useRequest(fetchGetAllRoles, {
    manual: true,
  });

  useUpdateEffect(() => {
    if (open) {
      run();
    }
  }, [open]);

  const roleOptions: OptionsProps[] = data ? data.map(getOptions) : [];
  return (
    <Drawer
      open={open}
      title={operateType === 'add' ? '创建用户' : '编辑用户'}
      footer={
        <Flex justify="space-between">
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSubmit}>
            确认
          </Button>
        </Flex>
      }
      onClose={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="用户名"
          name="userName"
          rules={[
            {
              required: true,
              message: '用户名不能为空',
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item label="性别" name="userGender">
          <Radio.Group>
            {userGenderOptions.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="昵称" name="nickName">
          <Input placeholder="请输入昵称" />
        </Form.Item>

        <Form.Item label="手机号" name="userPhone">
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item label="邮箱" name="userEmail">
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="用户状态"
          name="status"
          rules={[
            {
              required: true,
              message: '用户状态不能为空',
            },
          ]}
        >
          <Radio.Group>
            {enableStatusOptions.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="用户角色" name="roles">
          <Select options={roleOptions} placeholder="请选择用户角色" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

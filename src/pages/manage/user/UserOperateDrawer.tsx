import { DrawerForm } from '@ant-design/pro-components';
import { useRequest, useUpdateEffect } from 'ahooks';
import { Form, Input, Radio, Select } from 'antd';
import request from 'umi-request';
import type { UserItem } from '.';
import { useEffect } from 'react';

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
  return request
    .get(
      'https://apifoxmock.com/m1/3109515-0-default/systemManage/getAllRoles',
      {
        params: {
          apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
        },
      },
    )
    .then((res) => res.data);
};

interface OperateDrawerProps {
  title: string;
  currentRow: UserItem | null;
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  handleSubmit: (values: any) => void;
}

export default function UserOperateDrawer({
  title,
  currentRow,
  open,
  onOpenChange,
  handleSubmit,
}: OperateDrawerProps) {
  const [form] = Form.useForm();

  const { data, run } = useRequest(fetchGetAllRoles, {
    manual: true,
  });

  useUpdateEffect(() => {
    if (open) {
      run();
    }
  }, [open]);

  useEffect(() => {
    if (currentRow) {
      form.setFieldsValue(currentRow);
    } else {
      form.resetFields();
    }
  }, [currentRow]);

  const roleOptions: OptionsProps[] = data ? data.map(getOptions) : [];
  return (
    <DrawerForm<UserItem>
      drawerProps={{
        forceRender: true,
      }}
      form={form}
      resize={{
        onResize() {
          console.log('resize!');
        },
        // maxWidth: window.innerWidth * 0.8,
        maxWidth: 300,
        minWidth: 300,
      }}
      title={title}
      layout="vertical"
      // drawerProps={{
      //   destroyOnClose: true,
      // }}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={async (values) => {
        handleSubmit(values);
        return true;
      }}
    >
      <Form.Item
        label="用户名"
        name="userName"
        rules={[
          {
            // TODO 验证规则起作用后，关闭form,重新打开，提示依旧在
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

      <Form.Item label="邮箱" name="email">
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
    </DrawerForm>
  );
}

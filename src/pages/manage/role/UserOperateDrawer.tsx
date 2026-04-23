import { DrawerForm } from '@ant-design/pro-components';
import { Form, Input, Radio } from 'antd';
import { useEffect } from 'react';

import type { RoleItem } from '.';

const enableStatusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 2 },
];

interface OperateDrawerProps {
  title: string;
  currentRow: RoleItem | null;
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  handleSubmit: (values: any) => void;
}

export default function RoleOperateDrawer({
  title,
  currentRow,
  open,
  onOpenChange,
  handleSubmit,
}: OperateDrawerProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentRow) {
      console.log('currentRow', currentRow);

      form.setFieldsValue(currentRow);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRow]);

  return (
    <DrawerForm<RoleItem>
      drawerProps={{
        forceRender: true,
      }}
      form={form}
      resize={{
        onResize() {},
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
        label="角色名称"
        name="name"
        rules={[
          {
            required: true,
            message: '角色名称不能为空',
          },
        ]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>

      <Form.Item
        label="角色状态"
        name="status"
        rules={[
          {
            required: true,
            message: '角色状态不能为空',
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

      <Form.Item label="备注" name="remark">
        <Input.TextArea placeholder="请输入角色备注" />
      </Form.Item>
    </DrawerForm>
  );
}

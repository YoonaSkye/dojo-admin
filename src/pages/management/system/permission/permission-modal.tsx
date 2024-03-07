import { Permission } from '#/entity';
import { BasicStatus, PermissionType } from '#/enum';
import { useUserPermission } from '@/store/userStore';
import { Modal, Form, Radio, Input, TreeSelect, InputNumber } from 'antd';
import { useEffect } from 'react';

export type PermissionModalProps = {
  formValue: Permission;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};
// TODO: 此组件只完成了数据的展示，没有和后端的交互功能
// BUG: 点击NEW按钮后，数据默认是上一次点击的Edit表单的数据
// Form.Item<Types>的作用？
// TODO： 表单验证
export default function PermissionModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
}: PermissionModalProps) {
  const [form] = Form.useForm();
  const permissions = useUserPermission();

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  return (
    <Modal title={title} open={show} onOk={onOk} onCancel={onCancel}>
      <Form
        initialValues={formValue}
        form={form}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label="Type" name="type" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={PermissionType.CATALOGUE}>CATALOGUE</Radio>
            <Radio value={PermissionType.MENU}>MENU</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Name" name="name" required>
          <Input />
        </Form.Item>

        <Form.Item
          label="Label"
          name="label"
          required
          tooltip="internationalization config"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Parent" name="parentId" required>
          <TreeSelect
            fieldNames={{
              label: 'name',
              value: 'id',
              children: 'children',
            }}
            treeData={permissions}
          />
        </Form.Item>

        <Form.Item label="Route" name="route" required>
          <Input />
        </Form.Item>

        <Form.Item
          label="Component"
          name="component"
          required={formValue.type === PermissionType.MENU}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Icon"
          name="icon"
          tooltip="local icon should start with ic"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Hide" name="hide" tooltip="hide in menu">
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={false}>Show</Radio>
            <Radio value>Hide</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Order" name="order">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>

      <Form.Item label="Status" name="status" required>
        <Radio.Group optionType="button" buttonStyle="solid">
          <Radio value={BasicStatus.ENABLE}> Enable </Radio>
          <Radio value={BasicStatus.DISABLE}> Disable </Radio>
        </Radio.Group>
      </Form.Item>
    </Modal>
  );
}

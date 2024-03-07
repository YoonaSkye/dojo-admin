import { Permission } from '#/entity';
import { BasicStatus, PermissionType } from '#/enum';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import { useUserPermission } from '@/store/userStore';
import { Button, Card, Popconfirm, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { isNil } from 'ramda';
import { useTranslation } from 'react-i18next';
import PermissionModal, { type PermissionModalProps } from './permission-modal';
import { useState } from 'react';

const defaultPermissionValue: Permission = {
  id: '',
  parentId: '',
  name: '',
  label: '',
  route: '',
  component: '',
  icon: '',
  hide: false,
  status: BasicStatus.ENABLE,
  type: PermissionType.CATALOGUE,
};

export default function PermissionPage() {
  const permissions = useUserPermission();
  const { t } = useTranslation();

  const [permissionModalProps, setPermissionModalProps] =
    useState<PermissionModalProps>({
      formValue: { ...defaultPermissionValue },
      title: 'New',
      show: false,
      onOk: () => {
        setPermissionModalProps((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => {
        setPermissionModalProps((prev) => ({ ...prev, show: false }));
      },
    });

  const columns: TableProps<Permission>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (_, record) => <div>{t(record.label)}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 60,
      render: (_, record) => (
        <Tag color="processing">{PermissionType[record.type]}</Tag>
      ),
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: 60,
      render: (icon) => {
        if (isNil(icon)) return '';
        if (icon.startsWith('ic')) return <SvgIcon icon={icon} size="18" />;
        return <Iconify icon={icon} size="18" />;
      },
    },
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        return (
          <Tag color={status === BasicStatus.DISABLE ? 'error' : 'success'}>
            {status === BasicStatus.DISABLE ? 'Disable' : 'Enable'}
          </Tag>
        );
      },
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 60,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="删除此权限"
            okText="是"
            cancelText="否"
            placement="left"
          >
            <IconButton>
              <Iconify
                icon="mingcute:delete-2-fill"
                size={18}
                className="text-error"
              />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onCreate = () => {
    setPermissionModalProps((prev) => ({
      ...prev,
      show: true,
      ...defaultPermissionValue,
    }));
  };

  const onEdit = (formValue: Permission) => {
    setPermissionModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }));
  };

  return (
    <Card
      title="权限列表"
      extra={
        <Button type="primary" onClick={onCreate}>
          New
        </Button>
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={permissions}
        size="small"
        pagination={false}
      />
      <PermissionModal {...permissionModalProps} />
    </Card>
  );
}

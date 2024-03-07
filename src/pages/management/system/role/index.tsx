import { Role } from '#/entity';
import { BasicStatus } from '#/enum';
import { IconButton, Iconify } from '@/components/icon';
import { ROLE_LIST } from '@/mock/assets';
import type { TableProps } from 'antd';
import { Button, Card, Popconfirm, Table, Tag } from 'antd';

const ROLES: Role[] = ROLE_LIST;

export default function RolePage() {
  const columns: TableProps<Role>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 60,
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
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
      width: 60,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton>
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
  return (
    <Card title="角色列表" extra={<Button type="primary">New</Button>}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={ROLES}
        size="small"
        pagination={false}
      />
    </Card>
  );
}

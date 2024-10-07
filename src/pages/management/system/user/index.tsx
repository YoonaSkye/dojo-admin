import { Role, UserInfo } from '#/entity';
import { BasicStatus } from '#/enum';
import { IconButton, Iconify } from '@/components/icon';
import { USER_LIST } from '@/mocks/assets';
import { useThemeToken } from '@/theme/hooks';
import type { TableProps } from 'antd';
import { Button, Card, Popconfirm, Table, Tag } from 'antd';

const USERS: UserInfo[] = USER_LIST;

export default function UserPage() {
  const { colorTextSecondary } = useThemeToken();

  const columns: TableProps<UserInfo>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (_, record) => {
        return (
          <div className="flex">
            <img
              alt=""
              src={record.avatar}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-2 flex flex-col">
              <span className="text-sm">{record.username}</span>
              <span style={{ color: colorTextSecondary }} className="text-xs">
                {record.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: Role) => <Tag color="cyan">{role.name}</Tag>,
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
        dataSource={USERS}
        size="small"
        pagination={false}
      />
    </Card>
  );
}

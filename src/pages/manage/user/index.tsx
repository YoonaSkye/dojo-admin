import { useTableScroll } from '@/hooks/use-tab-srcoll';
import { antdUtils } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { Button, Popconfirm, Tag } from 'antd';

import { lazy, Suspense, useRef, useState } from 'react';
import request from 'umi-request';

const UserOperateDrawer = lazy(() => import('./UserOperateDrawer'));

const ATG_MAP = {
  1: 'success',
  2: 'warning',
};

const tagUserGenderMap = {
  1: 'processing',
  2: 'error',
};
const enableStatusRecord = {
  '1': '启用',
  '2': '禁用',
};

export type UserItem = {
  id: number;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  status: '1' | '2';
  userName: string;
  userGender: '1' | '2';
  nickName: string;
  userPhone: string;
  userEmail: string;
  userRoles: string[];
};

export default function UserManage() {
  const actionRef = useRef<ActionType>();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<UserItem | null>(null);

  const handleClose = (open: boolean) => {
    setVisible(open);
    if (!open) {
      setCurrentRow(null);
    }
  };

  const handleEdit = (record: any) => {
    setCurrentRow(record);
    setVisible(true);
  };

  const handleAdd = () => {
    setCurrentRow(null);
    setVisible(true);
  };

  const handleSubmit = async (values: any) => {
    if (currentRow) {
      // 编辑逻辑
      antdUtils.message.success('编辑成功');
    } else {
      // 新增逻辑
      antdUtils.message.success('新增成功');
    }
    setVisible(false);
    actionRef.current?.reload();
  };

  const columns: ProColumns<UserItem>[] = [
    {
      align: 'center',
      dataIndex: 'id',
      // key: 'index',
      title: '序号',
      width: 64,
      search: false,
    },
    {
      align: 'center',
      dataIndex: 'userName',
      key: 'userName',
      minWidth: 100,
      title: '用户名',
    },
    {
      align: 'center',
      dataIndex: 'userGender',
      key: 'userGender',
      valueType: 'select',
      valueEnum: {
        '1': {
          text: '男',
        },
        '2': {
          text: '女',
        },
      },
      render: (_, record) => {
        if (record?.userGender === null) {
          return null;
        }

        const label = record.userGender === '1' ? '男' : '女';

        return <Tag color={tagUserGenderMap[record.userGender]}>{label}</Tag>;
      },
      title: '性别',
      width: 100,
    },
    {
      align: 'center',
      dataIndex: 'nickName',
      key: 'nickName',
      minWidth: 100,
      title: '昵称',
    },
    {
      align: 'center',
      dataIndex: 'userPhone',
      key: 'userPhone',
      title: '电话',
      width: 120,
    },
    {
      align: 'center',
      dataIndex: 'userEmail',
      key: 'userEmail',
      minWidth: 200,
      title: '邮箱',
    },
    {
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      valueEnum: {
        '1': {
          text: '启用',
        },
        '2': {
          text: '禁用',
        },
      },
      render: (_, record) => {
        if (record.status === null) {
          return null;
        }
        const label = enableStatusRecord[record.status];
        return <Tag color={ATG_MAP[record.status]}>{label}</Tag>;
      },
      title: '用户状态',
      width: 100,
    },
    {
      align: 'center',
      key: 'operate',
      search: false,
      render: (_, record) => (
        <div className="flex-center gap-[8px]">
          <Button
            ghost
            size="small"
            type="primary"
            onClick={() => {
              handleEdit(record);
            }}
          >
            编辑
          </Button>

          <Popconfirm
            title="确定要删除吗？"
            // onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
      title: '操作',
      width: 195,
    },
  ];

  return (
    <div ref={tableWrapperRef} className="p-4 h-full">
      <ProTable<UserItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const p = {
            ...params,
            current: params.current,
            pageSize: params.pageSize,
          };

          return request
            .get(
              'https://apifoxmock.com/m1/3109515-0-default/systemManage/getUserList',
              {
                params: {
                  apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
                  ...p,
                },
              }
            )
            .then((res) => {
              const data = res.data;

              return {
                data: data.records,
                total: data.total,
                success: true,
              };
            });
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          fullScreen: true,
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={
          {
            // pageSize: 20,
          }
        }
        scroll={scrollConfig}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <Suspense>
        <UserOperateDrawer
          title={currentRow ? '编辑用户' : '新增用户'}
          currentRow={currentRow}
          open={visible}
          onOpenChange={handleClose}
          handleSubmit={handleSubmit}
        />
      </Suspense>
    </div>
  );
}

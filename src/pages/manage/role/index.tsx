import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Tag } from 'antd';
import { useRef, useState } from 'react';

import { getRoleList } from '@/api/system';
import { antdUtils } from '@/utils';

import RoleOperateDrawer from './UserOperateDrawer';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

const ATG_MAP = {
  1: 'success',
  0: 'warning',
};

const enableStatusRecord = {
  '1': '启用',
  '0': '禁用',
};

export type RoleItem = {
  id: number;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  status: '1' | '0';
  roleName: string;
  roleCode: string;
  roleDesc: string;
};

const apiFetch = (params: any) => {
  return getRoleList({ page: params.current, pageSize: params.pageSize }).then(
    (resData: any) => ({
      data: resData.items,
      total: resData.total,
      success: true,
    }),
  );
};

export default function RoleManage() {
  const actionRef = useRef<ActionType>();

  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<RoleItem | null>(null);

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

  const columns: ProColumns<RoleItem>[] = [
    {
      align: 'center',
      dataIndex: 'name',
      key: 'name',
      // minWidth: 200,
      width: 200,
      title: '角色名称',
    },
    {
      align: 'center',
      dataIndex: 'id',
      key: 'index',
      title: '角色ID',
      width: 200,
      // search: false,
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
        '0': {
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
      dataIndex: 'remark',
      key: 'remark',
      minWidth: 100,
      title: '备注',
      // search: false,
    },
    {
      dataIndex: 'createTime',
      key: 'createTime',
      minWidth: 100,
      title: '创建时间',
      // search: false,
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
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>

          <Popconfirm
            title="确认删除吗？"
            // onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
      title: '操作',
      width: 130,
    },
  ];

  return (
    <div className="h-full p-4">
      <ProTable<RoleItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const p = {
            ...params,
            current: params.current,
            pageSize: params.pageSize,
          };

          // return fetchGetRoleList(p);
          return apiFetch(p);
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
        scroll={{ y: 350 }}
        dateFormatter="string"
        headerTitle="角色列表"
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
      <RoleOperateDrawer
        title={currentRow ? '编辑用户' : '新增用户'}
        currentRow={currentRow}
        open={visible}
        onOpenChange={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

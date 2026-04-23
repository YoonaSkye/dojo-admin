import {
  Button,
  Card,
  Collapse,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
} from 'antd';
import { lazy, Suspense } from 'react';

import { getUserList } from '@/api/system';
import { TableHeaderOperation } from '@/features/table';
import { useTable } from '@/hooks/use-table';
import { useTableOperate } from '@/hooks/use-table-operate';
import { useTableScroll } from '@/hooks/use-table-srcoll';

import UserSearch from './UserSearch';

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

const apiFetch = (params: any) => {
  console.log('params', params);

  return getUserList({ page: params.current, pageSize: params.size }).then(
    (resData: any) => ({
      records: resData.items,
      total: resData.total,
    }),
  );
};

export default function UserMange() {
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const { columnChecks, data, run, searchProps, setColumnChecks, tableProps } =
    useTable({
      apiFn: apiFetch,
      apiParams: {
        current: 1,
        nickName: null,
        size: 10,
        // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
        // the value can not be undefined, otherwise the property in Form will not be reactive
        status: null,
        userEmail: null,
        userGender: null,
        userName: null,
        userPhone: null,
      },
      columns: (): TableColumnsType<UserItem> => [
        {
          dataIndex: 'index',
          key: 'index',
          title: '序号',
          width: 64,
        },
        {
          align: 'center',
          dataIndex: 'userName',
          key: 'userName',
          width: 120,
          title: '用户名',
        },
        {
          align: 'center',
          dataIndex: 'userGender',
          key: 'userGender',
          render: (_, record) => {
            if (record?.userGender === null) {
              return null;
            }

            const label = record.userGender === '1' ? '男' : '女';

            return (
              <Tag color={tagUserGenderMap[record.userGender]}>{label}</Tag>
            );
          },
          title: '性别',
          width: 100,
        },
        {
          align: 'center',
          dataIndex: 'nickName',
          key: 'nickName',
          minWidth: 50,
          title: '昵称',
        },
        {
          align: 'center',
          dataIndex: 'userPhone',
          key: 'userPhone',
          title: '电话',
          minWidth: 120,
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
                onConfirm={() => handleDelete(record.id)}
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
      ],
      pagination: {
        showQuickJumper: true,
      },
    });

  const {
    checkedRowKeys,
    generalPopupOperation,
    handleAdd,
    handleEdit,
    onBatchDeleted,
    onDeleted,
    rowSelection,
  } = useTableOperate(data, run, async (res: any, type: any) => {
    if (type === 'add') {
      // add request 调用新增的接口
      console.log(res);
    } else {
      // edit request 调用编辑的接口
      console.log(res);
    }
  });

  async function handleBatchDelete() {
    // request
    console.log(checkedRowKeys);
    onBatchDeleted();
  }

  function handleDelete(id: number) {
    // request
    console.log(id);

    onDeleted();
  }

  function edit(id: number) {
    handleEdit(id);
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden p-4">
      <Collapse
        bordered={false}
        className="rounded-[8px] bg-header shadow-sm"
        defaultActiveKey={['1']}
        items={[
          {
            children: <UserSearch {...searchProps} />,
            key: '1',
            label: '搜索',
          },
        ]}
      />
      <Card
        className="flex-col rounded-[8px] shadow-sm sm:flex-1 sm:overflow-hidden"
        ref={tableWrapperRef}
        title="用户列表"
        variant="borderless"
        extra={
          <TableHeaderOperation
            add={handleAdd}
            columns={columnChecks}
            disabledDelete={checkedRowKeys.length === 0}
            loading={tableProps.loading}
            refresh={run}
            setColumnChecks={setColumnChecks}
            onDelete={handleBatchDelete}
          />
        }
      >
        <Table
          rowSelection={rowSelection}
          scroll={scrollConfig}
          size="small"
          {...tableProps}
        />
        <Suspense>
          {/* @ts-ignore 暂时忽略类型错误 */}
          <UserOperateDrawer {...generalPopupOperation} />
        </Suspense>
      </Card>
    </div>
  );
}

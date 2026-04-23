import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Tag } from 'antd';
import { useRef, useState } from 'react';

import { getMenuList, SystemMenuApi } from '@/api/system';
import { $t } from '@/locales';
import { antdUtils } from '@/utils';

import MenuOperateModal from './MenuOperateModal';
import { MenuOption } from './shared';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

const ATG_MAP = {
  1: 'success',
  2: 'warning',
};

const enableStatusRecord = {
  '1': '启用',
  '2': '禁用',
};

const menuTypeRecord = {
  catalog: '目录',
  menu: '菜单',
  button: '按钮',
};

const yesOrNoRecord = {
  N: '否',
  Y: '是',
};

const YesOrNo_Map = {
  N: 'default',
  Y: 'error',
};

interface MenuItem extends SystemMenuApi.SystemMenu {}

const apiFetch = (params?: any) => {
  return getMenuList().then((resData) => ({
    data: resData,
    success: true,
  }));
};

export default function MenuManage() {
  const actionRef = useRef<ActionType>();

  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<MenuItem | null>(null);

  const menuList = useRef<MenuOption[]>([]);

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

  const columns: ProColumns<MenuItem>[] = [
    // {
    //   align: 'center',
    //   dataIndex: 'id',
    //   key: 'id',
    //   title: 'ID',
    // },
    {
      align: 'center',
      key: 'title',
      dataIndex: ['handle', 'title'],
      minWidth: 120,
      render: (title) => {
        const label = $t(title as string);

        return <span>{label}</span>;
      },
      title: '标题',
    },
    {
      align: 'center',
      key: 'type',
      render: (_, record) => {
        if (record.status === null) {
          return null;
        }

        const tagMap: Record<SystemMenuApi.SystemMenu['type'], string> = {
          catalog: 'default',
          menu: 'processing',
          button: 'orange',
          embedded: 'default',
          link: 'default',
        };

        const label = record.type;
        return <Tag color={tagMap[record.type]}>{label}</Tag>;
      },
      title: '菜单类型',
      width: 80,
    },
    {
      align: 'center',
      dataIndex: 'authCode',
      key: 'authCode',
      minWidth: 120,
      title: '权限标识',
    },
    {
      align: 'center',
      dataIndex: 'path',
      key: 'path',
      minWidth: 120,
      title: '路由地址',
    },
    {
      align: 'center',
      dataIndex: 'component',
      key: 'component',
      minWidth: 120,
      title: '页面组件',
    },
    {
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        if (record.status === null) {
          return null;
        }

        const status = record.status as '1' | '2';

        const label = enableStatusRecord[status];

        return <Tag color={ATG_MAP[status]}>{label}</Tag>;
      },
      title: '菜单状态',
      width: 80,
    },
    {
      align: 'center',
      key: 'operate',
      render: (_, record) => (
        <div className="flex-center justify-end gap-[8px]">
          {/* {record.menuType === '1' && (
            <Button
              ghost
              size="small"
              type="primary"
              // onClick={() => handleAddChildMenu(record.id)}
            >
              新增子菜单
            </Button>
          )} */}
          <Button size="small" onClick={() => handleEdit(record)}>
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
      width: 150,
    },
  ];

  return (
    <div className="h-full p-4">
      <ProTable<MenuItem>
        size="small"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          // const p = {
          //   ...params,
          //   current: params.current,
          //   pageSize: params.pageSize,
          // };

          // const response = await fetchGetMenuList(p);
          const response = await apiFetch();

          menuList.current = [];

          return response;
        }}
        rowKey="id"
        search={false}
        expandable={
          {
            // indentSize: 15,
          }
        }
        options={{
          fullScreen: true,
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={
          {
            // pageSize: 20,
            // hideOnSinglePage: true,
          }
        }
        scroll={{ y: 500 }}
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
      <MenuOperateModal
        title={currentRow ? '编辑用户' : '新增用户'}
        currentRow={currentRow}
        open={visible}
        onOpenChange={handleClose}
        handleSubmit={handleSubmit}
        menuList={menuList.current}
      />
    </div>
  );
}

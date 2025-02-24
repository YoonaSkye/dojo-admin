import { Iconify } from '@/components/icon';
import { useTableScroll } from '@/hooks/use-tab-srcoll';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Popconfirm, Tag } from 'antd';

import { useRef, useState } from 'react';
import request from 'umi-request';
import MenuOperateModal from './MenuOperateModal';
import { MenuOption } from './shared';
import { antdUtils } from '@/utils';

const ATG_MAP = {
  1: 'success',
  2: 'warning',
};

const enableStatusRecord = {
  '1': '启用',
  '2': '禁用',
};

const menuTypeRecord = {
  '1': '目录',
  '2': '菜单',
};

const yesOrNoRecord = {
  N: '否',
  Y: '是',
};

const YesOrNo_Map = {
  N: 'default',
  Y: 'error',
};

export type MenuItem = {
  id: number;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  status: '1' | '2';
  parentId: number;
  menuType: '1' | '2';
  menuName: string;
  routeName: string;
  routePath: string;
  component: string;
  order: number;
  i18nKey: string;
  icon: string;
  iconType: '1' | '2';
};

export default function MenuManage() {
  const actionRef = useRef<ActionType>();
  const { scrollConfig, tableWrapperRef } = useTableScroll();

  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<MenuItem | null>(null);

  // const menuList = useMemo(() => flattenMenu(data), [data]);
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
    console.log('values', values, 'current', currentRow);

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
    {
      align: 'center',
      dataIndex: 'id',
      key: 'id',
      title: 'ID',
    },
    {
      align: 'center',
      key: 'menuType',
      render: (_, record) => {
        if (record.status === null) {
          return null;
        }

        const tagMap: Record<Api.SystemManage.MenuType, string> = {
          1: 'default',
          2: 'processing',
        };

        const label = menuTypeRecord[record.menuType];
        return <Tag color={tagMap[record.menuType]}>{label}</Tag>;
      },
      title: '菜单类型',
      width: 80,
    },
    {
      align: 'center',
      key: 'menuName',
      minWidth: 120,
      render: (_, record) => {
        const { i18nKey, menuName } = record;

        // const label = i18nKey ? t(i18nKey) : menuName;
        const label = menuName;

        return <span>{label}</span>;
      },
      title: '菜单名称',
    },
    {
      align: 'center',
      key: 'icon',
      render: (_, record) => {
        const icon = record.iconType === '1' ? record.icon : undefined;

        return (
          <div className="flex-center">
            {/* <SvgIcon className="text-icon" icon={icon} localIcon={localIcon} /> */}
            <Iconify icon={record.icon} width="1em" height="1em" />
          </div>
        );
      },
      title: '图标',
      width: 60,
    },
    {
      align: 'center',
      dataIndex: 'routeName',
      key: 'routeName',
      minWidth: 120,
      title: '路由名称',
    },
    {
      align: 'center',
      dataIndex: 'routePath',
      key: 'routePath',
      minWidth: 120,
      title: '路由路径',
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
      title: '菜单状态',
      width: 80,
    },
    {
      align: 'center',
      dataIndex: 'hideInMenu',
      key: 'hideInMenu',
      render: (_, record) => {
        // const hide = record.hideInMenu ? 'Y' : 'N';
        const hide = 'N';

        const label = yesOrNoRecord[hide];

        return <Tag color={YesOrNo_Map[hide]}>{label}</Tag>;
      },
      title: '隐藏菜单',
      width: 80,
    },
    {
      align: 'center',
      dataIndex: 'parentId',
      key: 'parentId',
      title: '父级菜单ID',
      width: 90,
    },
    {
      align: 'center',
      dataIndex: 'order',
      key: 'order',
      title: '排序',
      width: 60,
    },
    {
      align: 'center',
      key: 'operate',
      render: (_, record, index) => (
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
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <ProTable<MenuItem>
        size="small"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const p = {
            ...params,
            current: params.current,
            pageSize: params.pageSize,
          };

          return request
            .get(
              'https://apifoxmock.com/m1/3109515-0-default/systemManage/getMenuList/v2',
              {
                params: {
                  apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
                  ...p,
                },
              }
            )
            .then((res) => {
              const data = res.data;
              menuList.current = [];

              return {
                data: data.records,
                total: data.total,
                success: true,
              };
            });
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
        scroll={scrollConfig}
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
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '2',
                },
                {
                  label: '3rd item',
                  key: '3',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
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

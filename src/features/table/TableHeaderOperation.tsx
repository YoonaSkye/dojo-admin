import { Button, Popconfirm, Popover, Space } from 'antd';
import React from 'react';

import { Iconify } from '@/components/icon';
import { TableColumnCheck } from '@/types';

import DragContent from './DragContent';

import type { FC } from 'react';





interface Props {
  add: () => void;
  children?: React.ReactNode;
  columns: TableColumnCheck[];
  disabledDelete?: boolean;
  loading?: boolean;
  onDelete: () => void;
  prefix?: React.ReactNode;
  refresh: () => void;
  setColumnChecks: (checks: TableColumnCheck[]) => void;
  suffix?: React.ReactNode;
}

const TableHeaderOperation: FC<Props> = ({
  add,
  children,
  columns,
  disabledDelete,
  loading,
  onDelete,
  prefix,
  refresh,
  setColumnChecks,
  suffix,
}) => {
  return (
    <Space wrap>
      {prefix}
      {children || (
        <>
          <Button
            ghost
            icon={<Iconify icon="ic:round-plus" />}
            size="small"
            type="primary"
            onClick={add}
          >
            新增
          </Button>
          <Popconfirm title="确定要删除吗？" onConfirm={onDelete}>
            <Button
              danger
              ghost
              disabled={disabledDelete}
              icon={<Iconify icon="ic:round-delete" />}
              size="small"
            >
              批量删除
            </Button>
          </Popconfirm>
        </>
      )}
      <Button
        icon={<Iconify icon="mdi:refresh" />}
        size="small"
        onClick={refresh}
      >
        刷新
      </Button>

      <Popover
        placement="bottomRight"
        trigger="click"
        content={
          <DragContent columns={columns} setColumnChecks={setColumnChecks} />
        }
      >
        <Button
          icon={<Iconify icon="ant-design:setting-outlined" />}
          size="small"
        >
          列设置
        </Button>
      </Popover>

      {suffix}
    </Space>
  );
};

export default TableHeaderOperation;

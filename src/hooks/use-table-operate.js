import { Form } from 'antd';
import { useState } from 'react';

import useBoolean from './use-boolean';
import { antdUtils } from '@/utils';

export function useTableOperate(data, getData, executeResActions) {
  const {
    bool: drawerVisible,
    setFalse: closeDrawer,
    setTrue: openDrawer,
  } = useBoolean();

  // const { t } = useTranslation();

  const [operateType, setOperateType] = useState('add');

  const [form] = Form.useForm();

  function handleAdd() {
    setOperateType('add');
    openDrawer();
  }

  /** the editing row data */
  const [editingData, setEditingData] = useState();

  function handleEdit(idOrData) {
    if (typeof idOrData === 'object') {
      form.setFieldsValue(idOrData);

      setEditingData(idOrData);
    } else {
      const findItem = data.find((item) => item.id === idOrData);
      if (findItem) {
        form.setFieldsValue(findItem);

        setEditingData(findItem);
      }
    }

    setOperateType('edit');
    openDrawer();
  }

  /** the checked row keys of table */
  const [checkedRowKeys, setCheckedRowKeys] = useState([]);

  function onSelectChange(keys) {
    setCheckedRowKeys(keys);
  }

  const rowSelection = {
    columnWidth: 48,
    fixed: true,
    onChange: onSelectChange,
    selectedRowKeys: checkedRowKeys,
    type: 'checkbox',
  };

  function onClose() {
    closeDrawer();

    form.resetFields();
  }

  /** the hook after the batch delete operation is completed */
  async function onBatchDeleted() {
    antdUtils.message.success('批量删除成功');
    setCheckedRowKeys([]);

    await getData(false);
  }

  /** the hook after the delete operation is completed */
  async function onDeleted() {
    antdUtils.message.success('删除成功');

    await getData(false);
  }

  async function handleSubmit() {
    const res = await form.validateFields();

    // request
    await executeResActions(res, operateType);

    antdUtils.message.success('更新成功');

    onClose();
    getData();
  }

  return {
    checkedRowKeys,
    closeDrawer,
    drawerVisible,
    editingData,
    generalPopupOperation: {
      form,
      handleSubmit,
      onClose,
      open: drawerVisible,
      operateType,
    },
    handleAdd,
    handleEdit,
    onBatchDeleted,
    onDeleted,
    onSelectChange,
    openDrawer,
    operateType,
    rowSelection,
  };
}

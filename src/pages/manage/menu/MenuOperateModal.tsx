import { ModalForm } from '@ant-design/pro-components';
import { Col, Form, Input, InputNumber, Radio, Row, Select } from 'antd';
import { Iconify } from '@/components/icon';
import { createDefaultModel, getPageOptions, layoutOptions } from './shared';
import type { MenuOption } from './shared';
import type { MenuItem } from '.';
import { useRequest } from 'ahooks';
import request from 'umi-request';
import SimpleScrollbar from '@/components/simple-srcollbar';
import { useEffect } from 'react';

interface OperateModalProps {
  title: string;
  currentRow: MenuItem | null;
  // allPages: string[];
  menuList: MenuOption[];
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  handleSubmit: (values: any) => void;
}
const operateType = 'edit';

const menuTypeOptions = [
  { label: '目录', value: '1' },
  { label: '菜单', value: '2' },
];
const menuIconTypeOptions = [
  { label: 'iconify图标', value: '1' },
  { label: '本地图标', value: '2' },
];

const enableStatusOptions = [
  { label: '启用', value: '1' },
  { label: '禁用', value: '2' },
];

const fetchGetAllPages = async () => {
  return request
    .get(
      'https://apifoxmock.com/m1/3109515-0-default/systemManage/getAllPages',
      {
        params: {
          apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
        },
      }
    )
    .then((res) => res.data);
};

export default function MenuOperateModal({
  title,
  currentRow,
  menuList,
  open,
  onOpenChange,
  handleSubmit,
}: OperateModalProps) {
  const [form] = Form.useForm();
  const { data: allPages } = useRequest(fetchGetAllPages);
  const { hideInMenu, icon, menuType, parentId, routeName } =
    Form.useWatch((item) => Object.assign(createDefaultModel(), item), {
      form,
      preserve: true,
    }) || form.getFieldsValue();
  // BUG: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?

  const showPage = menuType === '2';

  const showLayout = Number(parentId) === 0;

  const pageOptions = allPages ? getPageOptions(routeName, allPages) : [];

  useEffect(() => {
    if (currentRow) {
      form.setFieldsValue(currentRow);
    } else {
      form.resetFields();
    }
  }, [currentRow]);

  return (
    <ModalForm
      modalProps={{
        forceRender: true,
      }}
      width="800px"
      labelWrap
      labelCol={{ lg: 8, xs: 4 }}
      layout="horizontal"
      form={form}
      title={title}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={async (values) => {
        handleSubmit(values);
        return true;
      }}
    >
      <SimpleScrollbar className="h-[480px]">
        <Row className="pr-5">
          <Col lg={12} xs={24}>
            <Form.Item label="菜单类型" name="menuType">
              <Radio.Group disabled={operateType === 'edit'}>
                {menuTypeOptions.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item
              label="菜单名称"
              name="menuName"
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
              ]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item
              label="路由名称"
              name="routeName"
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
              ]}
            >
              <Input placeholder="请输入路由名称" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item
              label="路由路径"
              name="routePath"
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
              ]}
            >
              <Input placeholder="请输入路由路径" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="路径参数" name="pathParam">
              <Input placeholder="请输入路径参数" />
            </Form.Item>
          </Col>

          {showLayout && (
            <Col lg={12} xs={24}>
              <Form.Item label="布局" name="layout">
                <Select options={layoutOptions} placeholder="请选择布局" />
              </Form.Item>
            </Col>
          )}

          {!showLayout && (
            <Col lg={12} xs={24}>
              <Form.Item label="父级菜单" name="parentId">
                <Select options={menuList} placeholder="请选择父级菜单" />
              </Form.Item>
            </Col>
          )}

          {showPage && (
            <Col lg={12} xs={24}>
              <Form.Item label="页面组件" name="page">
                <Select options={pageOptions} placeholder="请选择页面组件" />
              </Form.Item>
            </Col>
          )}

          <Col lg={12} xs={24}>
            <Form.Item label="国际化key" name="i18nKey">
              <Input placeholder="请输入国际化key" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="排序" name="order">
              <InputNumber className="w-full" placeholder="请输入排序" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="图标类型" name="iconType">
              <Radio.Group>
                {menuIconTypeOptions.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="图标" name="icon">
              {/* {Number(iconType) === 1 ? (
                <Input
                  className="flex-1"
                  placeholder={t('page.manage.menu.form.icon')}
                  suffix={<SvgIcon className="text-icon" icon={icon} />}
                />
              ) : (
                <Select
                  allowClear
                  options={localIconOptions}
                  placeholder={t('page.manage.menu.form.localIcon')}
                />
              )} */}
              <Input
                className="flex-1"
                placeholder="请输入图标"
                suffix={<Iconify icon={icon} width="1em" height="1em" />}
              />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item
              label="菜单状态"
              name="status"
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
              ]}
            >
              <Radio.Group>
                {enableStatusOptions.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="缓存路由" name="keepAlive">
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="常量路由" name="constant">
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="外链" name="href">
              <Input placeholder="请输入外链" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="隐藏菜单" name="hideInMenu">
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          {hideInMenu && (
            <Col lg={12} xs={24}>
              <Form.Item label="高亮菜单" name="activeMenu">
                <Select
                  allowClear
                  options={pageOptions}
                  placeholder="请选择高亮菜单的路由名称"
                />
              </Form.Item>
            </Col>
          )}

          <Col lg={12} xs={24}>
            <Form.Item label="支持多页签" name="multiTab">
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="固定在页签中的序号" name="fixedIndexInTab">
              <InputNumber
                className="w-full"
                placeholder="请输入固定在页签中的序号"
              />
            </Form.Item>
          </Col>
        </Row>
      </SimpleScrollbar>
    </ModalForm>
  );
}

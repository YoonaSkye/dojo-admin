import { Button, Card } from 'antd';

import Page from '@/components/page';
import { useAccess } from '@/features/access';
import { useUserStore } from '@/store/user';
import { Recordable } from '@/types';

const accounts: Record<string, Recordable<any>> = {
  admin: {
    password: '123456',
    username: 'admin',
  },
  super: {
    password: '123456',
    username: 'vben',
  },
  user: {
    password: '123456',
    username: 'jack',
  },
};

export default function PageControl() {
  const userRoles = useUserStore((store) => store.userRoles);
  const { accessMode } = useAccess();

  function roleButtonType(role: string) {
    return userRoles.includes(role) ? 'primary' : 'default';
  }

  return (
    <Page
      title={`${accessMode === 'frontend' ? '前端' : '后端'}页面访问权限演示`}
      description="切换不同的账号，观察左侧菜单变化。"
    >
      <Card className="mb-5" title="权限模式">
        <span className="font-semibold">当前权限模式:</span>
        <span className="mx-4 text-primary">后端权限控制</span>
        <Button type="primary">
          切换为{accessMode === 'frontend' ? '后端' : '前端'}权限模式
        </Button>
      </Card>
      <Card title="账号切换">
        <Button type={roleButtonType('super')}>切换为 Super 账号</Button>

        <Button className="mx-4" type={roleButtonType('admin')}>
          切换为 Admin 账号
        </Button>
        <Button type={roleButtonType('user')}>切换为 User 账号</Button>
      </Card>
    </Page>
  );
}

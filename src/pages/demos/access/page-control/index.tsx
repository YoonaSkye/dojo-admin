import { Button, Card } from 'antd';

import Page from '@/components/page';
import { useAccess } from '@/features/access';
import { cleanAuthState, useAuthLogin } from '@/features/access/auth';
import { useRouter } from '@/router';
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
  const { authLogin } = useAuthLogin();
  const { reload } = useRouter();

  function roleButtonType(role: string) {
    return userRoles.includes(role) ? 'primary' : 'default';
  }

  async function changeAccount(role: string) {
    if (userRoles.includes(role)) return;
    const account = accounts[role];
    if (!account) return;

    // 清除旧认证状态（软切换，不调用服务端 logout）
    cleanAuthState();

    // 使用空 onSuccess 保持当前页面，登录后刷新路由让路由重新 patch
    await authLogin(account, () => {
      reload();
    });
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
        <Button
          type={roleButtonType('super')}
          onClick={() => changeAccount('super')}
        >
          切换为 Super 账号
        </Button>

        <Button
          className="mx-4"
          type={roleButtonType('admin')}
          onClick={() => changeAccount('admin')}
        >
          切换为 Admin 账号
        </Button>
        <Button
          type={roleButtonType('user')}
          onClick={() => changeAccount('user')}
        >
          切换为 User 账号
        </Button>
      </Card>
    </Page>
  );
}

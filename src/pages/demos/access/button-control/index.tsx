import { Card, Button } from 'antd';

import Page from '@/components/page';
import { AccessControl, useAccess } from '@/features/access';
import { useUserStore } from '@/store/user';

export default function ButtonControl() {
  const userRoles = useUserStore((store) => store.userRoles);
  const { accessMode, hasAccessByCodes } = useAccess();

  function roleButtonType(role: string) {
    return userRoles.includes(role) ? 'primary' : 'default';
  }
  return (
    <Page
      title={`${accessMode === 'frontend' ? '前端' : '后端'}按钮访问权限演示`}
      description="切换不同的账号，观察按钮变化。"
    >
      <Card
        className="mb-5"
        title={
          <>
            <span className="font-semibold">当前角色:</span>
            <span className="mx-4 text-lg text-primary">{userRoles?.[0]}</span>
          </>
        }
      >
        <Button type={roleButtonType('super')}>切换为 Super 账号</Button>
        <Button className="mx-4" type={roleButtonType('admin')}>
          切换为 Admin 账号
        </Button>
        <Button>切换为 User 账号</Button>
      </Card>

      <Card className="mb-5" title="组件形式控制 - 权限码">
        <AccessControl codes={['AC_100100']} type="code">
          <Button className="mr-4"> Super 账号可见 ["AC_100100"] </Button>
        </AccessControl>
        <AccessControl codes={['AC_100030']} type="code">
          <Button className="mr-4"> Admin 账号可见 ["AC_100030"] </Button>
        </AccessControl>
        <AccessControl codes={['AC_1000001']} type="code">
          <Button className="mr-4"> User 账号可见 ["AC_1000001"] </Button>
        </AccessControl>
        <AccessControl codes={['AC_100100', 'AC_100030']} type="code">
          <Button className="mr-4">
            Super & Admin 账号可见 ["AC_100100","AC_100030"]
          </Button>
        </AccessControl>
      </Card>

      <Card className="mb-5" title="函数形式控制">
        {hasAccessByCodes(['AC_100100']) && (
          <Button className="mr-4">Super 账号可见 ["AC_100100"]</Button>
        )}
        {hasAccessByCodes(['AC_100030']) && (
          <Button className="mr-4">Admin 账号可见 ["AC_100030"]</Button>
        )}
        {hasAccessByCodes(['AC_1000001']) && (
          <Button className="mr-4">User 账号可见 ["AC_1000001"]</Button>
        )}
        {hasAccessByCodes(['AC_100100', 'AC_100030']) && (
          <Button className="mr-4">
            Super & Admin 账号可见 ["AC_100100","AC_100030"]
          </Button>
        )}
      </Card>
    </Page>
  );
}

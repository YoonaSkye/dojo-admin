// hooks
import { useUserDetail } from '@/hooks/use-user-detail';

// components
import AdminLayout from './admin-layout';
import LayoutHeader from './components/layout-header';
import LayoutSidebar from './components/layout-sidebar';
import Loading from '@/components/loading';

// zustand data
import { useHeaderSetting, useSiderSetting } from '@/store/setting';

export default function BasicLayout() {
  // 在这里fetch用户权限信息，并构建动态路由，并添加loading等待⌛️
  const { loading } = useUserDetail();
  const { collapsed: siderCollapse, visible: siderVisible } = useSiderSetting();
  const { visible: headerVisible } = useHeaderSetting();

  if (loading) return <Loading />;
  return (
    <AdminLayout
      Header={<LayoutHeader />}
      Sider={<LayoutSidebar />}
      headerVisible={headerVisible}
      siderCollapse={siderCollapse}
      siderVisible={siderVisible}
    />
  );
}

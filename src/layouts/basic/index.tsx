// components
import AdminLayout from './admin-layout';
import LayoutHeader from './components/layout-header';
import LayoutSidebar from './components/layout-sidebar';

// zustand data
import { useHeaderSetting, useSiderSetting } from '@/store/preferences';

export default function BasicLayout() {
  const { collapsed: siderCollapse, enable: siderVisible } = useSiderSetting();
  const { enable: headerVisible } = useHeaderSetting();

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

// components
import AdminLayout from './admin-layout';
import LayoutHeader from './components/layout-header';
import LayoutSidebar from './components/layout-sidebar';

// zustand data
import { useHeaderSetting, useSiderSetting } from '@/store/setting';

export default function BasicLayout() {
  const { collapsed: siderCollapse, visible: siderVisible } = useSiderSetting();
  const { visible: headerVisible } = useHeaderSetting();

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

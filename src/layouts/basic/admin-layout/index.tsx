import { Preferences } from '@/features/preferences';
import { useHeaderSetting } from '@/store/preferences';

import {
  LayoutFooter,
  LayoutHeaderWrapper,
  LayoutSidebar,
} from '../components';
import KeepLiveArea from '../keep-live-area';

export default function AdminLayout() {
  const { enable: headerVisible } = useHeaderSetting();

  return (
    <div className="relative flex h-full w-full">
      {/* Sider */}
      <LayoutSidebar />

      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in">
        <LayoutHeaderWrapper />

        {/* Main Content */}
        <main className="flex w-full flex-1 flex-col overflow-auto bg-background-deep">
          {/* TODO: 考虑重新封装一个ScrollWrapper,自定义滚动样式 */}
          <KeepLiveArea />
        </main>

        {/* Footer */}
        <LayoutFooter />
      </div>
      {!headerVisible && (
        <Preferences className="fixed right-0 top-1/2 z-50 -translate-y-1/2 transform" />
      )}
    </div>
  );
}

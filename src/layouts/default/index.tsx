import { useThemeLayout } from '@/store/setting';
import LayoutHeader from './components/layout-header';
import LayoutSidebar from './components/layout-sidebar';
import MultiTabs from './tabbar/multi-tabs';
import MultiTabsProvider from './tabbar/multi-tabs-provider';
import { ThemeLayout } from '#/enum';

export default function DefaultLayout() {
  const themeLayout = useThemeLayout();
  return (
    <div className="relative flex min-h-full w-full">
      {themeLayout === ThemeLayout.Vertical && <LayoutSidebar />}
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in overflow-hidden">
        <LayoutHeader />
        <main
          className="bg-background-deep transition-[margin-top] duration-200 overflow-hidden"
          style={{
            flex: '1 1 0%',
            padding: '0px',
            marginTop: '50px',
          }}
        >
          <MultiTabsProvider>
            <MultiTabs />
          </MultiTabsProvider>
          {/* <Outlet /> */}
        </main>
      </div>
    </div>
  );
}

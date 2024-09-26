import MultiTabs from '../dashboard/multi-tabs';
import MultiTabsProvider from '../dashboard/multi-tabs-provider';
import LayoutHeader from './components/layout-header';
import LayoutSidebar from './components/layout-sidebar';

export default function DefaultLayout() {
  return (
    <div className="relative flex min-h-full w-full">
      <LayoutSidebar />
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in">
        <LayoutHeader />
        <main
          className="bg-background-deep transition-[margin-top] duration-200"
          style={{
            flex: '1 1 0%',
            padding: '0px',
            marginTop: '50px',
          }}
        >
          <MultiTabsProvider>
            <MultiTabs />
          </MultiTabsProvider>
        </main>
      </div>
    </div>
  );
}

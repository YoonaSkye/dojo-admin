import { useTabPageActions, useTabsStore } from '@/store/tabs';
import { CSSProperties, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Components
import Label from './Label';
import TabContextMenu from './tab-context-menu';
import { useLayoutMode } from '@/store/setting';

type TabsProps = {
  siderCollapse?: boolean;
  navCollapsedWidth?: number;
  navWidth?: number;
};

function Tabs({ siderCollapse, navCollapsedWidth, navWidth }: TabsProps) {
  const tabPages = useTabsStore((state) => state.tabPages);
  const { t } = useTranslation();
  const scrollContainer = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { closeTabPage, openTabPage } = useTabPageActions();

  const active = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  const layoutMode = useLayoutMode();

  const tabbarStyle: CSSProperties = {
    height: '38px',
    marginLeft: `${
      layoutMode === 'header-sidebar-nav'
        ? siderCollapse
          ? navCollapsedWidth
          : navWidth
        : 0
    }px`,
    width: `${
      layoutMode === 'header-sidebar-nav'
        ? `calc(100% - ${siderCollapse ? navCollapsedWidth : navWidth}px)`
        : '100%'
    }`,
  };

  return (
    <div
      className="border-border bg-background flex w-full border-b transition-all"
      style={tabbarStyle}
    >
      <div className="flex h-full flex-1 light">
        <div className="pt-[3px] size-full flex-1 overflow-hidden">
          <div
            className="tabs-chrome !flex h-full w-max pr-6"
            ref={scrollContainer}
            style={
              {
                '--gap': '7px',
              } as React.CSSProperties
            }
          >
            {tabPages.map((tab, index) => (
              <div
                key={tab.url}
                className={cn(
                  'tabs-chrome__item group relative flex items-center h-full -mr-3 select-none',
                  {
                    'is-active': tab.url === active,
                  }
                )}
                onClick={() => {
                  openTabPage(tab);
                }}
              >
                <TabContextMenu tab={tab}>
                  <Label
                    closeTab={closeTabPage}
                    tab={tab}
                    closable={tabPages.length > 1}
                    tabIndex={index}
                    activeTab={active}
                  >
                    {t(tab.title)}
                  </Label>
                </TabContextMenu>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-center h-full"></div>
    </div>
  );
}

export default Tabs;

import { useTabPageActions, useTabsStore } from '@/store/tabs';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Components
import Label from './Label';
import TabContextMenu from './tab-context-menu';

function Tabs() {
  const tabPages = useTabsStore((state) => state.tabPages);
  const { t } = useTranslation();
  const scrollContainer = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { closeTabPage, openTabPage } = useTabPageActions();

  const active = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  return (
    <div
      className="fixed top-[56px] border-border bg-background flex w-full border-b transition-all"
      style={{
        height: '38px',
        marginLeft: '0px',
        width: '100%',
      }}
    >
      <div className="flex h-full flex-1 overflow-hidden light">
        <div className="pt-[3px] size-full flex-1 overflow-hidden">
          <div
            className="tabs-chrome !flex h-full w-max overflow-y-hidden pr-6"
            ref={scrollContainer}
          >
            {tabPages.map((tab) => (
              <div
                key={tab.url}
                style={
                  {
                    '--gap': '7px',
                  } as React.CSSProperties
                }
                className={cn('tabs-chrome__item group h-full -mr-3', {
                  'is-active': tab.url === active,
                })}
                onClick={() => {
                  openTabPage(tab);
                }}
              >
                <TabContextMenu tab={tab}>
                  <Label
                    closeTab={closeTabPage}
                    tab={tab}
                    closable={tabPages.length > 1}
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

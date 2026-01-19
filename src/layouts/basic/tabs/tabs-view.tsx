import { cn } from '@/lib/utils';
import { TabConfig, TabsProps } from '@/types';
import { useMemo } from 'react';
import Label from './Label';
import TabContextMenu from './tab-context-menu';
import { useTranslation } from 'react-i18next';

interface Props extends TabsProps {}

function TabsView(props: Props) {
  const { tabs = [], active, contextMenus, onActiveChange, onClose } = props;
  const { t } = useTranslation();

  const tabsView = useMemo(() => {
    return tabs.map((tab) => {
      const { fullPath, handle, pathname, key } = tab || {};
      const { icon, title } = handle || {};
      return {
        fullPath,
        icon: icon as string,
        key,
        handle,
        pathname,
        title: (title || name) as string,
      } as TabConfig;
    });
  }, [tabs]);
  return (
    <div className="flex h-full flex-1 light">
      <div className="pt-[3px] size-full flex-1 overflow-hidden">
        <div
          className="tabs-chrome !flex h-full w-max pr-6"
          style={
            {
              '--gap': '7px',
            } as React.CSSProperties
          }
        >
          {tabsView.map((tab, index) => (
            <div
              key={tab.key}
              className={cn(
                'tabs-chrome__item group relative flex items-center h-full -mr-3 select-none',
                {
                  'is-active': tab.key === active,
                }
              )}
              onClick={() => {
                onActiveChange?.(tab.key);
              }}
            >
              <TabContextMenu menu={tab} createContextMenus={contextMenus}>
                <Label
                  activeTab={active}
                  closeTab={onClose}
                  closable={tabs.length > 1}
                  tab={tab}
                  tabIndex={index}
                  title={t(tab.title)}
                />
              </TabContextMenu>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabsView;

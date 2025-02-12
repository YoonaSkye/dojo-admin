import { cn } from '@/lib/utils';
import { useRouter } from '@/router/hooks';
import type { TabsProps } from 'antd';
import { ConfigProvider, Tabs } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Label from '../tabs/Label';
import { KeepAliveTab, useMultiTabsContext } from './multi-tabs-provider';
import TabContextMenu from './tab-context-menu';
import './index.scss';

export default function MultiTabs() {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { tabs, activeTabRoutePath, closeTab } = useMultiTabsContext();

  /**
   * 渲染单个tab
   */
  const renderTabLabel = useCallback(
    (tab: KeepAliveTab) => {
      // if (tab.hideTab) return null;
      return (
        <div
          style={{
            // @ts-ignore-next-line
            '--gap': '7px',
          }}
          className={cn('tabs-chrome__item group h-full -mr-3', {
            'is-active': tab.pathname === activeTabRoutePath,
          })}
          onClick={() => {
            push(tab.pathname);
          }}
        >
          <TabContextMenu tab={tab}>
            <Label closeTab={closeTab} tab={tab} closable={tabs.length > 1}>
              {t(tab.title)}
            </Label>
          </TabContextMenu>
        </div>
      );
    },
    [activeTabRoutePath, tabs.length, t]
  );

  /**
   * 渲染所有tab
   */
  const tabItems: TabsProps['items'] = useMemo(() => {
    return tabs.map((tab) => {
      return {
        key: tab.pathname,
        label: renderTabLabel(tab),
        closable: tabs.length > 1,
        children: <div className="p-5">{tab.children}</div>,
      };
    });
  }, [tabs, renderTabLabel]);

  /**
   * 自定义 渲染 tabbar
   */
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <div
      className="bg-background border-border flex transition-all border-b fixed top-[50px] z-10"
      style={{
        height: '38px',
        marginLeft: '0px',
        width: '100%',
      }}
    >
      <div className="flex h-full flex-1 pt-[3px]">
        <div className="size-full flex-1">
          <DefaultTabBar {...props} />
        </div>
      </div>
      {/* <div className="flex items-center justify-center h-full">
        <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
          <RotateCwIcon className="size-4" />
        </div>
        <TabDropdownMenu>
          <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
            <ChevronDownIcon className="size-4" />
          </div>
        </TabDropdownMenu>
        <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
          <Minimize2Icon className="size-4" />
        </div>
      </div> */}
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            horizontalItemPadding: '0',
            horizontalItemGutter: 0,
          },
        },
      }}
    >
      <Tabs
        type="card"
        items={tabItems}
        activeKey={activeTabRoutePath}
        renderTabBar={renderTabBar}
      />
    </ConfigProvider>
  );
}

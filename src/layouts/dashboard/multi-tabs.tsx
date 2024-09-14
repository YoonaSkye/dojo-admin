import useKeepAlive, { KeepAliveTab } from '@/hooks/use-keep-alive';
import { useRouter } from '@/router/hooks';
import { useThemeToken } from '@/theme/hooks';
import type { TabsProps } from 'antd';
import { Tabs, ConfigProvider } from 'antd';
import { useMemo, useCallback, CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import StickyBox from 'react-sticky-box';
import Color from 'color';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import Label from './Label';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function MultiTabs() {
  const { tabs, activeTabRoutePath, setTabs, setActiveTabRoutePath } =
    useKeepAlive();
  const { t } = useTranslation();
  const { push } = useRouter();
  const themeToken = useThemeToken();

  /**
   * tab样式
   */
  const calcTabStyle: (tab: KeepAliveTab) => CSSProperties = useCallback(
    (tab) => {
      const isActive = tab.key === activeTabRoutePath;
      const result: CSSProperties = {
        borderRadius: '8px 8px 0 0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: themeToken.colorBorderSecondary,
        backgroundColor: themeToken.colorBgLayout,
      };

      if (isActive) {
        result.backgroundColor = themeToken.colorBgContainer;
        result.color = themeToken.colorPrimaryText;
      }
      return result;
    },
    [activeTabRoutePath, themeToken]
  );

  /**
   * 渲染单个tab
   */
  const renderTabLabel = (tab: KeepAliveTab) => {
    if (tab.hideTab) return null;
    return (
      <div
        className={cn('tabs-chrome__item group h-full -mr-3', {
          'is-active': tab.key === activeTabRoutePath,
        })}
      >
        <Label>{t(tab.label)}</Label>
      </div>
    );
  };

  /**
   * 渲染所有tab
   */
  const tabItems: TabsProps['items'] = useMemo(() => {
    return tabs.map((tab) => ({
      key: tab.key,
      label: renderTabLabel(tab),
      children: <div className="p-5">{tab.children}</div>,
      // closable: false,
    }));
  }, [tabs]);

  /**
   * 自定义 渲染 tabbar
   */
  // TODO: 可拖拽的Tabbar
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox
      style={{
        zIndex: 1,
        background: Color(themeToken.colorBgElevated).alpha(1).toString(),
      }}
    >
      <div
        className="flex transition-all border-b"
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
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
            <Bell className="size-4" />
          </div>
          <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
            <Bell className="size-4" />
          </div>
          <div className="flex items-center justify-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-[9px] text-lg font-semibold">
            <Bell className="size-4" />
          </div>
        </div>
      </div>
      {/* <DefaultTabBar {...props} /> */}
    </StickyBox>
  );

  const onChange = (key: string) => {
    setActiveTabRoutePath(key);
  };

  const remove = (targetKey: TargetKey) => {
    if (tabs.length === 1) return;
    const targetIndex = tabs.findIndex((tab) => tab.key === targetKey);
    const newTabs = tabs.filter((tab) => tab.key !== targetKey);
    if (newTabs.length && targetKey === activeTabRoutePath) {
      const { key } =
        newTabs[targetIndex === newTabs.length ? targetIndex - 1 : targetIndex];
      setActiveTabRoutePath(key);
      push(key);
    }
    setTabs(newTabs);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') remove(targetKey);
  };

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
        items={tabItems}
        activeKey={activeTabRoutePath}
        onChange={onChange}
        onEdit={onEdit}
        renderTabBar={renderTabBar}
      />
    </ConfigProvider>
  );
}

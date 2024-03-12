import useKeepAlive, { KeepAliveTab } from '@/hooks/use-keep-alive';
import { useRouter } from '@/router/hooks';
import { useThemeToken } from '@/theme/hooks';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import StickyBox from 'react-sticky-box';
import Color from 'color';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function MultiTabs() {
  const { tabs, activeTabRoutePath, setTabs, setActiveTabRoutePath } =
    useKeepAlive();
  const { t } = useTranslation();
  const { push } = useRouter();
  const { colorBgElevated } = useThemeToken();

  // 渲染单个tab label
  const renderTabLabel = (tab: KeepAliveTab) => {
    // TODO: 右键tab菜单功能，支持关闭、关闭其它、刷新操作
  };

  // 所有tabs
  const tabItems: TabsProps['items'] = useMemo(() => {
    return tabs.map((tab) => ({
      key: tab.key,
      label: t(tab.label),
      children: tab.children,
    }));
  }, [tabs]);

  // 自定义渲染 tab bar
  // TODO: 可拖拽的Tabbar
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox
      offsetTop={0}
      offsetBottom={20}
      style={{
        zIndex: 1,
        background: Color(colorBgElevated).alpha(1).toString(),
      }}
    >
      <DefaultTabBar {...props} />
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
    <Tabs
      hideAdd
      type="editable-card"
      items={tabItems}
      activeKey={activeTabRoutePath}
      onChange={onChange}
      onEdit={onEdit}
      renderTabBar={renderTabBar}
    />
  );
}

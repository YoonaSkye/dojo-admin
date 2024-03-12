import useKeepAlive, { KeepAliveTab } from '@/hooks/use-keep-alive';
import { useRouter } from '@/router/hooks';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function MultiTabs() {
  const { tabs, activeTabRoutePath, setTabs, setActiveTabRoutePath } =
    useKeepAlive();
  const { t } = useTranslation();
  const { push } = useRouter();

  // 渲染单个tab label
  const renderTabLabel = (tab: KeepAliveTab) => {};

  // 所有tabs
  const tabItems: TabsProps['items'] = useMemo(() => {
    return tabs.map((tab) => ({
      key: tab.key,
      label: t(tab.label),
      children: tab.children,
    }));
  }, [tabs]);

  // 自定义渲染 tab bar
  const renderTabBar = () => {};

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
    />
  );
}

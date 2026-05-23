import { usePreferencesStore, useSiderSetting } from '@packages/stores';

import SwitchItem from '../switch-item';

export function Sidebar() {
  const setSider = usePreferencesStore((state) => state.setSider);
  const { collapsed, enable } = useSiderSetting();
  return (
    <>
      <SwitchItem
        title="显示侧边栏"
        defaultChecked={enable}
        onCheckedChange={(checked) => setSider({ enable: checked })}
      ></SwitchItem>
      <SwitchItem
        title="折叠菜单"
        defaultChecked={collapsed}
        disabled={!enable}
        onCheckedChange={(checked) => setSider({ collapsed: checked })}
      ></SwitchItem>
    </>
  );
}

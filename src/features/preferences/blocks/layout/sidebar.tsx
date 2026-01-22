import { usePreferencesStore, useSiderSetting } from '@/store/preferences';
import SwitchItem from '../switch-item';

export function Sidebar() {
  const setSider = usePreferencesStore((state) => state.setSider);
  const { collapsed, enable } = useSiderSetting();
  return (
    <>
      <SwitchItem
        title="显示侧边栏"
        defaultChecked={enable}
        callback={(checked) => setSider({ enable: checked })}
      ></SwitchItem>
      <SwitchItem
        title="折叠菜单"
        defaultChecked={collapsed}
        callback={(checked) => setSider({ collapsed: checked })}
      ></SwitchItem>
    </>
  );
}

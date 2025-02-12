import { useSettingActions, useSiderSetting } from '@/store/setting';
import SwitchItem from '../switch-item';

export default function Sidebar() {
  const { setSider } = useSettingActions();
  const { collapsed, visible } = useSiderSetting();
  return (
    <>
      <SwitchItem
        title="显示侧边栏"
        defaultChecked={visible}
        callback={(checked) => setSider({ visible: checked })}
      ></SwitchItem>
      <SwitchItem
        title="折叠菜单"
        defaultChecked={collapsed}
        callback={(checked) => setSider({ collapsed: checked })}
      ></SwitchItem>
    </>
  );
}

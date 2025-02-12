import { useHeaderSetting, useSettingActions } from '@/store/setting';
import SwitchItem from '../switch-item';

export default function Header() {
  const { setHeader } = useSettingActions();
  const { visible } = useHeaderSetting();
  return (
    <>
      <SwitchItem
        disabled={true}
        title="显示顶栏"
        defaultChecked={visible}
        callback={(checked) => setHeader({ visible: checked })}
      ></SwitchItem>
    </>
  );
}

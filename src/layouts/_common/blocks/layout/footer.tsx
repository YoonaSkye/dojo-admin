import { useFooterSetting, useSettingActions } from '@/store/setting';
import SwitchItem from '../switch-item';

export default function Footer() {
  const { setFooter } = useSettingActions();
  const { visible } = useFooterSetting();
  return (
    <>
      <SwitchItem
        disabled={true}
        title="显示底栏"
        defaultChecked={visible}
        callback={(checked) => setFooter({ visible: checked })}
      ></SwitchItem>
    </>
  );
}

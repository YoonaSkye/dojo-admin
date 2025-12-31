import { useFooterSetting, useSettingActions } from '@/store/preferences';
import SwitchItem from '../switch-item';

export function Footer() {
  const { setFooter } = useSettingActions();
  const { enable } = useFooterSetting();
  return (
    <>
      <SwitchItem
        disabled={true}
        title="显示底栏"
        defaultChecked={enable}
        callback={(checked) => setFooter({ enable: checked })}
      ></SwitchItem>
    </>
  );
}

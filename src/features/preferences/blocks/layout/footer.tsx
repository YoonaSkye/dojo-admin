import { useFooterSetting, usePreferencesStore } from '@packages/stores';

import SwitchItem from '../switch-item';

export function Footer() {
  const setFooter = usePreferencesStore((state) => state.setFooter);
  const { enable } = useFooterSetting();
  return (
    <>
      <SwitchItem
        disabled={true}
        title="显示底栏"
        defaultChecked={enable}
        onCheckedChange={(checked) => setFooter({ enable: checked })}
      ></SwitchItem>
    </>
  );
}

import SwitchItem from '../switch-item';

import { useFooterSetting, usePreferencesStore } from '@/store/preferences';

export function Footer() {
  const setFooter = usePreferencesStore((state) => state.setFooter);
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

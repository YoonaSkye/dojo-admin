import { useHeaderSetting, usePreferencesStore } from '@/store/preferences';

import SwitchItem from '../switch-item';

export function Header() {
  const setHeader = usePreferencesStore((state) => state.setHeader);
  const { enable } = useHeaderSetting();

  return (
    <>
      <SwitchItem
        title="显示顶栏"
        defaultChecked={enable}
        onCheckedChange={(checked) => setHeader({ enable: checked })}
      ></SwitchItem>
    </>
  );
}

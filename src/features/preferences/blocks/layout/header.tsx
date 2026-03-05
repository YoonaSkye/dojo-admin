import SwitchItem from '../switch-item';

import { useHeaderSetting, usePreferencesStore } from '@/store/preferences';

export function Header() {
  const setHeader = usePreferencesStore((state) => state.setHeader);
  const { enable } = useHeaderSetting();

  return (
    <>
      <SwitchItem
        disabled={true}
        title="显示顶栏"
        defaultChecked={enable}
        callback={(checked) => setHeader({ enable: checked })}
      ></SwitchItem>
    </>
  );
}

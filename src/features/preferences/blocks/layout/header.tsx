import { useHeaderSetting, usePreferencesStore } from '@/store/preferences';
import SwitchItem from '../switch-item';

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

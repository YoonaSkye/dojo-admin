import { useBreadCrumbSetting, useSettingActions } from '@/store/preferences';
import SwitchItem from '../switch-item';

export function BreadCrumb() {
  const { setBreadCrumb } = useSettingActions();
  const { enable, showIcon } = useBreadCrumbSetting();
  return (
    <>
      <SwitchItem
        disabled={true}
        title="开启面包屑导航"
        defaultChecked={enable}
        callback={(checked) => setBreadCrumb({ enable: checked })}
      ></SwitchItem>
      <SwitchItem
        disabled={true}
        title="显示面包屑导航图标"
        defaultChecked={showIcon}
        callback={(checked) => setBreadCrumb({ showIcon: checked })}
      ></SwitchItem>
    </>
  );
}

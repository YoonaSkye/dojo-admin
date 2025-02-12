import { useBreadCrumbSetting, useSettingActions } from '@/store/setting';
import SwitchItem from '../switch-item';

export default function BreadCrumb() {
  const { setBreadCrumb } = useSettingActions();
  const { visible, showIcon } = useBreadCrumbSetting();
  return (
    <>
      <SwitchItem
        disabled={true}
        title="开启面包屑导航"
        defaultChecked={visible}
        callback={(checked) => setBreadCrumb({ visible: checked })}
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

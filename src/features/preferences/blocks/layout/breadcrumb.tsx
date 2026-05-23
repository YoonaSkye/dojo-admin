import { useBreadCrumbSetting, usePreferencesStore } from '@packages/stores';

import SwitchItem from '../switch-item';

export function BreadCrumb() {
  const setBreadCrumb = usePreferencesStore((state) => state.setBreadCrumb);
  const { enable, showIcon } = useBreadCrumbSetting();

  return (
    <>
      <SwitchItem
        title="开启面包屑导航"
        defaultChecked={enable}
        onCheckedChange={(checked) => setBreadCrumb({ enable: checked })}
      ></SwitchItem>
      <SwitchItem
        disabled={true}
        title="显示面包屑导航图标"
        defaultChecked={showIcon}
        onCheckedChange={(checked) => setBreadCrumb({ showIcon: checked })}
      ></SwitchItem>
    </>
  );
}

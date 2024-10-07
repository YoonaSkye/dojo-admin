import { IconButton, SvgIcon } from '@/components/icon';
import { Button, Card, Drawer, Switch } from 'antd';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useThemeToken } from '@/theme/hooks';
import { useSettingActions, useSettings } from '@/store/setting';
import { ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum';
import { colorPrimarys } from '@/theme/antd/theme';
import { MdCircle } from 'react-icons/md';

export default function SettingButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { colorTextSecondary, colorPrimary, colorBgBase, colorTextTertiary } =
    useThemeToken();
  const settings = useSettings();
  const { themeMode, themeLayout, themeColorPresets, breadCrumb, multiTab } =
    settings;
  const { setSettings } = useSettingActions();

  const setThemeMode = (themeMode: ThemeMode) => {
    setSettings({
      ...settings,
      themeMode,
    });
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets,
    });
  };

  const setBreadCrumn = (checked: boolean) => {
    setSettings({
      ...settings,
      breadCrumb: checked,
    });
  };

  const setMultiTab = (checked: boolean) => {
    setSettings({
      ...settings,
      multiTab: checked,
    });
  };

  const layoutBackground = (layout: ThemeLayout) =>
    themeLayout === layout
      ? `linear-gradient(135deg, ${colorBgBase} 0%, ${colorPrimary} 100%)`
      : '#919eab';

  return (
    <>
      <div className="flex items-center justify-center">
        <IconButton className="h-10 w-10" onClick={() => setDrawerOpen(true)}>
          <SvgIcon icon="ic-setting" size="24" />
        </IconButton>
      </div>
      <Drawer
        placement="right"
        title="Settings"
        width={280}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        styles={{ body: { padding: 0 } }}
        extra={
          <IconButton
            onClick={() => setDrawerOpen(false)}
            className="h-9 w-9 hover:scale-105"
          >
            <CloseOutlined className="text-gray-400" />
          </IconButton>
        }
        // TODO: full screen function
        footer={<Button>footer: 全屏按钮</Button>}
      >
        <div className="flex flex-col gap-6 p-6">
          {/* theme mode */}
          <div className="">
            <div
              className="mb-3 text-base font-semibold"
              style={{ color: colorTextSecondary }}
            >
              Mode
            </div>
            <div className="flex flex-row gap-4">
              <Card
                className="flex items-center justify-center h-20 w-full cursor-pointer"
                onClick={() => setThemeMode(ThemeMode.Light)}
              >
                <SvgIcon
                  icon="ic-settings-mode-sun"
                  size="24"
                  color={themeMode === ThemeMode.Light ? colorPrimary : ''}
                />
              </Card>
              <Card
                className="flex items-center justify-center h-20 w-full cursor-pointer"
                onClick={() => setThemeMode(ThemeMode.Dark)}
              >
                <SvgIcon
                  icon="ic-settings-mode-moon"
                  size="24"
                  color={themeMode === ThemeMode.Dark ? colorPrimary : ''}
                />
              </Card>
            </div>
          </div>

          {/* theme layout */}
          <div>
            <div
              className="mb-3 text-base font-semibold"
              style={{ color: colorTextSecondary }}
            >
              Layout
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* vertical 布局 */}
              <Card
                className="h-14 cursor-pointer"
                onClick={() => setThemeLayout(ThemeLayout.Vertical)}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <div className="flex flex-col gap-1 p-1 h-full w-7 flex-shrink-0">
                  <div
                    className="h-2 w-2 rounded flex-shrink-0"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical),
                    }}
                  />
                  <div
                    className="h-1 w-full rounded flex-shrink-0 opacity-50"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical),
                    }}
                  />
                  <div
                    className="h-1 max-w-[12px] rounded flex-shrink-0 opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical),
                    }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical),
                    }}
                  />
                </div>
              </Card>
              {/* horizontal 布局 */}
              <Card
                className="h-14 cursor-pointer"
                onClick={() => setThemeLayout(ThemeLayout.Horizontal)}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <div className="flex h-4 w-full items-center gap-1  p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{
                      background: layoutBackground(ThemeLayout.Horizontal),
                    }}
                  />
                  <div
                    className="h-1 w-4 flex-shrink-0 rounded opacity-50"
                    style={{
                      background: layoutBackground(ThemeLayout.Horizontal),
                    }}
                  />
                  <div
                    className="h-1 w-3 flex-shrink-0 rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Horizontal),
                    }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Horizontal),
                    }}
                  />
                </div>
              </Card>
              {/* <Card
                className="h-14 cursor-pointer"
                // onClick={}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              ></Card> */}
            </div>
          </div>

          {/* theme presets */}
          <div>
            <div
              className="mb-3 text-base font-semibold"
              style={{ color: colorTextSecondary }}
            >
              Presets
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {Object.entries(colorPrimarys).map(([preset, color]) => (
                <Card
                  key={preset}
                  className="flex h-14 w-full cursor-pointer items-center justify-center"
                  style={{
                    backgroundColor:
                      themeColorPresets === preset ? `${color}14` : '',
                  }}
                  onClick={() =>
                    setThemeColorPresets(preset as ThemeColorPresets)
                  }
                >
                  <div style={{ color }}>
                    <MdCircle
                      style={{
                        fontSize: themeColorPresets === preset ? 24 : 12,
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* page connfig */}
          <div>
            <div
              className="mb-3 text-base font-semibold"
              style={{ color: colorTextSecondary }}
            >
              Page
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center justify-between"
                style={{ color: colorTextTertiary }}
              >
                <div>BreadCrumb</div>
                <Switch
                  size="small"
                  checked={breadCrumb}
                  onChange={(checked) => setBreadCrumn(checked)}
                />
              </div>
              <div
                className="flex items-center justify-between"
                style={{ color: colorTextTertiary }}
              >
                <div>Multi Tab</div>
                <Switch
                  size="small"
                  checked={multiTab}
                  onChange={(checked) => setMultiTab(checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

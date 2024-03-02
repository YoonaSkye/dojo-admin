import { IconButton, SvgIcon } from '@/components/icon';
import { Button, Card, Drawer } from 'antd';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useThemeToken } from '@/theme/hooks';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { ThemeMode } from '#/enum';

export default function SettingButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { colorTextSecondary, colorPrimary } = useThemeToken();
  const settings = useSettings();
  const { themeMode } = settings;
  const { setSettings } = useSettingActions();

  const setThemeMode = (themeMode: ThemeMode) => {
    setSettings({
      ...settings,
      themeMode,
    });
  };

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
        bodyStyle={{ padding: 0 }}
        extra={
          <IconButton
            onClick={() => setDrawerOpen(false)}
            className="h-9 w-9 hover:scale-105"
          >
            <CloseOutlined className="text-gray-400" />
          </IconButton>
        }
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

          {/* theme strech */}

          {/* theme presets */}

          {/* page connfig */}
        </div>
      </Drawer>
    </>
  );
}

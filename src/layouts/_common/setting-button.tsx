import { IconButton, SvgIcon } from '@/components/icon';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

export default function SettingButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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

          {/* theme layout */}

          {/* theme strech */}

          {/* theme presets */}

          {/* page connfig */}
        </div>
      </Drawer>
    </>
  );
}
